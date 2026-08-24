if (typeof HTMLCanvasElement !== "undefined") {
  HTMLCanvasElement.prototype.getContext = () => null;
}
if (typeof document !== "undefined") {
  for (const [name, value] of Object.entries({
    fg: "#eeeeec", card: "#1e1e1e", acc: "#ffffff", fg3: "#555753",
  })) document.documentElement.style.setProperty(`--${name}`, value);
}
