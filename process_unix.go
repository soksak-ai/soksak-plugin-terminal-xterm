//go:build !windows

package terminal

import "syscall"

func terminateProcessGroup(pid int) {
	if pid > 0 {
		_ = syscall.Kill(-pid, syscall.SIGKILL)
	}
}
