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
    this.selected = false;
  }

  get id() {
    return this._id;
  }

  draw(context, vcWidth, vcHeight, dimensions, drawCallback) {
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

  normalize(scale, origin) {
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
    let y = this.y + dt * this.speed;
    if (y < bottom) {
      speed = this.speed + dt * this.acc;
    } else {
      speed = 0;
      y = bottom;
    }

    const shape = this.fromOld();
    shape.y = y;
    shape.speed = speed;
    return shape;
  }

  setAttr(name, attr) {
    const shape = this.fromOld();
    shape[name] = attr;
    return shape;
  }
}
