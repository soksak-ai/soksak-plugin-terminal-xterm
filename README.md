# soksak-plugin-terminal

A terminal for soksak, backed by the operating system's PTY. It opens an
[xterm.js](https://xtermjs.org/) terminal as a content tab and adds a **Terminal** item to
the new-tab (+) menu.

The PTY is provided by soksak's core (`app.pty.*`); a plugin cannot start one. This plugin
renders the terminal with xterm.js and provides its settings.

## Usage

From the + menu (**Terminal**), or:

```bash
sok view.open '{"program":"terminal"}'
```

## Settings

| key | default | description |
|---|---|---|
| `shell` | `$SHELL` | shell to run |
| `xtermRenderer` | `dom` | renderer (`dom` or `webgl`) |
| `fontFamily` | JetBrains Mono | font |
| `fontSize` | `13` | font size |
| `scrollback` | `10000` | scrollback lines |
| `cursorBlink` | `true` | cursor blink |
| `cursorStyle` | `block` | cursor style |

## Commands

- `send`, `clear` — send text, clear the screen
- core `term.exec` / `term.read` / `term.cwd` — operate any terminal by its view id

```bash
sok plugin.soksak-plugin-terminal.send '{"text":"echo hi\r"}'
```

## Permissions

| permission | for |
|---|---|
| `ui` | the content view |
| `commands` | the commands above |
| `programs` | the + menu entry |
| `pty` | running the PTY (`app.pty.*`) |

Other plugins can run a command in this terminal by pointing a `view` program at it
(`viewPlugin: "soksak-plugin-terminal"` + a `command`); the agent plugins (`claude`, `codex`)
work this way.
