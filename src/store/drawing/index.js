import StateModule from "@src/store/module";

class DrawingState extends StateModule {
  initState() {
    return {
      shapes: [],
      origin: { x: 0, y: 0 },
      scale: 1,
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

  addRandomShape(minX, minY, maxX, maxY, minS, maxS, fill) {
    this.setState({
      ...this.getState(),
      shapes: [
        ...this.getState().shapes,
        this.generateShape(minX, minY, maxX, maxY, minS, maxS, fill),
      ],
    });
  }

  generateShape(minX, minY, maxX, maxY, minS, maxS, fill) {
    const type = "rect";
    const x = Math.floor(Math.random() * (maxX - minX)) + minX;
    const y = Math.floor(Math.random() * (maxY - minY)) + minY;
    const size = Math.floor(Math.random() * (maxS - minS)) + minS;

    return {
      type,
      x,
      y,
      size,
      fill,
    };
  }
}

export default DrawingState;
