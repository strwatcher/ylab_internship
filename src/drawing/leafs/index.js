import { BaseShape } from "../base";

export class Leaf extends BaseShape {
  constructor(id, x, y, width, height, speed, img) {
    super(id, x, y, width, height, "transparent", null, speed, 0);
    this.angle = 0;
    this.offsets = [
      { x: 5, y: 3 },
      { x: 2, y: 4 },
      { x: -3, y: 4 },
      { x: -5, y: 2 },
      { x: 7, y: 4 },
    ];
    this.curOffset = this.getRandomOffset();
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

  getRandomOffset() {
    return this.offsets[Math.floor(Math.random() * this.offsets.length)];
  }

  draw(context, vcWidth, vcHeight, origin, scale) {
    super.draw(context, vcWidth, vcHeight, origin, scale, (dimensions) => {
      context.save();
      const offset = {
        x: dimensions.x + dimensions.width / 2,
        y: dimensions.y + dimensions.height / 2,
      };
      context.translate(offset.x, offset.y);
      context.rotate((this.angle * 180) / Math.PI);
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
    this.angle += (dt / 100000) % 360;
    const changeDirection = Math.random() < this.stepsAfterChange * 0.00001;
    if (changeDirection) {
      this.stepsAfterChange = 0;
      this.curOffset = this.getRandomOffset();
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
