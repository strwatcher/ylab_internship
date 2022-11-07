import StateModule from "@src/store/module";
import { DrawingState } from "./types";

class DrawingModule extends StateModule<DrawingState> {
  initState(): DrawingState {
    return {
      shapes: [],
      origin: { x: 0, y: 0 },
      scale: 1,
      selected: null,
      width: 0,
      height: 0,
    };
  }

  setSome(props: DrawingState) {
    this.setState({
      ...this.getState(),
      ...props,
    });
  }

  clear() {
    this.setState({
      ...this.getState(),
      shapes: [],
      origin: { x: 0, y: 0 },
      scale: 1,
      selected: null,
    });
  }

  addRandomSquare(
    minS: number,
    maxS: number,
    mx: number,
    my: number,
    w: number,
    h: number,
    acc: number,
    scale: number
  ) {
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

  addLeafs(
    minS: number,
    maxS: number,
    mx: number,
    my: number,
    w: number,
    h: number,
    scale: number,
    count: number
  ) {
    let leafs = [];
    for (let i = 0; i < count; i += 1) {
      const leaf = this.services.drawing.genLeaf(
        minS,
        maxS,
        mx,
        my,
        w,
        h,
        scale
      );
      leafs.push(leaf);
    }

    this.setState({
      ...this.getState(),
      shapes: [...this.getState().shapes, ...leafs],
    });
  }

  changeSelected(...attributes: Attr[]) {
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

export default DrawingModule;
