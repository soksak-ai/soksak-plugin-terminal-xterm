// import.meta.env.DEV — esbuild 번들이 build.mjs 의 define 으로 정적 치환한다(릴리즈에서
// imeTrace 경로 제거). tsc 에는 그 ambient 타입이 없어 여기서 최소 선언만 한다 — 값은
// esbuild 가 주입하고, 이 선언은 타입체크만 통과시킨다.
interface ImportMetaEnv {
  readonly DEV: boolean;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
