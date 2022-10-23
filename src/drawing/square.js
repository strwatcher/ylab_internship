import { BaseShape } from "./base";

export class Square extends BaseShape {
  constructor(x, y, size, fill, stroke, speed, acc) {
    super(x, y, size, size, fill, stroke, speed, acc);
  }

  static fromBase(base) {
    return new Square(
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

  setSize({width, height}) {
    const base = super.setSize({ width, height });
    return Square.fromBase(base);
  }
  setColor(color) {
    const base = super.setColor(color);
    return Square.fromBase(base);
  }
  setPosition({ x, y }) {
    const base = super.setPosition({ x, y });
    return Square.fromBase(base);
  }
}
