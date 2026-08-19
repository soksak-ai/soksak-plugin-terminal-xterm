module github.com/soksak/soksak-plugin-terminal-xterm

go 1.25.0

require github.com/creack/pty v1.1.24

require (
	github.com/fsnotify/fsnotify v1.10.1
	github.com/soksak/soksak-contract-terminal v0.0.0
	github.com/soksak/soksak-core v0.0.0
)

require golang.org/x/sys v0.47.0 // indirect

replace github.com/soksak/soksak-contract-terminal => ../../soksak-contracts/soksak-contract-terminal

replace github.com/soksak/soksak-core => ../../soksak-core
