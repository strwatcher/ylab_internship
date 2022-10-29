import { BaseShape } from "../base";
import { images } from "./assets";

export class Leaf extends BaseShape {
  constructor(id, x, y, width, height, stroke, speed) {
    super(id, x, y, width, height, "transparent", stroke, speed, 0);
  }

  static fromBase(base) {
    return new Leaf(
      base.id,
      base.x,
      base.y,
      base.width,
      base.height,
      base.stroke,
      base.speed
    );
  }

  draw(context, vcWidth, vcHeight, origin, scale) {
    super.draw(context, vcWidth, vcHeight, origin, scale, (dimensions) => {
      context.drawImage(
        images[0],
        dimensions.x,
        dimensions.y,
        dimensions.height,
        dimensions.width
      );

      context.beginPath();
      context.rect(
        dimensions.x,
        dimensions.y,
        dimensions.height + 2,
        dimensions.width + 2
      );
      context.closePath();
      context.stroke();
    });
  }

  setAttr(name, attr) {
    const base = super.setAttr(name, attr);
    return Leaf.fromBase(base);
  }
}
