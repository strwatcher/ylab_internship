import { BaseShape } from "../base";
import { random } from "@src/utils/random";
import { easeCoefficient } from "@src/utils/ease";

export class Leaf extends BaseShape {
  constructor(id, x, y, size, speed, imgUrl) {
    super(id, x, y, size, size, null, null, speed, 0);
    this.angle = 0;

    this.animation = {
      rotation: random(-1.5, 1.5),
      offset: {
        x: random(-10, 10),
        y: random(5, 7),
      },
      translationDuration: random(3, 7),
      translationTime: 0,
      rotationDuration: random(3, 7),
      rotationTime: 0,
    };
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
    if (this.selected || !this.imageLoaded) {
      return this;
    }

    let offset = this.animation.offset;
    let rotation = this.animation.rotation;
    let translationDuration = this.animation.translationDuration;
    let translationTime = this.animation.translationTime;
    let rotationDuration = this.animation.rotationDuration;
    let rotationTime = this.animation.rotationTime;

    const ease = easeCoefficient(translationTime / translationDuration);

    const changeDirection = translationTime >= translationDuration;
    if (changeDirection) {
      offset = { x: random(-10, 10), y: random(5, 7) };
      translationDuration = random(3, 7);
      translationTime = 0;
    }

    const changeRotation = rotationTime >= rotationDuration;
    if (changeRotation) {
      rotation = random(-1.5, 1.5);
      rotationDuration = random(3, 7);
      rotationTime = 0;
    }

    const x = this.x + (offset.x / dt / scale) * ease;
    let y = this.y + offset.y / dt / scale;

    const angle = (this.angle + rotation * ease) % 360;

    if (y > bottom + this.height) {
      y = top - this.height;
    }

    const leaf = this.fromOld();
    leaf.angle = angle;
    leaf.animation = {
      offset,
      rotation,
      translationTime: translationTime + dt / 1000,
      translationDuration,
      rotationTime: rotationTime + dt / 1000,
      rotationDuration,
    };
    leaf.x = x;
    leaf.y = y;
    return leaf;
  }
}
