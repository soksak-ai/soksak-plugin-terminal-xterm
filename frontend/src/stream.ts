export function terminalBytes(dataBase64: string): Uint8Array {
  const raw = atob(dataBase64);
  const bytes = new Uint8Array(raw.length);
  for (let index = 0; index < raw.length; index++) bytes[index] = raw.charCodeAt(index);
  return bytes;
}
