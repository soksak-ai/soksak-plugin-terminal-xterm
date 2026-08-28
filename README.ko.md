# soksak-plugin-terminal-xterm

`soksak-kit-plugin-terminal`에 Xterm renderer adapter를 제공하는 터미널 플러그인입니다.

공통 terminal kit가 view 등록, PTY 및 복원 수명 주기, 크기 변경 조정, 공개 상태, terminal
theme 해석, wait와 터미널 플러그인 계약의 모든 표준 명령을 소유합니다. 이 플러그인은 Xterm
전용 renderer adapter, screen buffer, 입력과 IME 동작, capture refresh, parser benchmark 및
선택적인 `exec`, `cwd` 명령만 소유합니다. Adapter는 Kit의 완전한 base palette를 Xterm option
이름으로 변환하고 Kit이 theme 상태 네 축을 DOM·status·event로 게시합니다. Adapter는 fallback 색상을
정의하지 않습니다. Repository boundary test는 플러그인 내부에 수명 주기 primitive나 render
사건 기반 text wait가 다시 들어오는 것을 거부합니다.

PTY 출력은 순서를 보존해 Xterm에 전달합니다. 한 번에 write 하나만 진행하고 그동안 도착한
출력은 다음 write 하나로 병합합니다. Snapshot과 live bytes는 같은 queue를 사용하며 text
wait는 polling이나 render 사건이 아니라 정확한 Xterm write-completion callback을 관측합니다.

## Renderer 메모리

기본 renderer는 WebGL2입니다. 생성 실패나 context loss 시 DOM renderer로 전환하고 이유를
`data-renderer-refusal`에 노출합니다. Dispose는 `WEBGL_lose_context`로 context를 해제합니다.

## WebKit IME 계약

Renderer가 WKWebView의 한글/CJK 조합 경계를 소유합니다. 표준 composition 경로는 Xterm을
통하고, WebKit의 비표준 `insertText`/`insertReplacementText` 경로는 adapter가 처리합니다.
부분 자모 누출을 막고 확정된 텍스트와 뒤따르는 PTY 입력의 순서를 직렬화합니다. 이 소유자가
활성인 동안 renderer는 `data-terminal-ime="webkit"`을 노출합니다.

Adapter는 MIT 라이선스의 `min-median-max/xterm-addon-webkit-ime` commit
`abcf111906bea95d09d5b20da4ffb6c771e59ef6`에 의존합니다.

## 검증

이 패키지는 `@soksak/soksak-contract-plugin-terminal`과 `@soksak/soksak-kit-plugin-terminal`에
의존하므로, install을 수행하는 모든 `make` 호출은 make 명령줄의 `REGISTRY`를 요구합니다. 패키지가
`https://registry.npmjs.org`에 게시된 뒤에도 같습니다. 환경 변수로 전달된 값은 거부됩니다. Makefile은
`frontend/package.json`에서 이 요구를 읽고, 없으면
`REGISTRY required: this package depends on @soksak/...`으로 거부합니다.

빌드 입력의 정체성은 `REGISTRY`가 아니라 `pnpm-lock.yaml`의 integrity입니다. pnpm은 content-addressable
store에 없는 integrity의 패키지만 `REGISTRY`에서 받으므로, 같은 기계에서 같은 lockfile을 다시 install하면
store를 읽고 `REGISTRY`에 접속하지 않습니다.

```sh
make verify REGISTRY=http://host:port/
make attest \
  OUT=/absolute/xterm-release-output \
  STORE=/absolute/local-release-store \
  REGISTRY=http://host:port/
```

로그인 프로필이 설치된 `soksak-sdk` 하나를 `PATH`에서 선택합니다. Make는 실행 파일 위치에서 그 설치의
release document와 준비된 Spec을 도출하며 SDK path override를 받지 않습니다. `SDK_VERSION`은 유일한
요구 tooling version이며 설치된 두 manifest와 비교합니다. `STORE`는 정확한 미공개
runtime dependency release를 제공합니다. 같은 명령은 동일한 완성 output을 보존하고 다른 byte를
거부하며 component 소스 경로를 탐색하지 않습니다.

정확한 toolchain 정본은 `.node-version`, `frontend/package.json#engines.node`,
`frontend/package.json#packageManager`입니다. Make는 frozen install 전에 Node architecture가
다르거나 pnpm executable이 다른 버전에 위임된 환경을 거부합니다. 릴리스 Actions도 release
train이 URL과 SHA-256으로 전달한 정확한 spec package를 통해 같은 Make owner proof를 실행합니다.
WebKit IME addon은 package.json과 lockfile이 선언한 정확한 Git archive로만 소비하며, workflow가
서로 다른 commit의 source를 별도로 checkout하지 않습니다.
