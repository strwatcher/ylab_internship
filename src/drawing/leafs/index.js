import { BaseShape } from "../base";

export class Leaf extends BaseShape {
  constructor(id, x, y, width, height, speed, img) {
    super(id, x, y, width, height, null, null, speed, 0);
    this.angle = 0;
    this.rotationSpeed = 1;
    this.curOffset = this.getRandomOffset(-10, 10, 10, 10);
    this.stepsAfterChange = 0;
    this.img = img;
  }

  fromOld() {
    return new Leaf(
      this.id,
      this.x,
      this.y,
      this.width,
      this.height,
      this.speed,
      this.img
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

  draw(context, vcWidth, vcHeight, scale, origin) {
    const dimensions = this.normalize(scale, origin);
    super.draw(context, vcWidth, vcHeight, dimensions, (dimensions) => {
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

  fall(dt, bottom, scale) {
    const angle = this.angle + (this.rotationSpeed % 360);
    let stepsAfterChange = this.stepsAfterChange;
    let curOffset = this.curOffset;
    let rotationSpeed = this.rotationSpeed;

    const changeDirection = Math.random() < this.stepsAfterChange * 0.00001;
    if (changeDirection) {
      stepsAfterChange = 0;
      curOffset = this.getRandomOffset(-10, 10, 5, 10);
      rotationSpeed = this.getRandomAngle(-1.5, 1.5);
      console.log("changed");
    }
    stepsAfterChange += 1;
    const x = this.x + curOffset.x / dt / scale;
    const y = this.y + curOffset.y / dt / scale;

    const leaf = this.fromOld();
    leaf.angle = angle;
    leaf.stepsAfterChange = stepsAfterChange;
    leaf.curOffset = curOffset;
    leaf.rotationSpeed = rotationSpeed;
    leaf.x = x;
    leaf.y = y;
    return leaf;
  }
}
