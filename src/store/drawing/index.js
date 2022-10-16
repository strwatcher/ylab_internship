import StateModule from "@src/store/module";
import { max } from "lodash";

class DrawingState extends StateModule {
  initState() {
    return {
      shapes: [],
      origin: { x: 0, y: 0 },
      scale: 1,
    };
  }

  clear() {
    this.setState({
      ...this.initState()
    })
  }

  transformShape(shape) {
    return {
      ...shape,
      x: (shape.x - this.getState().origin.x) * this.getState().scale,
      y: (shape.y - this.getState().origin.y) * this.getState().scale,
      size: shape.size * this.getState().scale,
    };
  }

  moveOrigin(offset) {
    this.setState({
      ...this.getState(),
      origin: {
        x: this.getState().origin.x + offset.x / this.getState().scale,
        y: this.getState().origin.y + offset.y / this.getState().scale,
      },
    });
  }

  scale(ratio, w, h) {
    if (ratio < 1) {
      const offset = {
        x: (-(w - w * ratio) / 2) * (1 / ratio),
        y: (-(h - h * ratio) / 2) * (1 / ratio),
      };
      this.moveOrigin(offset);
    } else if (ratio > 1) {
      const offset = {
        x: (w - w * (1 / ratio)) / 2,
        y: (h - h * (1 / ratio)) / 2,
      };
      this.moveOrigin(offset);
    }
    this.setState({
      ...this.getState(),
      scale: ratio * this.getState().scale,
    });
  }

  addRandomShape(maxX, maxY, minS, maxS, fill) {
    this.setState({
      ...this.getState(),
      shapes: [
        ...this.getState().shapes,
        this.generateShape(maxX, maxY, minS, maxS, fill),
      ],
    });
  }

  generateShape(maxX, maxY, minS, maxS, fill) {
    const types = ["rect", "circle"];
    const type = types[Math.floor(Math.random() * types.length)];

    const oX = this.getState().origin.x;
    const oY = this.getState().origin.y;
    const scale = this.getState().scale;
    const size =
      (Math.floor(Math.random() * (maxS - minS)) + minS) * (1 / scale);
    const x = Math.floor(Math.random() * (maxX * (1 / scale))) + oX;

    const y = Math.floor(Math.random() * (maxY * (1 / scale))) + oY;
    return {
      type,
      x,
      y,
      size: size,
      fill,
    };
  }
}

export default DrawingState;
