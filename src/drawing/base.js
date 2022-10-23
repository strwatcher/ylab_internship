import { isIntersected } from "./utils";

export class BaseShape {
  constructor(
    x,
    y,
    width,
    height,
    fill = "black",
    stroke = null,
    speed = 0,
    acc = 0
  ) {
    this._x = x;
    this._y = y;
    this.rX = x + width;
    this.bY = y + height;

    this.width = width;
    this.height = height;
    this.fill = fill;
    this.stroke = stroke;
    this.speed = speed;
    this.acc = acc;
  }

  fromOld() {
    return new BaseShape(this.x, this.y, this.width, this.height, this.fill, this.stroke, this.speed, this.acc) 
  }

  set x(nX) {
    this._x = nX;
    this.rX = nX + this.width;
  }

  set y(nY) {
    this._y = nY;
    this.bY = nY + this.height;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
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
      if (this.y < bottom) {
        speed = this.speed + dt * this.acc;
        y = this.y + dt * this.speed;
      } else {
        speed = 0;
        y = bottom;
      }
    }
    return new BaseShape(
      this.x,
      y,
      this.width,
      this.height,
      this.fill,
      this.stroke,
      speed,
      this.acc
    );
  }

  setPosition({x, y}) {
    const shape = this.fromOld();
    shape.x = x;
    shape.y = y;
    return shape;
  }

  setSize({width, height}) {
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
}
