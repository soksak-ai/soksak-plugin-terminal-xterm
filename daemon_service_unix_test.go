//go:build !windows

package terminal

import (
	"encoding/base64"
	"os"
	"strings"
	"sync"
	"syscall"
	"testing"
	"time"

	terminalcontract "github.com/soksak/soksak-contract-terminal"
	"github.com/soksak/soksak-core/core/control"
)

type daemonRecordingSink struct {
	mu   sync.Mutex
	text strings.Builder
	wake chan struct{}
}

func (sink *daemonRecordingSink) EmitStream(_ string, frame any) {
	encoded, ok := frame.(control.StreamBytes)
	if !ok {
		return
	}
	bytes, err := base64.StdEncoding.DecodeString(encoded.Bytes)
	if err != nil {
		return
	}
	sink.mu.Lock()
	sink.text.Write(bytes)
	sink.mu.Unlock()
	select {
	case sink.wake <- struct{}{}:
	default:
	}
}

func (sink *daemonRecordingSink) contains(text string) bool {
	sink.mu.Lock()
	defer sink.mu.Unlock()
	return strings.Contains(sink.text.String(), text)
}

func TestDaemonServiceReattachesTheSameShellAfterOwnerRestart(t *testing.T) {
	binary := os.Getenv("SOKSAK_PTYD_BIN")
	if binary == "" {
		t.Skip("SOKSAK_PTYD_BIN is required for the daemon integration gate")
	}
	home, err := os.MkdirTemp("/tmp", "sokpty-")
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = os.RemoveAll(home) })
	sink := &daemonRecordingSink{wake: make(chan struct{}, 1)}
	options := DaemonOptions{
		Home:         home,
		SourceBinary: binary,
		LoginShell:   "/bin/zsh",
		Environment:  terminalEnvironment(os.Environ(), DefaultEnvironmentPolicy(), nil),
	}

	first, err := NewDaemonService(sink, options)
	if err != nil {
		t.Fatal(err)
	}
	handle, err := first.Open("win-test/tab-test", "test-output", 80, 24)
	if err != nil {
		t.Fatal(err)
	}
	before := first.Status()
	if len(before) != 1 || before[0].PID == 0 {
		t.Fatalf("first status = %#v", before)
	}
	if err := first.Write(handle, "printf '__soksak_reattach__\\n'\r"); err != nil {
		t.Fatal(err)
	}
	deadline := time.After(3 * time.Second)
	for !sink.contains("__soksak_reattach__") {
		select {
		case <-sink.wake:
		case <-deadline:
			t.Fatal("marker did not arrive from the daemon stream")
		}
	}
	if err := first.ServiceShutdown(); err != nil {
		t.Fatal(err)
	}
	if err := syscall.Kill(before[0].PID, 0); err != nil {
		t.Fatalf("shell ended with the first app owner: %v", err)
	}

	second, err := NewDaemonService(sink, options)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() {
		_ = second.Kill(handle)
		_ = second.request(terminalcontract.OperationRequest{Op: "shutdown"}, false, nil)
		_ = second.ServiceShutdown()
	})
	reattached, err := second.Open("win-test/tab-test", "test-output", 80, 24)
	if err != nil {
		t.Fatal(err)
	}
	after := second.Status()
	if len(after) != 1 {
		t.Fatalf("second status = %#v", after)
	}
	if reattached != handle {
		t.Fatalf("handle changed across reattach: before=%#v after=%#v", handle, reattached)
	}
	if after[0].PID != before[0].PID {
		t.Fatalf("shell pid changed across reattach: before=%d after=%d", before[0].PID, after[0].PID)
	}
}
