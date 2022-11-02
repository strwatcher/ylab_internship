export function textWidth(text: string): number {
  const canvas = document.createElement("canvas");
  canvas.hidden = true;
  const context = canvas.getContext("2d");
  context.font = "15px sans-serif";
  const width = context.measureText(text).width;
  canvas.remove();
  return width;
}
