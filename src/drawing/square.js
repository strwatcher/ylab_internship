import { BaseShape } from "./base";

export class Square extends BaseShape {
  constructor(id, x, y, size, fill, stroke, speed, acc) {
    super(id, x, y, size, size, fill, stroke, speed, acc);
  }

  fromOld() {
    return new Square(
      this.id,
      this.x,
      this.y,
      this.width,
      this.fill,
      this.stroke,
      this.speed,
      this.acc
    );
  }

  draw(context, vcWidth, vcHeight, scale, origin) {
    const dimensions = super.normalize(scale, origin);
    super.draw(context, vcWidth, vcHeight, dimensions, (dimensions) => {
      context.beginPath();
      context.rect(
        dimensions.x,
        dimensions.y,
        dimensions.width,
        dimensions.height
      );
      context.closePath();
      if (this.fill) {
        context.fill();
      }
      if (this.stroke) {
        context.stroke();
      }
    });
  }
}
