// 뷰-단위 폰트 줌(코어 PLUGIN-CONTRACT §Zoom) — ⌘±가 이 뷰에 포커스일 때의 응답.
// 델타는 뷰 수명(메모리) 동안만 유지 — 설정(fontSize)은 기준값, 델타는 관찰 확대다.
// 줌 불변식: 여기서 바꾸는 건 터미널 글리프뿐, 행 그리드(헤더·툴바)는 불가침.
const deltas = new Map<string, number>();

// 기준 13 기준 안전범위(6..40)를 벗어나지 않는 델타 클램프.
const MIN_DELTA = -7;
const MAX_DELTA = 27;

export function viewFontDelta(viewId: string): number {
  return deltas.get(viewId) ?? 0;
}

export function stepViewFont(viewId: string, action: "in" | "out" | "reset"): number {
  const next =
    action === "reset" ? 0 : viewFontDelta(viewId) + (action === "in" ? 1 : -1);
  const clamped = Math.max(MIN_DELTA, Math.min(MAX_DELTA, next));
  deltas.set(viewId, clamped);
  return clamped;
}

export function dropViewFont(viewId: string): void {
  deltas.delete(viewId);
}
