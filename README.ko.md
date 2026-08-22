# soksak-plugin-terminal-xterm

`soksak-kit-plugin-terminal`에 Xterm renderer adapter를 제공하는 터미널 플러그인입니다.

공통 terminal kit가 view 등록, PTY 및 복원 수명 주기, 크기 변경 조정, 공개 상태, wait와
터미널 플러그인 계약의 모든 표준 명령을 소유합니다. 이 플러그인은 Xterm 전용 renderer,
screen buffer, theme, 입력과 IME 동작, capture refresh, parser benchmark 및 선택적인 `exec`,
`cwd` 명령만 소유합니다. Repository boundary test는 플러그인 내부에 수명 주기 primitive나
render 사건 기반 text wait가 다시 들어오는 것을 거부합니다.

PTY 출력은 순서를 보존해 Xterm에 전달합니다. 한 번에 write 하나만 진행하고 그동안 도착한
출력은 다음 write 하나로 병합합니다. Snapshot과 live bytes는 같은 queue를 사용하며 text
wait는 polling이나 render 사건이 아니라 정확한 Xterm write-completion callback을 관측합니다.

## WebKit IME 계약

Renderer가 WKWebView의 한글/CJK 조합 경계를 소유합니다. 표준 composition 경로는 Xterm을
통하고, WebKit의 비표준 `insertText`/`insertReplacementText` 경로는 adapter가 처리합니다.
부분 자모 누출을 막고 확정된 텍스트와 뒤따르는 PTY 입력의 순서를 직렬화합니다. 이 소유자가
활성인 동안 renderer는 `data-terminal-ime="webkit"`을 노출합니다.

Adapter는 MIT 라이선스의 `min-median-max/xterm-addon-webkit-ime` commit
`4d00ed700ee26f58250955f68bc8b552b2996645`에 의존합니다.

## 검증

```sh
cd frontend
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
```
