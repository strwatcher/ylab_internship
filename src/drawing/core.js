import { transform } from "lodash";
import { AnimationController } from "./animation";
import { isIntersected } from "./utils";

class Core {
  constructor() {}

  mount(dom, onChange) {
    this.dom = dom;
    this.onChange = onChange;

    this.canvas = document.createElement("canvas");
    this.width = 0;
    this.height = 0;

    window.addEventListener("resize", this.#resize);
    this.canvas.addEventListener("mousedown", this.#mouseDown);
    window.addEventListener("mouseup", this.#mouseUp);
    window.addEventListener("mousemove", this.#mouseMove);
    this.canvas.addEventListener("wheel", this.#wheel);

    this.dom.appendChild(this.canvas);

    this.context = this.canvas.getContext("2d");
    this.animation = new AnimationController(this.draw);

    this.shapes = [];

    this.action = {
      type: "rest",
    };

    this.shapesSyncInterval = setInterval(() => {
      this.syncShapes();
    }, 1000);

    this.selectedSyncInterval = setInterval(() => {
      this.syncSelected();
    }, 100);

    this.#resize();
  }

  unmount = () => {
    window.removeEventListener("resize", this.#resize);
    window.removeEventListener("mouseup", this.#mouseUp);
    window.removeEventListener("mousemove", this.#mouseMove);
    this.canvas.removeEventListener("mousedown", this.#mouseDown);
    this.canvas.removeEventListener("wheel", this.#wheel);
    this.canvas = null;
    this.context = null;
    this.shapes = [];

    this.animation.destructor();

    this.shapesSyncInterval && clearInterval(this.shapesSyncInterval);
  };

  syncShapes() {
    this.onChange({ shapes: this.shapes });
  }

  syncSelected() {
    if (this.selected) {
      const obj = this.shapes.find((shape) => shape.id === this.selected.id);
      this.onChange({ selected: obj });
    }
  }

  draw = (dt) => {
    this.clearDrawingArea();

    this.shapes = this.shapes.map((shape) => {
      shape.id === this.selected?.id
        ? (shape.stroke = "#FD673A")
        : (shape.stroke = "transparent");

      const transformed = shape.fall(
        dt,
        this.height - shape.height,
        this.origin.y - shape.height,
        this.scale
      );
      shape.draw(
        this.context,
        this.width,
        this.height,
        this.scale,
        this.origin
      );

      return transformed;
    });
  };

  changeShapes(shapes) {
    const global = shapes.filter(
      (shape) => !this.shapes.find((s) => s.id === shape.id)
    );
    this.shapes = shapes.length
      ? (this.shapes = [...this.shapes, ...global])
      : (this.shapes = []);
  }

  changeSelected(selected) {
    if (selected) {
      this.selected = selected;
      this.shapes = [
        ...this.shapes.filter((shape) => shape.id !== selected.id),
        this.selected,
      ];
    }
  }

  changeMetrics(scale, origin) {
    this.scale = scale;
    this.origin = origin;
  }

  clearDrawingArea(baseColor = "white") {
    this.context.fillStyle = baseColor;
    this.context.beginPath();
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.closePath();
  }

  #resize = () => {
    this.offset = { x: this.dom.offsetLeft, y: this.dom.offsetTop };
    this.width = this.dom.offsetWidth;
    this.height = this.dom.offsetHeight;

    this.onChange({ width: this.width, height: this.height });

    this.dpr = window.devicePixelRatio;
    // this.context.restore();
    console.log(this.dpr);
    this.context.scale(this.dpr, this.dpr);
    // this.context.save();
    this.canvas.width = this.width / this.dpr;
    this.canvas.height = this.height / this.dpr;
    this.canvas.style.width = `${this.width} px`;
    this.canvas.style.setProperty("height", this.height + "px");
  };

  #mouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const res = this.#select({
      x: e.clientX - e.target.offsetLeft,
      y: e.clientY - e.target.offsetTop,
    });

    if (!res) {
      this.action = {
        type: "scroll",
      };

      this.selected = null;
      this.onChange({ selected: null });
    } else {
      this.action = {
        type: "select",
        acc: this.selected.acc,
      };

      this.onChange({
        selected: this.selected.setAttr("acc", 0).setAttr("selected", true),
      });
    }
  };

  #mouseUp = () => {
    if (this.action.type === "grab" || this.action.type === "select") {
      this.onChange({
        selected: this.selected
          .setAttr("acc", this.action.acc)
          .setAttr("selected", false),
      });
    }
    this.action = {
      type: "rest",
    };
  };

  #mouseMove = (e) => {
    if (this.action.type === "scroll") {
      this.#moveOrigin({ x: -e.movementX, y: -e.movementY });
    } else if (this.action.type === "select") {
      this.action = {
        type: "grab",
        acc: this.action.acc,
      };
    } else if (this.action.type === "grab") {
      this.onChange({
        selected: this.selected
          .setAttr("x", (e.x - this.offset.x) / this.scale + this.origin.x)
          .setAttr("y", (e.y - this.offset.y) / this.scale + this.origin.y)
          .setAttr("selected", true),
      });
    }
  };

  #wheel = (e) => {
    const direction = Math.sign(e.deltaY);
    if (e.shiftKey) {
      const ratio = direction === -1 ? 1.5 : 1 / 1.5;
      this.#scale(ratio, {
        x: e.x - e.target.offsetLeft,
        y: e.y - e.target.offsetTop,
      });
    } else {
      const offset = direction * -50;
      this.#moveOrigin({ x: 0, y: offset });
    }
  };

  #scale = (ratio, mouseOffset) => {
    const offset = {
      x: mouseOffset.x - mouseOffset.x * (1 / ratio),
      y: mouseOffset.y - mouseOffset.y * (1 / ratio),
    };

    this.#moveOrigin(offset);
    this.onChange({
      scale: ratio * this.scale,
    });
  };

  #moveOrigin = (offset) => {
    const origin = {
      x: this.origin.x + offset.x / this.scale,
      y: this.origin.y + offset.y / this.scale,
    };

    this.onChange({ origin });
  };

  #select = ({ x, y }) => {
    for (const shape of [...this.shapes].reverse()) {
      if (
        isIntersected(
          {
            x: x / this.scale + this.origin.x,
            y: y / this.scale + this.origin.y,
            width: 0,
            height: 0,
          },
          { x: shape.x, y: shape.y, width: shape.width, height: shape.height }
        )
      ) {
        this.onChange({ selected: shape });
        this.selected = shape;
        return true;
      }
    }
  };
}

export default Core;
