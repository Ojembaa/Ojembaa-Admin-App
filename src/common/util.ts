export function toTitleCase(text: string | undefined): string {
  if (!text || text === null || text === "") {
    return "";
  }
  return text.replace(/^./, text[0].toUpperCase());
}
