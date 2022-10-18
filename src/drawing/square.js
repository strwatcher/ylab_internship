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
  
  normalize(origin, scale) {
    const base = super.normalize(origin, scale);
    return Square.fromBase(base);
  }

  draw(context, width, height) {
    super.draw(context, width, height, () => {
      context.beginPath();
      context.rect(this.x, this.y, this.width, this.height);
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
}
