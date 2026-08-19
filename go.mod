module github.com/soksak/soksak-plugin-terminal-xterm

go 1.25.0

require github.com/creack/pty v1.1.24

require (
	github.com/soksak/soksak-contract-terminal v0.0.0
	github.com/soksak/soksak-core v0.0.0
)

replace github.com/soksak/soksak-contract-terminal => ../../soksak-contracts/soksak-contract-terminal

replace github.com/soksak/soksak-core => ../../soksak-core
