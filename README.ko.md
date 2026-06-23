# soksak-plugin-terminal

운영체제 PTY로 동작하는 soksak 터미널 플러그인. [xterm.js](https://xtermjs.org/) 터미널을
콘텐츠 탭으로 열고, 새 탭(+) 메뉴에 **터미널** 항목을 추가한다.

PTY는 soksak 코어가 제공한다(`app.pty.*`) — 플러그인은 직접 띄울 수 없다. 이 플러그인은
xterm.js로 터미널을 렌더링하고 설정을 제공한다.

## 사용

새 탭(+) 메뉴의 **터미널**, 또는:

```bash
sok view.open '{"program":"terminal"}'
```

## 설정

| 키 | 기본값 | 설명 |
|---|---|---|
| `shell` | `$SHELL` | 실행할 셸 |
| `xtermRenderer` | `dom` | 렌더러(`dom` / `webgl`) |
| `fontFamily` | JetBrains Mono | 글꼴 |
| `fontSize` | `13` | 글꼴 크기 |
| `scrollback` | `10000` | 스크롤백 줄 수 |
| `cursorBlink` | `true` | 커서 깜빡임 |
| `cursorStyle` | `block` | 커서 모양 |

## 명령

- `send`, `clear` — 텍스트 전송, 화면 지우기
- 코어 `term.exec` / `term.read` / `term.cwd` — view id로 어느 터미널이든 조작

```bash
sok plugin.soksak-plugin-terminal.send '{"text":"echo hi\r"}'
```

## 권한

| 권한 | 용도 |
|---|---|
| `ui` | 콘텐츠 뷰 |
| `commands` | 위 명령 |
| `programs` | + 메뉴 항목 |
| `pty` | PTY 구동(`app.pty.*`) |

다른 플러그인은 `view` 프로그램을 이 터미널로 지정해(`viewPlugin: "soksak-plugin-terminal"`
+ `command`) 명령을 실행할 수 있다 — 에이전트 플러그인(`claude`, `codex`)이 이 방식이다.
