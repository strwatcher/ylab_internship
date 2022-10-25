import { BaseShape } from "./base";

export class Square extends BaseShape {
  constructor(id, x, y, size, fill, stroke, speed, acc) {
    super(id, x, y, size, size, fill, stroke, speed, acc);
  }

  static fromBase(base) {
    return new Square(
      base.id,
      base.x,
      base.y,
      base.width,
      base.fill,
      base.stroke,
      base.speed,
      base.acc
    );
  }

  draw(context, vcWidth, vcHeight, origin, scale) {
    super.draw(context, vcWidth, vcHeight, origin, scale, (dimensions) => {
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

  fall(dt, bottom) {
    const base = super.fall(dt, bottom);
    return Square.fromBase(base);
  }

  setAttr(name, attr) {
    const base = super.setAttr(name, attr);
    return Square.fromBase(base);
  }
}
