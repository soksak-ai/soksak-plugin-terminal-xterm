# soksak-plugin-terminal-xterm

Terminal plugin that supplies the Xterm renderer adapter to `soksak-kit-plugin-terminal`.

The common terminal kit owns view registration, PTY and recovery lifecycle, resize coordination,
public status, terminal theme resolution, waits, and every command required by the terminal plugin
contract. This plugin owns only the Xterm-specific renderer adapter, screen buffer, input and IME
behavior, capture refresh, parser benchmark, and its optional `exec` and `cwd` commands. The adapter
translates the kit's complete base palette into Xterm option names; the Kit publishes the four
theme status axes through DOM, status and event. This adapter does not define fallback colours. A repository boundary test rejects
reintroduction of plugin-owned lifecycle primitives or render-driven text waits.

PTY output is serialized into Xterm. One write may be in flight and output that arrives behind it is
coalesced into the next ordered write. Snapshot and live bytes use the same queue, and text waits
observe exact Xterm write-completion callbacks rather than polling or render events.

## Renderer memory

WebGL2 is the default renderer. Failure or context loss switches to the DOM renderer and exposes the
reason in `data-renderer-refusal`. Dispose releases the WebGL context with `WEBGL_lose_context`.

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
`abcf111906bea95d09d5b20da4ffb6c771e59ef6` under its MIT license.

## Verification

The package depends on `@soksak/soksak-contract-plugin-terminal` and `@soksak/soksak-kit-plugin-terminal`,
so every `make` invocation that installs requires `REGISTRY` on the make command line,
`https://registry.npmjs.org` included once the packages are published there. A value from the
environment is refused. The Makefile reads the requirement from `frontend/package.json` and refuses
`REGISTRY required: this package depends on @soksak/...` when it is absent.

The build input is identified by the `pnpm-lock.yaml` integrity, not by `REGISTRY`. pnpm fetches from
`REGISTRY` only a package whose integrity its content-addressable store does not already hold, so a
second install of the same lockfile on the same machine reads the store and never contacts `REGISTRY`.

`make lock` is the only owner operation that regenerates `frontend/pnpm-lock.yaml` after an exact
dependency declaration changes. It updates the lock without materializing packages; normal builds
continue to install the frozen state through `make prepare`.

```sh
make lock REGISTRY=http://host:port/
make verify REGISTRY=http://host:port/
make attest \
  OUT=/absolute/xterm-release-output \
  STORE=/absolute/local-release-store \
  REGISTRY=http://host:port/
```

The login profile selects one installed `soksak-sdk` on `PATH`. Make derives that installation's
release document and prepared Spec from the executable location; it accepts no SDK path override.
`SDK_VERSION` is the single required tooling version, checked against both installed manifests.
`STORE` supplies exact unpublished runtime dependency releases. Repeating the command preserves an
equal completed output and refuses different bytes; no component source path is discovered.

`.node-version`, `frontend/package.json#engines.node`, and
`frontend/package.json#packageManager` are the exact toolchain owners. Make rejects a mismatched
Node architecture or a delegated pnpm executable before running the frozen install. Release Actions
run the same Make owner proof with `REGISTRY=https://registry.npmjs.org/`. The release train hands
Actions the exact spec package (URL and SHA-256) as the verification tool; it is not a build input of
the bundle. The WebKit IME addon is consumed only from the exact package.json/lockfile Git
archive; the workflow does not perform a second, conflicting source checkout.
