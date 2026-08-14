export type TerminalInputTrace = {
  sequence: number;
  kind: string;
  data?: string | null;
  inputType?: string;
  isComposing?: boolean;
  key?: string;
  keyCode?: number;
  message?: string;
};

export type BrowserInputTrace = Omit<TerminalInputTrace, "sequence">;

export function attachTerminalInputTrace(
  target: HTMLTextAreaElement,
  publish: (event: BrowserInputTrace) => void,
): () => void {
  const listeners: Array<[string, EventListener]> = [];
  const listen = (type: string, listener: EventListener): void => {
    target.addEventListener(type, listener, true);
    listeners.push([type, listener]);
  };
  for (const kind of ["beforeinput", "input"] as const) {
    listen(kind, ((event: InputEvent) => {
      publish({
        kind,
        data: event.data,
        inputType: event.inputType,
        isComposing: event.isComposing,
      });
    }) as EventListener);
  }
  for (const kind of ["compositionstart", "compositionupdate", "compositionend"] as const) {
    listen(kind, ((event: CompositionEvent) => {
      publish({ kind, data: event.data });
    }) as EventListener);
  }
  listen("keydown", ((event: KeyboardEvent) => {
    publish({
      kind: "keydown",
      key: event.key,
      keyCode: event.keyCode,
      isComposing: event.isComposing,
    });
  }) as EventListener);
  return () => {
    for (const [type, listener] of listeners) target.removeEventListener(type, listener, true);
  };
}
