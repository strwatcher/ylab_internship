import { Square } from "./square";

class DrawingService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = {
      ...config,
    };
  }

  init(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;

    this.context = canvas.getContext("2d");
  }

  genSquare(maxX, maxY, minS, maxS, acc, oX, oY, scale) {
    const colors = ["red", "blue", "black", "green"];
    const size =
      (Math.floor(Math.random() * (maxS - minS)) + minS) * (1 / scale);
    const x = Math.floor(Math.random() * (maxX * (1 / scale))) + oX;

    const y = Math.floor(Math.random() * (maxY * (1 / scale))) + oY;

    const color = colors[Math.floor(Math.random() * colors.length)];
    return new Square(x, y, size, color, null, 0, acc);
  }

  clearDrawingArea(context, width, height, baseColor = "white") {
    context.fillStyle = baseColor;
    context.beginPath();
    context.fillRect(0, 0, width, height);
    context.closePath();
  }

  // clearDrawingArea(baseColor = "white") {
  //   this.context.fillStyle = baseColor;
  //   this.context.beginPath();
  //   this.context.fillRect(0, 0, this.width, this.height);
  //   this.context.closePath();
  // }
}

export default DrawingService;
