//go:build !windows

package terminal

import (
	"encoding/base64"
	"encoding/json"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/soksak/soksak-core/core/control"
	"github.com/soksak/soksak-plugin-terminal-xterm/command"
)

// G1: bytes written through the command surface reach a real login shell, and
// its output comes back through the sink.
//
// The pieces are tested apart elsewhere — the command group against a stub
// owner, the service against a raw PTY. Neither proves the join: a command
// group wired to an owner that never receives the write answers success, and
// nothing reports it. This drives the same path the application drives, with no
// window.
func TestBytesWrittenThroughTheCommandSurfaceReachARealShell(t *testing.T) {
	const marker = "SOKSAK_G1_ROUNDTRIP"

	const stream = "s-roundtrip"
	sink := &recordingSink{arrived: make(chan struct{}, 1), want: marker, stream: stream}
	service := NewService(sink, DefaultOptions())
	t.Cleanup(func() { _ = service.ServiceShutdown() })

	registry := control.NewRegistry()
	command.Register(registry, command.Deps{Sessions: CommandSessions(service)})

	spawned, err := registry.Invoke("spawn_terminal", arguments(t, map[string]any{
		"cols": 80, "rows": 24, "paneId": "pan-aaaaaa", "windowLabel": "win-0123456789abcdef",
		// The receiver the caller minted. Bytes come back addressed to it, the
		// way the frontend's pty capability passes one.
		"onOutput": map[string]string{"__stream": stream},
	}))
	if err != nil {
		t.Fatalf("spawn_terminal: %v", err)
	}
	session, ok := spawned.(command.Spawned)
	if !ok {
		t.Fatalf("spawn_terminal answered %T, want command.Spawned", spawned)
	}

	if _, err := registry.Invoke("write_terminal", arguments(t, map[string]any{
		"id": session.ID, "data": "echo " + marker + "\n",
	})); err != nil {
		t.Fatalf("write_terminal: %v", err)
	}

	// The read loop delivers on its own goroutine, so the test waits on the
	// sink rather than sleeping. The bound is a failure bound: without it a
	// broken join hangs the suite instead of naming itself.
	select {
	case <-sink.arrived:
	case <-time.After(10 * time.Second):
		t.Fatalf("the shell produced no output containing %q; received %q", marker, sink.text())
	}

	if _, err := registry.Invoke("close_terminal", arguments(t, map[string]any{
		"id": session.ID,
	})); err != nil {
		t.Fatalf("close_terminal: %v", err)
	}
	if status := service.Status(); len(status) != 0 {
		t.Fatalf("close_terminal left %d session(s) open: %+v", len(status), status)
	}
}

// recordingSink keeps what the shell wrote and signals once the marker is in it.
type recordingSink struct {
	mu      sync.Mutex
	written strings.Builder
	want    string
	stream  string
	found   bool
	arrived chan struct{}
}

// EmitStream records a frame addressed to the stream the caller passed.
//
// The stream id is compared rather than disregarded: a sink that took every
// frame would pass this test on a build that sent every session's bytes to
// every receiver.
func (sink *recordingSink) EmitStream(stream string, frame any) {
	if stream != sink.stream {
		return
	}
	bytes, ok := frame.(control.StreamBytes)
	if !ok {
		return
	}
	decoded, err := base64.StdEncoding.DecodeString(bytes.Bytes)
	if err != nil {
		return
	}
	sink.mu.Lock()
	defer sink.mu.Unlock()
	sink.written.Write(decoded)
	if !sink.found && strings.Contains(sink.written.String(), sink.want) {
		sink.found = true
		sink.arrived <- struct{}{}
	}
}

func (sink *recordingSink) text() string {
	sink.mu.Lock()
	defer sink.mu.Unlock()
	return sink.written.String()
}

func arguments(t *testing.T, pairs map[string]any) control.Args {
	t.Helper()
	args := control.Args{}
	for name, value := range pairs {
		encoded, err := json.Marshal(value)
		if err != nil {
			t.Fatalf("encoding %s: %v", name, err)
		}
		args[name] = encoded
	}
	return args
}

// A closed window leaves no shells behind, and closes only its own.
//
// The window that owned them is gone, so nothing else will ask about them: the
// key names a window nobody can reach, and the process keeps running with no
// caller. Measured before this landed: WindowClosing withdrew the renderer's
// commands and nothing touched the sessions.
func TestClosingAWindowReapsItsOwnShellsAndNoOthers(t *testing.T) {
	service := NewService(&recordingSink{arrived: make(chan struct{}, 1), want: "\x00"}, DefaultOptions())
	t.Cleanup(func() { _ = service.ServiceShutdown() })

	registry := control.NewRegistry()
	command.Register(registry, command.Deps{Sessions: CommandSessions(service)})

	spawn := func(window, pane string) {
		t.Helper()
		if _, err := registry.Invoke("spawn_terminal", arguments(t, map[string]any{
			"cols": 80, "rows": 24, "windowLabel": window, "paneId": pane,
		})); err != nil {
			t.Fatalf("spawn_terminal(%s, %s): %v", window, pane, err)
		}
	}
	spawn("win-0123456789abcdef", "pan-aaaaaa")
	spawn("win-0123456789abcdef", "pan-bbbbbb")
	spawn("win-fedcba9876543210", "pan-cccccc")

	if open := len(service.Status()); open != 3 {
		t.Fatalf("three spawns left %d sessions open", open)
	}

	answer, err := registry.Invoke("close_window_terminals", arguments(t, map[string]any{
		"windowLabel": "win-0123456789abcdef",
	}))
	if err != nil {
		t.Fatalf("close_window_terminals: %v", err)
	}
	closed, ok := answer.(command.Closed)
	if !ok || closed.Closed != 2 {
		t.Fatalf("close_window_terminals answered %#v, want two closed", answer)
	}

	// The other window's shell is untouched. Reaping every session on any window
	// close is the defect this asserts against, and it looks like a working
	// application until a second window is open.
	if open := len(service.Status()); open != 1 {
		t.Fatalf("%d sessions remain, want the other window's one", open)
	}
}
