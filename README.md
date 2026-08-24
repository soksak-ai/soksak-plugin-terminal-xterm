# soksak-plugin-terminal-xterm

Terminal plugin that supplies the Xterm renderer adapter to `soksak-kit-plugin-terminal`.

The common terminal kit owns view registration, PTY and recovery lifecycle, resize coordination,
public status, waits, and every command required by the terminal plugin contract. This plugin owns
only the Xterm-specific renderer, screen buffer, theme, input and IME behavior, capture refresh,
parser benchmark, and its optional `exec` and `cwd` commands. A repository boundary test rejects
reintroduction of plugin-owned lifecycle primitives or render-driven text waits.

PTY output is serialized into Xterm. One write may be in flight and output that arrives behind it is
coalesced into the next ordered write. Snapshot and live bytes use the same queue, and text waits
observe exact Xterm write-completion callbacks rather than polling or render events.

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

The renderer owns the WKWebView Korean/CJK composition boundary. It routes the
standard composition path through xterm, intercepts WebKit's non-standard
`insertText`/`insertReplacementText` path, suppresses leaked partial jamo, and
serializes finalized text with following PTY writes so input order cannot race.
The terminal host exposes `data-terminal-ime="webkit"` while this owner is
active.

The adapter depends on `min-median-max/xterm-addon-webkit-ime` at commit
`4d00ed700ee26f58250955f68bc8b552b2996645` under its MIT license.

## Verification

```sh
make verify
```

`.node-version`, `frontend/package.json#engines.node`, and
`frontend/package.json#packageManager` are the exact toolchain owners. Make rejects a mismatched
Node architecture or a delegated pnpm executable before running the frozen install. Release Actions
invoke the same Make owner proof through the exact spec package supplied by release-train URL and
SHA-256 inputs. The WebKit IME addon is consumed only from the exact package.json/lockfile Git
archive; the workflow does not perform a second, conflicting source checkout.
