import { BaseShape } from "../base";

export class Leaf extends BaseShape {
  constructor(id, x, y, width, height, speed, img) {
    super(id, x, y, width, height, "transparent", null, speed, 0);
    this.angle = 0;
    this.rotationSpeed = 1;
    this.curOffset = this.getRandomOffset(-10, 10, 0, 10);
    this.stepsAfterChange = 0;
    this.img = img;
  }

  static fromBase(base) {
    return new Leaf(
      base.id,
      base.x,
      base.y,
      base.width,
      base.height,
      base.speed
    );
  }

  getRandomOffset(minX, maxX, minY, maxY) {
    const offset = {
      x: Math.floor(Math.random() * (maxX - minX)) + minX,
      y: Math.floor(Math.random() * (maxY - minY)) + minY,
    };
    return offset;
  }

  getRandomAngle(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  draw(context, vcWidth, vcHeight, origin, scale) {
    super.draw(context, vcWidth, vcHeight, origin, scale, (dimensions) => {
      context.save();
      const offset = {
        x: dimensions.x + dimensions.width / 2,
        y: dimensions.y + dimensions.height / 2,
      };
      context.translate(offset.x, offset.y);
      context.rotate((this.angle * Math.PI) / 180);
      context.translate(-offset.x, -offset.y);

      context.drawImage(
        this.img,
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
      context.restore();
    });
  }

  fall(dt) {
    this.angle += this.rotationSpeed % 360;
    const changeDirection = Math.random() < this.stepsAfterChange * 0.00001;
    if (changeDirection) {
      this.stepsAfterChange = 0;
      this.curOffset = this.getRandomOffset(-10, 10, 5, 10);
      this.rotationSpeed = this.getRandomAngle(-1.5, 1.5);
      console.log("changed");
    }
    this.stepsAfterChange += 1;
    this.x += this.curOffset.x / dt;
    this.y += this.curOffset.y / dt;
  }

  setAttr(name, attr) {
    const base = super.setAttr(name, attr);
    const leaf = Leaf.fromBase(base);
    leaf.angle = this.angle;
    leaf.img = this.img;

    return leaf;
  }
}
