import { Square } from "./square";
import { v4 as uuid } from "uuid";
import { Leaf } from "./leafs";
import { getRand } from "./leafs/assets";

class DrawingService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = {
      ...config,
    };
  }

  genSquare(minS, maxS, mx, my, w, h, acc, scale) {
    const size =
      (Math.floor(Math.random() * (maxS - minS)) + minS) * (1 / scale);
    const x = Math.floor(Math.random() * (w * (1 / scale))) + mx;

    const y = Math.floor(Math.random() * (h * (1 / scale))) + my;

    const color =
      this.config.colors[Math.floor(Math.random() * this.config.colors.length)];
    const id = uuid();
    return new Square(id, x, y, size, color, null, 0, acc);
  }

  genLeaf(minS, maxS, mx, my, w, h, scale) {
    const size =
      (Math.floor(Math.random() * (maxS - minS)) + minS) * (1 / scale);
    const x = Math.floor(Math.random() * (w * (1 / scale))) + mx;

    const y = Math.floor(Math.random() * (h * (1 / scale))) + my;

    const id = uuid();
    const imageUrl = getRand();

    const leaf = new Leaf(id, x, y, size, 0, imageUrl);
    return leaf;
  }
}

export default DrawingService;
