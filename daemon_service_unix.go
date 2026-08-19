//go:build !windows

package terminal

import (
	"bufio"
	"bytes"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
	"syscall"
	"time"

	"github.com/fsnotify/fsnotify"
	terminalcontract "github.com/soksak/soksak-contract-terminal"
	"github.com/soksak/soksak-core/core/control"
)

type DaemonOptions struct {
	Home                string
	SourceBinary        string
	LoginShell          string
	Environment         []string
	RestoreUnit         string
	RestoreSourceBinary string
}

type daemonSession struct {
	key        string
	stream     string
	info       terminalcontract.SessionInfo
	connection net.Conn
	trace      []InputTrace
}

const sidecarOperationDeadline = 4 * time.Second

type DaemonService struct {
	mu       sync.Mutex
	options  DaemonOptions
	sink     OutputSink
	control  net.Conn
	reader   *bufio.Reader
	sessions map[string]*daemonSession
	stopped  bool
}

func NewDaemonService(sink OutputSink, options DaemonOptions) (*DaemonService, error) {
	if options.Home == "" {
		return nil, errors.New("terminal daemon home is required")
	}
	if options.SourceBinary == "" {
		return nil, errors.New("terminal daemon source binary is required")
	}
	if options.LoginShell == "" {
		return nil, errors.New("terminal daemon login shell is required")
	}
	if options.RestoreUnit == "" {
		options.RestoreUnit = "terminal-alacritty"
	}
	if options.RestoreSourceBinary == "" {
		path, err := terminalcontract.SidecarBinaryPath(options.Home, options.RestoreUnit)
		if err != nil {
			return nil, err
		}
		options.RestoreSourceBinary = path
	}
	return &DaemonService{
		options:  options,
		sink:     sink,
		sessions: make(map[string]*daemonSession),
	}, nil
}

func (service *DaemonService) ServiceName() string { return "soksak-pty-daemon" }

func (service *DaemonService) Open(key, stream string, cols, rows uint16, fromSeq *uint64) (Handle, error) {
	window, pane, found := strings.Cut(key, "/")
	if !found || window == "" || pane == "" || strings.Contains(pane, "/") {
		return Handle{}, fmt.Errorf("terminal daemon key must be window/pane: %q", key)
	}
	environment := make([][2]string, 0, len(service.options.Environment))
	for _, entry := range service.options.Environment {
		name, value, present := strings.Cut(entry, "=")
		if present && name != "" {
			environment = append(environment, [2]string{name, value})
		}
	}
	request := terminalcontract.CreateOrAttachRequest{
		Op: "createOrAttach", PaneID: pane, Cols: cols, Rows: rows,
		Shell: service.options.LoginShell, Environment: environment,
		EnvironmentDrop: []string{}, WindowLabel: window,
	}
	var info terminalcontract.SessionInfo
	if err := service.request(request, true, &info); err != nil {
		return Handle{}, err
	}
	connection, reader, err := service.attach(info.Session, fromSeq)
	if err != nil {
		return Handle{}, err
	}
	value := &daemonSession{key: key, stream: stream, info: info, connection: connection}
	service.mu.Lock()
	if service.stopped {
		service.mu.Unlock()
		_ = connection.Close()
		return Handle{}, errors.New("terminal daemon service is stopped")
	}
	if previous := service.sessions[key]; previous != nil {
		_ = previous.connection.Close()
	}
	service.sessions[key] = value
	service.mu.Unlock()
	go service.read(value, reader)
	return Handle{ID: key, Generation: info.Generation}, nil
}

func (service *DaemonService) attach(session uint64, fromSeq *uint64) (net.Conn, *bufio.Reader, error) {
	token, err := service.token()
	if err != nil {
		return nil, nil, err
	}
	connection, err := net.Dial("unix", terminalcontract.StreamSocketPath(service.options.Home))
	if err != nil {
		return nil, nil, err
	}
	hello := terminalcontract.NewHello(token, fmt.Sprintf("wails-%d", os.Getpid()))
	hello.Session = &session
	hello.FromSeq = fromSeq
	if err := json.NewEncoder(connection).Encode(hello); err != nil {
		_ = connection.Close()
		return nil, nil, err
	}
	reader := bufio.NewReader(connection)
	line, err := reader.ReadBytes('\n')
	if err != nil {
		_ = connection.Close()
		return nil, nil, err
	}
	var reply terminalcontract.Reply
	if err := json.Unmarshal(bytes.TrimSpace(line), &reply); err != nil {
		_ = connection.Close()
		return nil, nil, err
	}
	var ack terminalcontract.StreamAck
	if err := reply.DecodeData(&ack); err != nil {
		_ = connection.Close()
		return nil, nil, err
	}
	return connection, reader, nil
}

func (service *DaemonService) read(session *daemonSession, reader io.Reader) {
	buffer := make([]byte, 64*1024)
	for {
		count, err := reader.Read(buffer)
		if count > 0 && session.stream != "" && service.sink != nil {
			service.sink.EmitStream(session.stream, control.Bytes(buffer[:count]))
		}
		if err != nil {
			return
		}
	}
}

func (service *DaemonService) Write(handle Handle, data string) error {
	session, err := service.current(handle)
	if err != nil {
		return err
	}
	return service.request(terminalcontract.WriteRequest{
		Op: "write", Session: session.info.Session,
		DataBase64: base64.StdEncoding.EncodeToString([]byte(data)),
	}, false, nil)
}

func (service *DaemonService) Resize(handle Handle, cols, rows uint16) error {
	session, err := service.current(handle)
	if err != nil {
		return err
	}
	return service.request(terminalcontract.ResizeRequest{
		Op: "resize", Session: session.info.Session, Cols: cols, Rows: rows,
	}, false, nil)
}

func (service *DaemonService) Ack(handle Handle, bytes uint64) error {
	session, err := service.current(handle)
	if err != nil {
		return err
	}
	return service.request(terminalcontract.AckRequest{
		Op: "ack", Session: session.info.Session, Bytes: bytes,
	}, false, nil)
}

func (service *DaemonService) PaneAlive(paneID string) (bool, error) {
	sessions, err := service.daemonSessions()
	if err != nil {
		return false, err
	}
	for _, session := range sessions {
		if session.PaneID == paneID {
			return true, nil
		}
	}
	return false, nil
}

func (service *DaemonService) DaemonStatus() (any, error) {
	var ping struct {
		PID             int `json:"pid"`
		Sessions        int `json:"sessions"`
		HandoffContract int `json:"handoffContract"`
	}
	if err := service.request(terminalcontract.OperationRequest{Op: "ping"}, false, &ping); err != nil {
		return nil, err
	}
	sessions, err := service.daemonSessions()
	if err != nil {
		return nil, err
	}
	owners := make([]map[string]any, 0, len(sessions))
	for _, session := range sessions {
		owners = append(owners, map[string]any{
			"owner": "pty-supervisor", "session": session.Session,
			"windowLabel": session.WindowLabel, "paneId": session.PaneID,
			"shellPid": session.ShellPID, "generation": session.Generation,
		})
	}
	return map[string]any{
		"running": true, "pid": ping.PID, "sessions": ping.Sessions,
		"sessionOwners": owners, "ownershipComplete": len(owners) == ping.Sessions,
		"protocol":                terminalcontract.ProtocolVersion,
		"handoffContract":         ping.HandoffContract,
		"handoffContractRequired": terminalcontract.HandoffContract,
		"staged":                  true,
		"stagedPath":              terminalcontract.DaemonBinaryPath(service.options.Home),
	}, nil
}

func (service *DaemonService) SidecarRequest(request json.RawMessage) (any, error) {
	connection, err := service.connectSidecar()
	if err != nil {
		if err := service.startSidecar(); err != nil {
			return nil, err
		}
		connection, err = service.connectSidecar()
		if err != nil {
			return nil, err
		}
	}
	defer func() { _ = connection.Close() }()
	if err := connection.SetDeadline(time.Now().Add(sidecarOperationDeadline)); err != nil {
		return nil, err
	}
	reader := bufio.NewReader(connection)
	token, err := service.token()
	if err != nil {
		return nil, err
	}
	if err := json.NewEncoder(connection).Encode(map[string]any{
		"version": terminalcontract.ProtocolVersion,
		"token":   token,
	}); err != nil {
		return nil, err
	}
	line, err := reader.ReadBytes('\n')
	if err != nil {
		return nil, err
	}
	var hello terminalcontract.Reply
	if err := json.Unmarshal(bytes.TrimSpace(line), &hello); err != nil {
		return nil, err
	}
	if err := hello.DecodeData(nil); err != nil {
		return nil, err
	}
	if _, err := connection.Write(append(append([]byte(nil), request...), '\n')); err != nil {
		return nil, err
	}
	line, err = reader.ReadBytes('\n')
	if err != nil {
		return nil, err
	}
	var result any
	if err := json.Unmarshal(bytes.TrimSpace(line), &result); err != nil {
		return nil, err
	}
	return result, nil
}

func (service *DaemonService) connectSidecar() (net.Conn, error) {
	return net.DialTimeout("unix", terminalcontract.ServiceSocketPath(service.options.Home), sidecarOperationDeadline)
}

func (service *DaemonService) startSidecar() error {
	if service.options.RestoreUnit == "" || service.options.RestoreSourceBinary == "" {
		return errors.New("terminal restore sidecar source is not declared")
	}
	destination, err := terminalcontract.SidecarBinaryPath(service.options.Home, service.options.RestoreUnit)
	if err != nil {
		return err
	}
	if err := stageDaemonBinary(service.options.RestoreSourceBinary, destination); err != nil {
		return err
	}
	runDirectory := filepath.Dir(terminalcontract.ServiceSocketPath(service.options.Home))
	if err := os.MkdirAll(runDirectory, 0o700); err != nil {
		return err
	}
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		return err
	}
	defer func() { _ = watcher.Close() }()
	if err := watcher.Add(runDirectory); err != nil {
		return err
	}
	command := exec.Command(destination)
	command.Env = append(os.Environ(), "SOKSAK_HOME="+service.options.Home)
	command.Stdin = nil
	command.Stdout = io.Discard
	command.Stderr = io.Discard
	command.SysProcAttr = &syscall.SysProcAttr{Setsid: true}
	if err := command.Start(); err != nil {
		return err
	}
	released := false
	defer func() {
		if released {
			return
		}
		_ = command.Process.Kill()
		_, _ = command.Process.Wait()
	}()
	if connection, err := service.connectSidecar(); err == nil {
		_ = connection.Close()
		if err := command.Process.Release(); err != nil {
			return err
		}
		released = true
		return nil
	}
	timer := time.NewTimer(4 * time.Second)
	defer timer.Stop()
	target := terminalcontract.ServiceSocketPath(service.options.Home)
	for {
		select {
		case event, open := <-watcher.Events:
			if !open {
				return errors.New("terminal restore sidecar socket watcher closed")
			}
			if event.Name == target && event.Op&(fsnotify.Create|fsnotify.Rename) != 0 {
				if err := command.Process.Release(); err != nil {
					return err
				}
				released = true
				return nil
			}
		case err, open := <-watcher.Errors:
			if !open {
				return errors.New("terminal restore sidecar socket watcher closed")
			}
			return err
		case <-timer.C:
			return errors.New("terminal restore sidecar did not create its service socket within 4s")
		}
	}
}

func (service *DaemonService) daemonSessions() ([]terminalcontract.SessionInfo, error) {
	var result struct {
		Sessions []terminalcontract.SessionInfo `json:"sessions"`
	}
	if err := service.request(terminalcontract.OperationRequest{Op: "listSessions"}, false, &result); err != nil {
		return nil, err
	}
	return result.Sessions, nil
}

func (service *DaemonService) Close(handle Handle) error { return service.Kill(handle) }

func (service *DaemonService) Kill(handle Handle) error {
	session, err := service.current(handle)
	if err != nil {
		return err
	}
	if err := service.request(terminalcontract.SessionRequest{
		Op: "kill", Session: session.info.Session,
	}, false, nil); err != nil {
		return err
	}
	service.remove(session.key)
	return nil
}

func (service *DaemonService) current(handle Handle) (*daemonSession, error) {
	service.mu.Lock()
	defer service.mu.Unlock()
	session := service.sessions[handle.ID]
	if session == nil || session.info.Generation != handle.Generation {
		return nil, fmt.Errorf("terminal daemon session is not attached: %s/%d", handle.ID, handle.Generation)
	}
	return session, nil
}

func (service *DaemonService) remove(key string) {
	service.mu.Lock()
	session := service.sessions[key]
	delete(service.sessions, key)
	service.mu.Unlock()
	if session != nil {
		_ = session.connection.Close()
	}
}

func (service *DaemonService) TraceInput(handle Handle, event InputTrace) error {
	session, err := service.current(handle)
	if err != nil {
		return err
	}
	service.mu.Lock()
	session.trace = append(session.trace, event)
	if len(session.trace) > 64 {
		session.trace = append([]InputTrace(nil), session.trace[len(session.trace)-64:]...)
	}
	service.mu.Unlock()
	return nil
}

func (service *DaemonService) Status() []Status {
	service.mu.Lock()
	defer service.mu.Unlock()
	result := make([]Status, 0, len(service.sessions))
	for _, session := range service.sessions {
		result = append(result, Status{
			ID: session.key, Generation: session.info.Generation,
			PID: int(session.info.ShellPID), InputTrace: append([]InputTrace(nil), session.trace...),
		})
	}
	return result
}

func (service *DaemonService) ServiceShutdown() error {
	service.Reap()
	service.mu.Lock()
	if service.control != nil {
		_ = service.control.Close()
		service.control = nil
		service.reader = nil
	}
	service.mu.Unlock()
	return nil
}

func (service *DaemonService) Reap() Release {
	service.mu.Lock()
	if service.stopped {
		service.mu.Unlock()
		return Release{}
	}
	service.stopped = true
	sessions := service.sessions
	service.sessions = make(map[string]*daemonSession)
	service.mu.Unlock()
	for _, session := range sessions {
		_ = service.request(terminalcontract.SessionRequest{
			Op: "detach", Session: session.info.Session,
		}, false, nil)
		_ = session.connection.Close()
	}
	return Release{DaemonTransferred: len(sessions)}
}

func (service *DaemonService) token() (string, error) {
	bytes, err := os.ReadFile(terminalcontract.TokenPath(service.options.Home))
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(string(bytes)), nil
}

func (service *DaemonService) request(request any, start bool, target any) error {
	service.mu.Lock()
	defer service.mu.Unlock()
	if service.control == nil {
		if err := service.connectLocked(start); err != nil {
			return err
		}
	}
	if err := json.NewEncoder(service.control).Encode(request); err != nil {
		return err
	}
	line, err := service.reader.ReadBytes('\n')
	if err != nil {
		return err
	}
	var reply terminalcontract.Reply
	if err := json.Unmarshal(bytes.TrimSpace(line), &reply); err != nil {
		return err
	}
	return reply.DecodeData(target)
}

func (service *DaemonService) connectLocked(start bool) error {
	connection, err := service.connect()
	if err == nil {
		service.control = connection
		service.reader = bufio.NewReader(connection)
		return nil
	}
	if !start {
		return err
	}
	if err := service.stageAndStart(); err != nil {
		return err
	}
	connection, err = service.connect()
	if err != nil {
		return err
	}
	service.control = connection
	service.reader = bufio.NewReader(connection)
	return nil
}

func (service *DaemonService) connect() (net.Conn, error) {
	token, err := service.token()
	if err != nil {
		return nil, err
	}
	connection, err := net.Dial("unix", terminalcontract.ControlSocketPath(service.options.Home))
	if err != nil {
		return nil, err
	}
	hello := terminalcontract.NewHello(token, fmt.Sprintf("wails-%d", os.Getpid()))
	if err := json.NewEncoder(connection).Encode(hello); err != nil {
		_ = connection.Close()
		return nil, err
	}
	reader := bufio.NewReader(connection)
	line, err := reader.ReadBytes('\n')
	if err != nil {
		_ = connection.Close()
		return nil, err
	}
	var reply terminalcontract.Reply
	if err := json.Unmarshal(bytes.TrimSpace(line), &reply); err != nil {
		_ = connection.Close()
		return nil, err
	}
	if err := reply.DecodeData(nil); err != nil {
		_ = connection.Close()
		return nil, err
	}
	return connection, nil
}

func (service *DaemonService) stageAndStart() error {
	staged := terminalcontract.DaemonBinaryPath(service.options.Home)
	if err := stageDaemonBinary(service.options.SourceBinary, staged); err != nil {
		return err
	}
	command := exec.Command(staged)
	command.Env = append(os.Environ(), "SOKSAK_HOME="+service.options.Home)
	command.Stdin = nil
	command.Stdout = io.Discard
	command.SysProcAttr = &syscall.SysProcAttr{Setsid: true}
	stderr, err := command.StderrPipe()
	if err != nil {
		return err
	}
	if err := command.Start(); err != nil {
		return err
	}
	ready := make(chan error, 1)
	go func() {
		scanner := bufio.NewScanner(stderr)
		for scanner.Scan() {
			if strings.Contains(scanner.Text(), " serving ") {
				ready <- nil
				return
			}
		}
		ready <- scanner.Err()
	}()
	select {
	case err := <-ready:
		if err != nil {
			return err
		}
	case <-time.After(3 * time.Second):
		return errors.New("terminal daemon did not report readiness within 3s")
	}
	return command.Process.Release()
}

func stageDaemonBinary(source, destination string) error {
	sourceBytes, err := os.ReadFile(source)
	if err != nil {
		return err
	}
	if current, err := os.ReadFile(destination); err == nil && sha256.Sum256(current) == sha256.Sum256(sourceBytes) {
		return nil
	}
	if err := os.MkdirAll(filepath.Dir(destination), 0o700); err != nil {
		return err
	}
	temporary := destination + fmt.Sprintf(".staging-%d", os.Getpid())
	if err := os.WriteFile(temporary, sourceBytes, 0o755); err != nil {
		return err
	}
	if err := os.Rename(temporary, destination); err != nil {
		_ = os.Remove(temporary)
		return err
	}
	return nil
}
