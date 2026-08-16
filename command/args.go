package command

import (
	"encoding/json"
	"fmt"

	"github.com/soksak/soksak-core/core/control"
	"github.com/soksak/soksak-core/core/i18n"
)

// Argument decoding for the terminal commands.
//
// Every helper takes the command name so a refusal names the call as well as
// the field. A log line reading only `missing argument "id"` leaves the
// reader to guess which of five commands produced it.
//
// One rule runs through all of them: absent, null, empty, and zero are four
// different answers, and none of them may be quietly promoted to a default. A
// defaulted size mis-renders a pane; a defaulted id writes into someone else's
// shell.

// size reads a screen dimension. Zero is refused rather than defaulted: a zero
// winsize reports zero columns to a full-screen program, and it redraws
// into nothing. json.Unmarshal leaves the destination untouched on a JSON null
// rather than erroring, so a null arrives here as the zero this already
// refuses — the collapse is harmless only because zero is not a legal size.
// Where it would be legal the null has to be caught before decoding, which is
// what requiredText does.
func size(command string, args control.Args, name string) (uint16, error) {
	raw, present := args[name]
	if !present {
		return 0, i18n.Errorf("terminal.args.missingSize", map[string]string{"command": command, "name": name})
	}
	var value uint16
	if err := json.Unmarshal(raw, &value); err != nil {
		return 0, fmt.Errorf("%s: argument %q is not a screen dimension: %w", command, name, err)
	}
	if value == 0 {
		return 0, i18n.Errorf("terminal.args.zeroSize", map[string]string{"command": command, "name": name})
	}
	return value, nil
}

// optionalText reads a string the caller may leave out. The frontend spells
// "none" as JSON null (`cwd: opts.cwd ?? null`), so null reports absent; an
// empty string is a value the caller chose and reports present.
func optionalText(command string, args control.Args, name string) (string, bool, error) {
	raw, present := args[name]
	if !present || string(raw) == "null" {
		return "", false, nil
	}
	var value string
	if err := json.Unmarshal(raw, &value); err != nil {
		return "", false, fmt.Errorf("%s: argument %q is not text: %w", command, name, err)
	}
	return value, true, nil
}

// requiredText reads a string that must arrive. An empty one is accepted — a
// zero-byte write is not an error — but an absent or null one is refused, or a
// caller's dropped field becomes a silent no-op.
func requiredText(command string, args control.Args, name string) (string, error) {
	raw, present := args[name]
	if !present {
		return "", i18n.Errorf("terminal.args.missing", map[string]string{"command": command, "name": name})
	}
	// json.Unmarshal leaves a string untouched on null, so null would arrive
	// here indistinguishable from "" — the one collapse this helper exists to
	// prevent. It is checked before decoding rather than after.
	if string(raw) == "null" {
		return "", i18n.Errorf("terminal.args.nullText", map[string]string{"command": command, "name": name})
	}
	var value string
	if err := json.Unmarshal(raw, &value); err != nil {
		return "", fmt.Errorf("%s: argument %q is not text: %w", command, name, err)
	}
	return value, nil
}

// paneArgument reads the pane id the observation commands take.
//
// It must arrive and it must name something. An empty pane id is not the same
// answer as an absent one, and answering "not alive" for it would report a fact
// about a pane instead of a fault in the call.
func paneArgument(command string, args control.Args) (string, error) {
	paneID, err := requiredText(command, args, "paneId")
	if err != nil {
		return "", err
	}
	if paneID == "" {
		return "", i18n.Errorf("terminal.args.emptyPane", map[string]string{"command": command, "name": "paneId"})
	}
	return paneID, nil
}

// sessionID reads a core-minted session id. Ids start at 1, so 0 is a caller
// that never received one — usually a field that was never filled in. Reporting
// "no such terminal" for that would send the reader looking for a dead shell.
func sessionID(command string, args control.Args) (uint32, error) {
	raw, present := args["id"]
	if !present {
		return 0, i18n.Errorf("terminal.args.missing", map[string]string{"command": command, "name": "id"})
	}
	var value uint32
	if err := json.Unmarshal(raw, &value); err != nil {
		return 0, fmt.Errorf("%s: argument %q is not a session id: %w", command, "id", err)
	}
	if value == 0 {
		return 0, i18n.Errorf("terminal.args.zeroSessionID", map[string]string{"command": command, "name": "id"})
	}
	return value, nil
}

// byteCount reads a non-negative count. Zero is ordinary; a negative one would
// credit the flow window instead of debiting it, and the owner's reader would
// never reach its pause mark.
func byteCount(command string, args control.Args, name string) (uint64, error) {
	raw, present := args[name]
	if !present {
		return 0, i18n.Errorf("terminal.args.missing", map[string]string{"command": command, "name": name})
	}
	var signed int64
	if err := json.Unmarshal(raw, &signed); err != nil {
		return 0, fmt.Errorf("%s: argument %q is not a byte count: %w", command, name, err)
	}
	if signed < 0 {
		return 0, i18n.Errorf("terminal.args.negativeCount", map[string]string{"command": command, "name": name})
	}
	return uint64(signed), nil
}

// replaySpawns reports whether this build can honour the caller's replay
// control.
//
// Three wire forms arrive here — absent, "none", and {fromSeq}.
// Absent and "none" both mean the consumer owns its screen and requests no
// restore from the core, which is the only thing that happens here. {fromSeq}
// is a
// coordinate into the daemon's output ring; no ring exists in this generation,
// so a session opened under it would hand the consumer a silently empty tail
// where it expected the bytes it had not yet drawn.
func replaySpawns(command string, args control.Args) error {
	raw, present := args["replay"]
	if !present || string(raw) == "null" {
		return nil
	}
	var mode string
	if err := json.Unmarshal(raw, &mode); err == nil {
		if mode == "none" {
			return nil
		}
		return i18n.Errorf("terminal.args.replayMode", map[string]string{
			"command": command, "name": "replay", "mode": mode})
	}
	return i18n.Errorf("terminal.args.replayRange", map[string]string{"command": command, "name": "replay"})
}
