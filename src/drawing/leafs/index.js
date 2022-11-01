import { BaseShape } from "../base";
import { random } from "@src/utils/random";

export class Leaf extends BaseShape {
  constructor(id, x, y, size, speed, imgUrl) {
    super(id, x, y, size, size, null, null, speed, 0);
    this.angle = 0;
    this.rotationSpeed = 1;
    this.curOffset = { x: random(-10, 10), y: random(5, 10) };
    this.stepsAfterChange = 0;

    if (imgUrl !== "") {
      this.image = new Image();
      this.imageLoaded = false;
      this.image.onload = () => {
        const ratio = this.image.width / this.image.height;
        this.width = size;
        this.height = size * ratio;
        this.imageLoaded = true;
      };
      this.image.src = imgUrl;
    } else {
      this.imageLoaded = true;
    }

    this.timeSpent = 0;
  }

  fromOld() {
    const leaf = new Leaf(this.id, this.x, this.y, this.size, this.speed, "");
    leaf.angle = this.angle;
    leaf.image = this.image;
    leaf.width = this.width;
    leaf.height = this.height;
    return leaf;
  }

  draw(context, vcWidth, vcHeight, scale, origin) {
    if (!this.imageLoaded) return;
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
        this.image,
        dimensions.x,
        dimensions.y,
        dimensions.height,
        dimensions.width
      );

      context.restore();
      context.beginPath();
      context.rect(
        dimensions.x,
        dimensions.y,
        dimensions.width,
        dimensions.height
      );
      context.closePath();
      context.stroke();
    });
  }

  fall(dt, bottom, top, scale) {
    if (this.selected) {
      return this;
    }
    const angle = (this.angle + this.rotationSpeed) % 360;
    let stepsAfterChange = this.stepsAfterChange;
    let curOffset = this.curOffset;
    let rotationSpeed = this.rotationSpeed;

    const changeDirection = Math.random() < this.stepsAfterChange * 0.001;
    if (changeDirection) {
      stepsAfterChange = 0;
      curOffset = { x: random(-10, 10), y: random(5, 10) };
      rotationSpeed = random(-1.5, 1.5);
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
    leaf.timeSpent = dt + this.timeSpent;
    return leaf;
  }
}
