package terminal

import (
	"encoding/base64"
	"fmt"
	"io"
	"os"
	"os/exec"
	"sort"
	"sync"

	"github.com/creack/pty"
)

type Handle struct {
	ID         string `json:"id"`
	Generation uint64 `json:"generation"`
}
type Output struct {
	ID         string `json:"id"`
	Generation uint64 `json:"generation"`
	DataBase64 string `json:"dataBase64"`
}
type Status struct {
	ID         string `json:"id"`
	Generation uint64 `json:"generation"`
	PID        int    `json:"pid"`
}

type OutputSink interface{ EmitTerminalOutput(Output) }

type session struct {
	generation uint64
	pty        *os.File
	cmd        *exec.Cmd
}
type Service struct {
	mu             sync.Mutex
	nextGeneration uint64
	sessions       map[string]*session
	sink           OutputSink
	stopped        bool
	options        Options
}

func NewService(sink OutputSink, options Options) *Service {
	return &Service{sessions: make(map[string]*session), sink: sink, options: options}
}

func (service *Service) ServiceName() string { return "soksak-plugin-terminal-xterm" }

func terminalOutput(id string, generation uint64, bytes []byte) Output {
	return Output{ID: id, Generation: generation, DataBase64: base64.StdEncoding.EncodeToString(bytes)}
}

func (service *Service) install(id string, value *session) Handle {
	service.mu.Lock()
	if service.stopped {
		service.mu.Unlock()
		closeSession(value)
		return Handle{}
	}
	service.nextGeneration++
	value.generation = service.nextGeneration
	previous := service.sessions[id]
	service.sessions[id] = value
	service.mu.Unlock()
	closeSession(previous)
	return Handle{ID: id, Generation: value.generation}
}

func (service *Service) release(id string, generation uint64) *session {
	service.mu.Lock()
	defer service.mu.Unlock()
	value := service.sessions[id]
	if value == nil || value.generation != generation {
		return nil
	}
	delete(service.sessions, id)
	return value
}

func closeSession(value *session) {
	if value == nil {
		return
	}
	if value.cmd != nil && value.cmd.Process != nil {
		terminateProcessGroup(value.cmd.Process.Pid)
	}
	if value.pty != nil {
		_ = value.pty.Close()
	}
	if value.cmd != nil && value.cmd.Process != nil {
		_ = value.cmd.Wait()
	}
}

func (service *Service) Open(id string, cols, rows uint16) (Handle, error) {
	if id == "" || cols == 0 || rows == 0 {
		return Handle{}, fmt.Errorf("terminal identity and size are required")
	}
	shell := os.Getenv("SHELL")
	if shell == "" {
		shell = "/bin/zsh"
	}
	cmd := exec.Command(shell, "-l")
	cmd.Env = terminalEnvironment(os.Environ(), service.options.EnvironmentPolicy, service.options.Environment)
	file, err := pty.StartWithSize(cmd, &pty.Winsize{Cols: cols, Rows: rows})
	if err != nil {
		return Handle{}, fmt.Errorf("open terminal %s: %w", id, err)
	}
	handle := service.install(id, &session{pty: file, cmd: cmd})
	if handle.Generation == 0 {
		return Handle{}, fmt.Errorf("terminal service is shutting down")
	}
	go service.read(handle, file)
	return handle, nil
}

func (service *Service) read(handle Handle, file *os.File) {
	buffer := make([]byte, 32*1024)
	for {
		count, err := file.Read(buffer)
		if count > 0 && service.sink != nil {
			service.sink.EmitTerminalOutput(terminalOutput(handle.ID, handle.Generation, buffer[:count]))
		}
		if err != nil {
			if err != io.EOF && service.sink != nil {
				service.sink.EmitTerminalOutput(terminalOutput(handle.ID, handle.Generation, []byte("\r\n[terminal closed]\r\n")))
			}
			closeSession(service.release(handle.ID, handle.Generation))
			return
		}
	}
}

func (service *Service) current(handle Handle) (*session, error) {
	service.mu.Lock()
	defer service.mu.Unlock()
	value := service.sessions[handle.ID]
	if value == nil || value.generation != handle.Generation || value.pty == nil {
		return nil, fmt.Errorf("terminal owner does not exist: %s/%d", handle.ID, handle.Generation)
	}
	return value, nil
}

func (service *Service) Write(handle Handle, data string) error {
	value, err := service.current(handle)
	if err != nil {
		return err
	}
	_, err = value.pty.WriteString(data)
	return err
}

func (service *Service) Resize(handle Handle, cols, rows uint16) error {
	if cols == 0 || rows == 0 {
		return fmt.Errorf("terminal size must be non-zero")
	}
	value, err := service.current(handle)
	if err != nil {
		return err
	}
	return pty.Setsize(value.pty, &pty.Winsize{Cols: cols, Rows: rows})
}

func (service *Service) Close(handle Handle) error {
	closeSession(service.release(handle.ID, handle.Generation))
	return nil
}

func (service *Service) Status() []Status {
	service.mu.Lock()
	defer service.mu.Unlock()
	result := make([]Status, 0, len(service.sessions))
	for id, value := range service.sessions {
		pid := 0
		if value.cmd != nil && value.cmd.Process != nil {
			pid = value.cmd.Process.Pid
		}
		result = append(result, Status{ID: id, Generation: value.generation, PID: pid})
	}
	sort.Slice(result, func(i, j int) bool { return result[i].ID < result[j].ID })
	return result
}

func (service *Service) ServiceShutdown() error {
	service.mu.Lock()
	if service.stopped {
		service.mu.Unlock()
		return nil
	}
	service.stopped = true
	sessions := service.sessions
	service.sessions = make(map[string]*session)
	service.mu.Unlock()

	ids := make([]string, 0, len(sessions))
	for id := range sessions {
		ids = append(ids, id)
	}
	sort.Strings(ids)
	for _, id := range ids {
		closeSession(sessions[id])
	}
	return nil
}
