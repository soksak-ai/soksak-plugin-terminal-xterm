package terminal

import (
	"encoding/base64"
	"strings"
	"testing"
)

func TestTerminalEnvironmentDeclaresUnicodeAndTrueColorCapabilities(t *testing.T) {
	environment := terminalEnvironment(
		[]string{"PATH=/usr/bin", "TERM=dumb", "LANG=C", "NO_COLOR=1"},
		DefaultEnvironmentPolicy(),
		nil,
	)
	joined := strings.Join(environment, "\n")
	for _, required := range []string{"TERM=xterm-256color", "COLORTERM=truecolor", "LANG=en_US.UTF-8", "LC_CTYPE=en_US.UTF-8"} {
		if !strings.Contains(joined, required) {
			t.Fatalf("terminal environment missing %s: %v", required, environment)
		}
	}
	if strings.Contains(joined, "NO_COLOR=") {
		t.Fatalf("terminal environment retained the inherited colour suppression flag: %v", environment)
	}
}

func TestTerminalEnvironmentPolicyOwnsOnlyDeclaredVariables(t *testing.T) {
	policy := EnvironmentPolicy{
		Remove: []string{"NO_COLOR", "PRIVATE_FLAG"},
		Defaults: map[string]string{
			"TERM":      "xterm-direct",
			"COLORTERM": "truecolor",
		},
	}
	environment := terminalEnvironment([]string{
		"PATH=/custom/bin",
		"TERM=dumb",
		"NO_COLOR=1",
		"PRIVATE_FLAG=remove-me",
		"SSH_AUTH_SOCK=/tmp/agent.sock",
	}, policy, map[string]string{
		"TERM":     "xterm-kitty",
		"NO_COLOR": "1",
	})
	joined := strings.Join(environment, "\n")
	for _, required := range []string{"PATH=/custom/bin", "SSH_AUTH_SOCK=/tmp/agent.sock", "TERM=xterm-kitty", "COLORTERM=truecolor", "NO_COLOR=1"} {
		if !strings.Contains(joined, required) {
			t.Fatalf("terminal environment missing retained or declared entry %s: %v", required, environment)
		}
	}
	for _, forbidden := range []string{"TERM=dumb", "TERM=xterm-direct", "PRIVATE_FLAG="} {
		if strings.Contains(joined, forbidden) {
			t.Fatalf("terminal environment retained policy-owned entry %s: %v", forbidden, environment)
		}
	}
}

func TestTerminalEnvironmentPolicySeparatesSharedCapabilitiesFromPlatformLocale(t *testing.T) {
	darwin := defaultEnvironmentPolicy("darwin")
	windows := defaultEnvironmentPolicy("windows")
	for _, policy := range []EnvironmentPolicy{darwin, windows} {
		if policy.Defaults["TERM"] != "xterm-256color" || policy.Defaults["COLORTERM"] != "truecolor" {
			t.Fatalf("xterm capability defaults must be shared across platforms: %#v", policy)
		}
	}
	if darwin.Defaults["LANG"] != "en_US.UTF-8" || darwin.Defaults["LC_CTYPE"] != "en_US.UTF-8" {
		t.Fatalf("darwin policy must own its UTF-8 locale: %#v", darwin)
	}
	if _, exists := windows.Defaults["LANG"]; exists {
		t.Fatalf("windows policy must not invent a Unix locale: %#v", windows)
	}
	if !windows.CaseInsensitiveNames {
		t.Fatalf("windows environment names must be matched case-insensitively: %#v", windows)
	}

	environment := terminalEnvironment(
		[]string{"Path=C:\\Windows", "term=dumb", "no_color=1"},
		windows,
		nil,
	)
	joined := strings.Join(environment, "\n")
	if strings.Contains(strings.ToLower(joined), "no_color=") || strings.Contains(strings.ToLower(joined), "term=dumb") {
		t.Fatalf("windows policy did not replace case-insensitive inherited keys: %v", environment)
	}
}

func TestTerminalOutputPreservesRawUTF8AcrossArbitraryPTYChunks(t *testing.T) {
	text := []byte("── boundary ✓")
	chunks := [][]byte{text[:1], text[1:4], text[4:7], text[7:]}
	var reconstructed []byte
	for _, chunk := range chunks {
		output := terminalOutput("leaf-1", 3, chunk)
		decoded, err := base64.StdEncoding.DecodeString(output.DataBase64)
		if err != nil {
			t.Fatalf("decode output: %v", err)
		}
		reconstructed = append(reconstructed, decoded...)
	}
	if string(reconstructed) != string(text) {
		t.Fatalf("PTY bytes changed: got=%q want=%q", reconstructed, text)
	}
}

func TestTerminalInputTraceIsGenerationOwnedAndBounded(t *testing.T) {
	service := NewService(nil, DefaultOptions())
	service.sessions["leaf-1"] = &session{generation: 7}
	handle := Handle{ID: "leaf-1", Generation: 7}
	data := "✓"
	for sequence := uint64(1); sequence <= 70; sequence++ {
		if err := service.TraceInput(handle, InputTrace{Sequence: sequence, Kind: "input", Data: &data}); err != nil {
			t.Fatalf("trace input: %v", err)
		}
	}
	status := service.Status()
	if len(status) != 1 || len(status[0].InputTrace) != 64 {
		t.Fatalf("unexpected bounded trace status: %#v", status)
	}
	if status[0].InputTrace[0].Sequence != 7 || status[0].InputTrace[63].Sequence != 70 {
		t.Fatalf("trace did not preserve the latest ordered events: %#v", status[0].InputTrace)
	}
	if err := service.TraceInput(Handle{ID: "leaf-1", Generation: 6}, InputTrace{Sequence: 71}); err == nil {
		t.Fatal("stale terminal generation accepted an input trace")
	}
}
