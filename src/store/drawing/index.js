import StateModule from "@src/store/module";

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
      ...this.initState(),
    });
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

  scale(ratio, mouseOffset) {
    const offset = {
      x: mouseOffset.x - mouseOffset.x * (1 / ratio),
      y: mouseOffset.y - mouseOffset.y * (1 / ratio),
    };
    this.moveOrigin(offset);
    this.setState({
      ...this.getState(),
      scale: ratio * this.getState().scale,
    });
  }

  setShapes(shapes) {
    this.setState({
      ...this.getState(),
      shapes: [...shapes],
    });
  }

  addRandomShape(minS, maxS, acc) {
    const shape = this.services.drawing.genSquare(minS, maxS, acc);
    this.setState({
      ...this.getState(),
      shapes: [...this.getState().shapes, {shape, local: false, id: Date.now()}],
    });
  }
}

export default DrawingState;
