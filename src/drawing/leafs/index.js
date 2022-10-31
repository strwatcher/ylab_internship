import { BaseShape } from "../base";

export class Leaf extends BaseShape {
  constructor(id, x, y, width, height, speed, img) {
    super(id, x, y, width, height, null, null, speed, 0);
    this.angle = 0;
    this.rotationSpeed = 1;
    this.curOffset = this.getRandomOffset(-10, 10, 10, 10);
    this.stepsAfterChange = 0;
    this.img = img;
    this.boundX = this.x;
    this.boundY = this.y;
    this.boundWidth = this.width;
    this.boundHeight = this.height;
  }

  fromOld() {
    const leaf = new Leaf(
      this.id,
      this.x,
      this.y,
      this.width,
      this.height,
      this.speed,
      this.img
    );
    leaf.angle = this.angle;
    return leaf;
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

  normalize(scale, origin) {
    return {
      ...super.normalize(scale, origin),
      boundX: (this.boundX - origin.x) * scale,
      boundY: (this.boundY - origin.y) * scale,
      boundWidth: this.boundWidth * scale,
      boundHeight: this.boundHeight * scale,
    };
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

      context.restore();
      context.beginPath();
      context.rect(
        dimensions.boundX,
        dimensions.boundY,
        dimensions.boundWidth,
        dimensions.boundHeight
      );
      context.closePath();
      context.stroke();
    });
  }

  fall(dt, bottom, top, scale) {
    console.log(this.selected);
    if (this.selected) {
      return this;
    }
    const angle = this.angle + (this.rotationSpeed % 360);
    let stepsAfterChange = this.stepsAfterChange;
    let curOffset = this.curOffset;
    let rotationSpeed = this.rotationSpeed;

    const changeDirection = Math.random() < this.stepsAfterChange * 0.00001;
    if (changeDirection) {
      stepsAfterChange = 0;
      curOffset = this.getRandomOffset(-10, 10, 5, 10);
      rotationSpeed = this.getRandomAngle(-1.5, 1.5);
    }
    stepsAfterChange += 1;
    const x = this.x + curOffset.x / dt / scale;
    let y = this.y + curOffset.y / dt / scale;

    if (y > bottom + this.height) {
      y = top - this.height;
    }

    const leaf = this.fromOld();
    leaf.angle = angle;
    leaf.stepsAfterChange = stepsAfterChange;
    leaf.curOffset = curOffset;
    leaf.rotationSpeed = rotationSpeed;
    leaf.x = x;
    leaf.y = y;

    leaf.boundX = x;
    leaf.boundY = y;
    return leaf;
  }
}
