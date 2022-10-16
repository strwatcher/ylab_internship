import StateModule from "@src/store/module";

class DrawingState extends StateModule {
  initState() {
    return {
      shapes: [],
      origin: { x: 0, y: 0 },
      scale: 1,
    };
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
        x: this.getState().origin.x + offset.x,
        y: this.getState().origin.y + offset.y,
      },
    });
  }

  scale(ratio) {
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
    const size = Math.floor(Math.random() * (maxS - minS)) + minS;
    const x =
      (Math.floor(Math.random() * (maxX + this.getState().origin.x - size)) +
        this.getState().origin.x +
        size) *
      (1 / this.getState().scale);
    const y =
      (Math.floor(Math.random() * (maxY + this.getState().origin.y - size)) +
        this.getState().origin.y +
        size) *
      (1 / this.getState().scale);

    return {
      type,
      x,
      y,
      size: size * (1 / this.getState().scale),
      fill,
    };
  }
}

export default DrawingState;
