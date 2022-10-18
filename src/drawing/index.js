import { Square } from "./square";

class DrawingService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = {
      ...config,
    };
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

  clearDrawingArea(context, width, height, baseColor="white") {
    context.fillStyle = baseColor;
    context.beginPath();
    context.fillRect(0, 0, width, height);
    context.closePath();
  }
}

export default DrawingService;
