import { AnimationController } from "./animation";
import { Square } from "./square";
import { isIntersected } from "./utils";

class DrawingService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = {
      ...config,
    };
  }

  mount(dom) {
    this.dom = dom;
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
    this.grabbing = false;

    this.syncInterval = setInterval(() => {
      this.syncShapes();
    }, 1000);

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

    this.syncInterval && clearInterval(this.syncInterval);
  };

  syncShapes() {
    this.services.store.get("drawing").setShapes(this.shapes);
  }

  draw = (dt) => {
    this.clearDrawingArea();

    this.shapes = this.shapes.map((obj) => {
      obj.id === this.selected?.id
        ? (obj.shape.stroke = "orange")
        : (obj.shape.stroke = "white");

      const transformed = {
        ...obj,
        shape: obj.shape.fall(
          dt,
          this.height / this.scale + this.origin.y - obj.shape.height
        ),
      };

      transformed.shape.draw(
        this.context,
        this.width,
        this.height,
        this.origin,
        this.scale
      );

      return transformed;
    });
  };

  change(shapes, scale, origin, selected) {
    const selectedShape = selected ? [selected] : [];
    const selectedId = selected ? selected.id : 0;
    this.shapes = shapes.length
      ? (this.shapes = [
          ...this.shapes.filter((shape) => selectedId !== shape.id),
          ...shapes.filter(
            (shape) =>
              !this.shapes.find((s) => s.id === shape.id) &&
              shape.id !== selectedId
          ),
          ...selectedShape,
        ])
      : (this.shapes = shapes);

    this.scale = scale;
    this.origin = origin;
    this.selected = selected;
    // this.draw();
  }

  genSquare(minS, maxS, acc) {
    const colors = ["#ff0000", "#0000ff", "#000000", "#00ff00"];
    const size =
      (Math.floor(Math.random() * (maxS - minS)) + minS) * (1 / this.scale);
    const x =
      Math.floor(Math.random() * (this.width * (1 / this.scale))) +
      this.origin.x;

    const y =
      Math.floor(Math.random() * (this.height * (1 / this.scale))) +
      this.origin.y;

    const color = colors[Math.floor(Math.random() * colors.length)];
    return new Square(x, y, size, color, null, 0, acc);
  }

  clearDrawingArea(baseColor = "white") {
    this.context.fillStyle = baseColor;
    this.context.beginPath();
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.closePath();
  }

  #resize = () => {
    // const size = this.dom.getBoundingClientRect();

    this.width = this.dom.offsetWidth;
    this.height = this.dom.offsetHeight;

    const dpr = window.devicePixelRatio;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width} px`;
    this.canvas.style.height = `${this.height} px`;
  };

  #mouseDown = (e) => {
    const res = this.#select({
      x: e.clientX - e.target.offsetLeft,
      y: e.clientY - e.target.offsetTop,
    });
    if (!res) {
      this.grabbing = true;
      this.services.store.get("drawing").setSelected(null);
    }
  };
  #mouseUp = () => {
    this.grabbing = false;
  };
  #mouseMove = (e) => {
    if (this.grabbing) {
      this.services.store
        .get("drawing")
        .moveOrigin({ x: -e.movementX, y: -e.movementY });
    }
  };
  #wheel = (e) => {
    const direction = Math.sign(e.deltaY);
    if (e.shiftKey) {
      const ratio = direction === -1 ? 1.5 : 1 / 1.5;
      this.services.store
        .get("drawing")
        .scale(ratio * window.devicePixelRatio, {
          x: e.clientX - e.target.offsetLeft,
          y: e.clientY - e.target.offsetTop,
        });
    } else {
      const offset = direction * -50;
      this.services.store.get("drawing").moveOrigin({ x: 0, y: offset });
    }
  };

  #select = ({ x, y }) => {
    for (const obj of this.shapes.reverse()) {
      const shape = obj.shape;
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
        this.services.store.get("drawing").setSelected({ shape, id: obj.id });
        return true;
      }
    }
  };
}

export default DrawingService;
