# soksak-plugin-terminal-xterm

PTY and xterm terminal plugin. It owns terminal generations, byte-preserving
base64 output events, true-color/UTF-8 terminal capabilities, resize, input,
status, close, and process-group reaping. Version starts at `0.0.1`.

## Child environment contract

`DefaultEnvironmentPolicy` removes inherited `NO_COLOR`, declares the xterm
capabilities `TERM=xterm-256color` and `COLORTERM=truecolor`, and declares a
UTF-8 locale on Unix platforms. Windows environment names are matched
case-insensitively and the policy does not invent Unix locale variables there.

The service applies environment values in this order: inherited process
environment, plugin policy, then `Options.Environment`. Explicit application
values therefore override plugin defaults, including an intentional
`NO_COLOR=1`. Unrelated inherited values are retained.
