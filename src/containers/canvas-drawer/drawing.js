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

export const draw = (ctx, obj) => {
  switch (obj.type) {
    case "rect":
      drawRect(ctx, obj.x, obj.y, obj.size, obj.fill)
      break;

    case "circle":
      drawCircle(ctx, obj.x, obj.y, obj.radius, obj.fill)
      break;
  }
}
