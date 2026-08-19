package terminal

import (
	"encoding/json"

	"github.com/soksak/soksak-plugin-terminal-xterm/command"
)

// CommandSessions joins the command group to this owner of the file descriptors.
//
// The two Handle types are identical in shape and stay separate: the command
// group declares what it needs from an owner, and the owner declares what it
// is. The command group imports nothing — a gate there holds it to that — so
// the conversion is in this file, where both are already named.
//
// The registration itself is the host's, next to the service list: the plugin
// implements ServiceName and ServiceShutdown, which are plain method sets, but
// ServiceStartup takes a framework type and a plugin does not name a framework.
func CommandSessions(service Owner) command.Sessions {
	base := commandSessions{service: service}
	if daemon, ok := service.(interface {
		Ack(Handle, uint64) error
		PaneAlive(string) (bool, error)
		DaemonStatus() (any, error)
		SidecarRequest(json.RawMessage) (any, error)
	}); ok {
		return daemonCommandSessions{commandSessions: base, daemon: daemon}
	}
	return base
}

type commandSessions struct{ service Owner }

type daemonCommandSessions struct {
	commandSessions
	daemon interface {
		Ack(Handle, uint64) error
		PaneAlive(string) (bool, error)
		DaemonStatus() (any, error)
		SidecarRequest(json.RawMessage) (any, error)
	}
}

func (sessions daemonCommandSessions) Ack(handle command.Handle, bytes uint64) error {
	return sessions.daemon.Ack(ownerHandle(handle), bytes)
}

func (sessions daemonCommandSessions) PaneAlive(paneID string) (bool, error) {
	return sessions.daemon.PaneAlive(paneID)
}

func (sessions daemonCommandSessions) DaemonStatus() (any, error) {
	return sessions.daemon.DaemonStatus()
}

func (sessions daemonCommandSessions) SidecarRequest(request json.RawMessage) (any, error) {
	return sessions.daemon.SidecarRequest(request)
}

func (sessions commandSessions) Open(key string, stream string, cols, rows uint16) (command.Handle, error) {
	handle, err := sessions.service.Open(key, stream, cols, rows)
	return command.Handle{ID: handle.ID, Generation: handle.Generation}, err
}

func (sessions commandSessions) Write(handle command.Handle, data string) error {
	return sessions.service.Write(ownerHandle(handle), data)
}

func (sessions commandSessions) Resize(handle command.Handle, cols, rows uint16) error {
	return sessions.service.Resize(ownerHandle(handle), cols, rows)
}

func (sessions commandSessions) Close(handle command.Handle) error {
	return sessions.service.Close(ownerHandle(handle))
}

func ownerHandle(handle command.Handle) Handle {
	return Handle{ID: handle.ID, Generation: handle.Generation}
}
