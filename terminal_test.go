package terminal

import (
	"encoding/base64"
	"strings"
	"testing"
)

func TestTerminalEnvironmentDeclaresUnicodeAndTrueColorCapabilities(t *testing.T) {
	environment := terminalEnvironment([]string{"PATH=/usr/bin", "TERM=dumb", "LANG=C"})
	joined := strings.Join(environment, "\n")
	for _, required := range []string{"TERM=xterm-256color", "COLORTERM=truecolor", "LANG=en_US.UTF-8", "LC_CTYPE=en_US.UTF-8"} {
		if !strings.Contains(joined, required) {
			t.Fatalf("terminal environment missing %s: %v", required, environment)
		}
	}
}

func TestTerminalOutputPreservesRawUTF8AcrossArbitraryPTYChunks(t *testing.T) {
	text := []byte("경계 ── ✓")
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
