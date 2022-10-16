const drawRect = (ctx, x, y, size, fill) => {
  ctx.beginPath();
  ctx.rect(x, y, size, size);
  fill ? ctx.fill() : ctx.stroke();
};

const drawCircle = (ctx, x, y, radius, fill) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  fill ? ctx.fill() : ctx.stroke();
};

export const clear = (ctx, width, height, baseColor) => {
  const oldFillStyle = ctx.fillStyle;
  ctx.fillStyle = baseColor;
  ctx.beginPath();
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = oldFillStyle;
}

export const draw = (ctx, origin, scale, obj, theme = {}) => {
  const oldStrokeStyle = ctx.strokeStyle;
  const oldFillStyle = ctx.fillStyle;
  if (theme.strokeStyle) {
    ctx.strokeStyle = theme.stroke;
  }
  if (theme.fillStyle) {
    ctx.fillStyle = theme.fill;
  }

  switch (obj.type) {
    case "rect":
      drawRect(ctx, (obj.x - origin.x) * scale, (obj.y - origin.y) * scale, (obj.size) * scale, obj.fill);
      break;

    case "circle":
      drawCircle(ctx, obj.x - origin.x, obj.y - origin.y, obj.radius, obj.fill);
      break;
  }

  ctx.strokeStyle = oldStrokeStyle;
  ctx.fillStyle = oldFillStyle;
};
