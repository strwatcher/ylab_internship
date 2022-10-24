import { isIntersected } from "./utils";

export class BaseShape {
  constructor(
    id,
    x,
    y,
    width,
    height,
    fill = "black",
    stroke = null,
    speed = 0,
    acc = 0
  ) {
    this.x = x;
    this.y = y;
    this._id = id;

    this.width = width;
    this.height = height;
    this.fill = fill;
    this.stroke = stroke;
    this.speed = speed;
    this.acc = acc;
  }

  fromOld() {
    return new BaseShape(
      this._id,
      this.x,
      this.y,
      this.width,
      this.height,
      this.fill,
      this.stroke,
      this.speed,
      this.acc
    );
  }

  get id() {
    return this._id;
  }

  draw(context, vcWidth, vcHeight, origin, scale, drawCallback) {
    const dimensions = this.normalize(origin, scale);
    if (
      !isIntersected(
        { ...dimensions },
        { x: 0, y: 0, width: vcWidth, height: vcHeight }
      )
    ) {
      return;
    }

    if (this.fill) {
      context.fillStyle = this.fill;
    }
    if (this.stroke) {
      context.strokeStyle = this.stroke;
    }
    drawCallback(dimensions);
  }

  normalize(origin, scale) {
    const width = this.width * scale;
    const height = this.height * scale;
    const x = (this.x - origin.x) * scale;
    const y = (this.y - origin.y) * scale;

    return {
      x,
      y,
      width,
      height,
    };
  }

  fall(dt, bottom) {
    let speed = this.speed;
    let y = this.y;
    if (this.acc > 0) {
      y = this.y + dt * this.speed;
      if (y < bottom) {
        speed = this.speed + dt * this.acc;
      } else {
        speed = 0;
        y = bottom;
      }
    }
    const base = this.fromOld();
    base.y = y;
    base.speed = speed;
    return base;
  }

  setPosition({ x, y }) {
    const shape = this.fromOld();
    shape.x = x;
    shape.y = y;
    return shape;
  }

  setSize({ width, height }) {
    const shape = this.fromOld();
    shape.width = width;
    shape.height = height;
    return shape;
  }

  setColor(color) {
    const shape = this.fromOld();
    shape.fill = color;
    return shape;
  }

  setAcc(acc) {
    const shape = this.fromOld();
    shape.acc = acc;
    return shape;
  }
}
