//go:build !windows

package terminal

import (
	"os/exec"
	"syscall"
	"testing"

	"github.com/creack/pty"
)

func TestServiceShutdownReapsEveryPTYProcess(t *testing.T) {
	service := NewService(nil)
	cmd := exec.Command("/bin/sh", "-c", "sleep 60")
	file, err := pty.Start(cmd)
	if err != nil {
		t.Fatalf("start PTY process: %v", err)
	}
	service.install("terminal-1", &session{pty: file, cmd: cmd})

	if err := service.ServiceShutdown(); err != nil {
		t.Fatalf("shutdown terminal service: %v", err)
	}
	if status := service.Status(); len(status) != 0 {
		t.Fatalf("shutdown must atomically remove every terminal owner: %+v", status)
	}
	if cmd.ProcessState == nil {
		t.Fatal("shutdown must synchronously reap the PTY process")
	}
	waitStatus, ok := cmd.ProcessState.Sys().(syscall.WaitStatus)
	if !ok || (!waitStatus.Exited() && !waitStatus.Signaled()) {
		t.Fatalf("reaped PTY process must be terminal: %+v", cmd.ProcessState)
	}
}
