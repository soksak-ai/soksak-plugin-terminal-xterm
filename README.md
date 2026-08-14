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

## WebKit IME contract

The frontend owns the WKWebView Korean/CJK composition boundary. It routes the
standard composition path through xterm, intercepts WebKit's non-standard
`insertText`/`insertReplacementText` path, suppresses leaked partial jamo, and
serializes finalized text with following PTY writes so input order cannot race.
The terminal host exposes `data-terminal-ime="webkit"` while this owner is
active.

The WebKit adapter is vendored from `min-median-max/xterm-addon-webkit-ime` at
commit `bf2e218ae651f2c8ee01e1fe515679cb8c56bcd2` under its MIT license. The
upstream repository does not currently publish the `dist` entry declared by
its package metadata, so the audited source is pinned locally instead of using
a broken runtime package dependency.
