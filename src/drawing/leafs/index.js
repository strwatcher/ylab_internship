import { BaseShape } from "../base";
import { images } from "./assets";

export class Leaf extends BaseShape {
  constructor(id, x, y, width, height, stroke, speed) {
    super(id, x, y, width, height, "transparent", stroke, speed, 0);
    console.log(images);
  }

  static fromBase(base) {
    return new Leaf(
      base.id,
      base.x,
      base.y,
      base.width,
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
    });
  }
}
