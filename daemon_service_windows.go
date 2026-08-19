//go:build windows

package terminal

import (
	"encoding/json"
	"errors"
)

type DaemonOptions struct {
	Home                string
	SourceBinary        string
	LoginShell          string
	Environment         []string
	RestoreUnit         string
	RestoreSourceBinary string
}

type DaemonService struct{}

func NewDaemonService(OutputSink, DaemonOptions) (*DaemonService, error) {
	return nil, errors.New("the PTY daemon named-pipe transport is not implemented on Windows")
}

func (*DaemonService) ServiceName() string    { return "soksak-pty-daemon" }
func (*DaemonService) ServiceShutdown() error { return nil }
func (*DaemonService) Open(string, string, uint16, uint16, *uint64) (Handle, error) {
	return Handle{}, errors.New("PTY daemon unavailable")
}
func (*DaemonService) Write(Handle, string) error { return errors.New("PTY daemon unavailable") }
func (*DaemonService) Resize(Handle, uint16, uint16) error {
	return errors.New("PTY daemon unavailable")
}
func (*DaemonService) Close(Handle) error       { return errors.New("PTY daemon unavailable") }
func (*DaemonService) Ack(Handle, uint64) error { return errors.New("PTY daemon unavailable") }
func (*DaemonService) PaneAlive(string) (bool, error) {
	return false, errors.New("PTY daemon unavailable")
}
func (*DaemonService) DaemonStatus() (any, error) { return nil, errors.New("PTY daemon unavailable") }
func (*DaemonService) SidecarRequest(json.RawMessage) (any, error) {
	return nil, errors.New("PTY daemon unavailable")
}
func (*DaemonService) TraceInput(Handle, InputTrace) error {
	return errors.New("PTY daemon unavailable")
}
func (*DaemonService) Status() []Status { return nil }
func (*DaemonService) Reap() int        { return 0 }
