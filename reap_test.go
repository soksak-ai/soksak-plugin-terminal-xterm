package terminal

import (
	"os/exec"
	"testing"

	"github.com/creack/pty"
)

// oneSleepingShell installs a real child so a reap has something to reap. A
// fake session would count a number with no process behind it.
func oneSleepingShell(t *testing.T, service *Service, id string) {
	t.Helper()
	cmd := exec.Command("/bin/sh", "-c", "sleep 60")
	file, err := pty.Start(cmd)
	if err != nil {
		t.Fatalf("start PTY process: %v", err)
	}
	service.install(id, &session{pty: file, cmd: cmd})
}

// Shutdown reports what it reaped.
//
// `app_shutdown_prepare` answers a receipt a caller checks before the process
// goes away: how many shells were reaped, how many surfaces drained, and whether
// anything native is left. A shutdown that reaps correctly and reports nothing
// cannot be part of that receipt, so the one command that quits the application
// had to be served as "this build quits without a prepare phase" — measured
// 2026-08-16, and `sok app.shutdown.commit` answered INTERNAL because of it.
//
// The count is the service's own: it is the only thing that knows how many
// sessions it held.
func TestReapAnswersHowManySessionsItClosed(t *testing.T) {
	service := NewService(nil, DefaultOptions())
	for _, id := range []string{"shl-aaaaaa", "shl-bbbbbb", "shl-cccccc"} {
		oneSleepingShell(t, service, id)
	}

	if reaped := service.Reap(); reaped != 3 {
		t.Errorf("Reap answered %d, want 3", reaped)
	}
	// Idempotent, and the second answer is zero rather than three: nothing was
	// reaped the second time, and a count that repeated itself would report work
	// that did not happen.
	if reaped := service.Reap(); reaped != 0 {
		t.Errorf("a second Reap answered %d, want 0", reaped)
	}
}

// ServiceShutdown is what the framework calls, and it reaps through the same
// path. Two paths would let one of them drift into leaving a shell behind.
func TestServiceShutdownReapsThroughReap(t *testing.T) {
	service := NewService(nil, DefaultOptions())
	oneSleepingShell(t, service, "shl-aaaaaa")
	if err := service.ServiceShutdown(); err != nil {
		t.Fatalf("shutdown: %v", err)
	}
	if reaped := service.Reap(); reaped != 0 {
		t.Errorf("shutdown left %d sessions for Reap to find", reaped)
	}
}
