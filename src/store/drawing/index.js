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

  scale(ratio, w, h, mouseOffset) {
    if (ratio < 1) {
      const offset = {
        x: -(mouseOffset.x - mouseOffset.x * ratio) * (1 / ratio),
        y: -(mouseOffset.y - mouseOffset.y * ratio) * (1 / ratio)
      };
      console.log(mouseOffset)
      console.log(offset);
      this.moveOrigin(offset);
    } else if (ratio > 1) {
      const offset = {
        x: mouseOffset.x - mouseOffset.x * (1/ ratio),
        y: mouseOffset.y - mouseOffset.y * (1 / ratio)
      };
      console.log(mouseOffset)
      console.log(offset);
      this.moveOrigin(offset);
    }
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

  addRandomShape(maxX, maxY, minS, maxS, acc) {
    const shape = this.services.drawing.genSquare(
      maxX,
      maxY,
      minS,
      maxS,
      acc,
      this.getState().origin.x,
      this.getState().origin.y,
      this.getState().scale
    );
    this.setState({
      ...this.getState(),
      shapes: [...this.getState().shapes, shape],
    });
  }
}

export default DrawingState;
