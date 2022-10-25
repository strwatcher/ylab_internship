import StateModule from "@src/store/module";

class DrawingState extends StateModule {
  initState() {
    return {
      shapes: [],
      origin: { x: 0, y: 0 },
      scale: 1,
      selected: null,
      selectedProps: null,
      width: 0,
      height: 0,
    };
  }

  setSome(val) {
    this.setState({
      ...this.getState(),
      ...val,
    });
  }

  clear() {
    this.setState({
      ...this.initState(),
    });
  }

  setShapes(shapes) {
    this.setState({
      ...this.getState(),
      shapes: [...shapes],
    });
  }

  addRandomShape(minS, maxS, mx, my, w, h, acc, scale) {
    const shape = this.services.drawing.genSquare(
      minS,
      maxS,
      mx,
      my,
      w,
      h,
      acc,
      scale
    );
    this.setState({
      ...this.getState(),
      shapes: [...this.getState().shapes, shape],
    });
  }

  changeSelected(...attributes) {
    let res = this.getState().selected;
    for (const attr of attributes) {
      res = res.setAttr(attr.name, attr.value);
    }
    this.setState({
      ...this.getState(),
      selected: res,
    });
  }
}

export default DrawingState;
