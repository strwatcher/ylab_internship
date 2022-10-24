import StateModule from "@src/store/module";
import { shape } from "prop-types";

class DrawingState extends StateModule {
  initState() {
    return {
      shapes: [],
      origin: { x: 0, y: 0 },
      scale: 1,
      selected: null,
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
      shapes: [...this.getState().shapes, { shape, id: Date.now() }],
    });
  }

  setSelected(obj) {
    if (obj) {
      const shape = obj.shape;
      const id = obj.id;
      const props = {
        x: shape.x,
        y: shape.y,
        size: shape.width,
        color: shape.fill,
      };
      this.setState({
        ...this.getState(),
        selected: { shape, props, id },
      });
    } else {
      this.setState({
        ...this.getState(),
        selected: null,
      });
    }
  }

  setSelectedProps({ x, y, size, color }) {
    const shape = this.getState().selected.shape;
    const props = this.getState().selected.props;

    this.setState({
      ...this.getState(),
      selected: {
        ...this.getState().selected,
        shape,
        props: {
          x: parseInt(x) || props.x,
          y: parseInt(y) || props.y,
          size: parseInt(size) || props.size,
          color: color || props.color,
        },
      },
    });

    this.submitSelectedProps();
  }

  submitSelectedProps() {
    const selected = this.getState().selected;
    const props = selected.props;
    const shape = selected.shape
      .setPosition({ x: props.x, y: props.y })
      .setSize({ width: props.size, height: props.size })
      .setColor(props.color);

    this.setState({
      ...this.getState(),
      selected: {
        ...selected,
        shape,
      },
    });
  }
}

export default DrawingState;
