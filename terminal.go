package terminal

import (
	"encoding/base64"
	"fmt"
	"io"
	"os"
	"os/exec"
	"sort"
	"strconv"
	"sync"

	"github.com/creack/pty"

	"github.com/soksak/soksak-core/core/control"
	"github.com/soksak/soksak-core/core/i18n"
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
type InputTrace struct {
	Sequence    uint64  `json:"sequence"`
	Kind        string  `json:"kind"`
	Data        *string `json:"data,omitempty"`
	InputType   string  `json:"inputType,omitempty"`
	IsComposing *bool   `json:"isComposing,omitempty"`
	Key         string  `json:"key,omitempty"`
	KeyCode     uint16  `json:"keyCode,omitempty"`
	Message     string  `json:"message,omitempty"`
}
type Status struct {
	ID         string       `json:"id"`
	Generation uint64       `json:"generation"`
	PID        int          `json:"pid"`
	InputTrace []InputTrace `json:"inputTrace"`
}

// OutputSink delivers one frame to the receiver the caller passed when it opened
// the session.
//
// The stream id comes from the caller, not from this package, and the sink has
// no terminal-specific part: a host that can deliver a frame to a stream can
// deliver any backend's frames. A fixed event name per feature would make the
// frontend refuse every event nobody declared — measured 2026-08-15, this
// package emitted terminal:output and the plugin bus refused it by name.
type OutputSink interface {
	EmitStream(stream string, frame any)
}

// InputTraceSink is where this package's keystroke records go. It is the core's
// diagnostic contract (control.TraceSink), declared here by its name because a
// consumer names the interface it needs — and taking the core's shape rather
// than this package's is what lets a host implement it while knowing no plugin.
//
// It took Handle and InputTrace before, so the one host that implements it held
// two of this package's types for a body that only marshals and logs them.
type InputTraceSink interface {
	Trace(kind string, record any)
}

// InputTraceKind is what this package's keystroke records are named. One
// constant rather than a string at the call site: two spellings are two
// channels nobody can read at once.
const InputTraceKind = "terminal.input"

// tracedInput is one keystroke record on the wire: which session, and what
// arrived. Both were separate arguments and a reader had to be told how they
// went together.
type tracedInput struct {
	Handle Handle     `json:"handle"`
	Event  InputTrace `json:"event"`
}

type session struct {
	// stream is where this session's bytes go. Empty means the caller opened
	// it with no receiver and produces no frames.
	stream     string
	generation uint64
	pty        *os.File
	cmd        *exec.Cmd
	inputTrace []InputTrace
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

// send delivers one frame to the session's receiver.
//
// A session opened with no receiver produces no frames. That is a caller who
// asked for a shell and not for its bytes, which the sok round-trip tests do.
func (service *Service) send(stream string, frame any) {
	if stream == "" || service.sink == nil {
		return
	}
	service.sink.EmitStream(stream, frame)
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

// Open starts a shell for id and sends its bytes to stream.
//
// An empty stream opens a shell nobody reads. The caller asked for a process,
// not for its output, and that is what a round-trip check over the control
// plane does.
func (service *Service) Open(id string, stream string, cols, rows uint16) (Handle, error) {
	if id == "" || cols == 0 || rows == 0 {
		return Handle{}, i18n.Errorf("terminal.open.identityAndSize", nil)
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
	handle := service.install(id, &session{pty: file, cmd: cmd, stream: stream})
	if handle.Generation == 0 {
		return Handle{}, i18n.Errorf("terminal.open.shuttingDown", nil)
	}
	go service.read(handle, stream, file)
	return handle, nil
}

func (service *Service) read(handle Handle, stream string, file *os.File) {
	buffer := make([]byte, 32*1024)
	for {
		count, err := file.Read(buffer)
		if count > 0 {
			service.send(stream, control.Bytes(buffer[:count]))
		}
		if err != nil {
			if err != io.EOF {
				service.send(stream, control.Bytes([]byte("\r\n[terminal closed]\r\n")))
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
		return nil, i18n.Errorf("terminal.session.noOwner", map[string]string{
			"id":         handle.ID,
			"generation": strconv.FormatUint(handle.Generation, 10),
		})
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
		return i18n.Errorf("terminal.resize.zeroSize", nil)
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

func (service *Service) TraceInput(handle Handle, event InputTrace) error {
	service.mu.Lock()
	value := service.sessions[handle.ID]
	if value == nil || value.generation != handle.Generation {
		service.mu.Unlock()
		return i18n.Errorf("terminal.session.noOwner", map[string]string{
			"id":         handle.ID,
			"generation": strconv.FormatUint(handle.Generation, 10),
		})
	}
	value.inputTrace = append(value.inputTrace, event)
	if len(value.inputTrace) > 64 {
		value.inputTrace = append([]InputTrace(nil), value.inputTrace[len(value.inputTrace)-64:]...)
	}
	service.mu.Unlock()
	if sink, ok := service.sink.(InputTraceSink); ok {
		sink.Trace(InputTraceKind, tracedInput{Handle: handle, Event: event})
	}
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
		result = append(result, Status{
			ID: id, Generation: value.generation, PID: pid,
			InputTrace: append([]InputTrace(nil), value.inputTrace...),
		})
	}
	sort.Slice(result, func(i, j int) bool { return result[i].ID < result[j].ID })
	return result
}

func (service *Service) ServiceShutdown() error {
	service.Reap()
	return nil
}

// Reap closes every session this service holds and answers how many it closed.
//
// The count is this service's own — nothing else knows how many sessions it
// held — and it is what `app_shutdown_prepare` puts in the receipt a caller
// checks before the process goes away. A shutdown that reaped correctly and
// reported nothing could not be part of that receipt, so the one command that
// quits the application was declared unserved (measured 2026-08-16: `sok
// app.shutdown.commit` answered INTERNAL).
//
// Idempotent, and a second call answers zero rather than the first count: a
// number that repeated itself would report work that did not happen.
func (service *Service) Reap() int {
	service.mu.Lock()
	if service.stopped {
		service.mu.Unlock()
		return 0
	}
	service.stopped = true
	sessions := service.sessions
	service.sessions = make(map[string]*session)
	service.mu.Unlock()

	ids := make([]string, 0, len(sessions))
	for id := range sessions {
		ids = append(ids, id)
	}
	// Sorted, so two runs of one shutdown close in the same order and a failure
	// names the same session twice rather than a different one each time.
	sort.Strings(ids)
	for _, id := range ids {
		closeSession(sessions[id])
	}
	return len(ids)
}
