import { AnimationController } from "./animation";
import { Square } from "./square";

class DrawingService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = {
      ...config,
    };
    this.grabbing = false;
    this.shapes = [];
  }

  #mouseDown = () => (this.grabbing = true);
  #mouseUp = () => (this.grabbing = false);
  #mouseMove = (e) => {
    if (this.grabbing) {
      this.services.store
        .get("drawing")
        .moveOrigin({ x: -e.movementX, y: -e.movementY });
    }
  };
  #mouseLeave = (e) => {
    this.grabbing = false;
  };
  #wheel = (e) => {
    const direction = Math.sign(e.deltaY);
    if (e.shiftKey) {
      const ratio = direction === -1 ? 1.5 : 1 / 1.5;
      this.services.store.get("drawing").scale(ratio, {
        x: e.clientX - e.target.offsetLeft,
        y: e.clientY - e.target.offsetTop,
      });
    } else {
      const offset = direction * -50;
      this.services.store.get("drawing").moveOrigin({ x: 0, y: offset });
    }
  };

  #animate = (dt) => {
    const transformedShapes = this.shapes.map((shape) => ({
      ...shape,
      shape: shape.shape.fall(
        dt,
        this.vcHeight / this.scale + this.origin.y - shape.shape.height
      ),
    }));
    this.shapes = transformedShapes;
    this.draw();
  };

  init(canvas) {
    this.canvas = canvas;

    this.canvas.addEventListener("mousedown", this.#mouseDown);
    this.canvas.addEventListener("mouseup", this.#mouseUp);
    this.canvas.addEventListener("mousemove", this.#mouseMove);
    this.canvas.addEventListener("mouseleave", this.#mouseLeave);
    this.canvas.addEventListener("wheel", this.#wheel);

    this.context = canvas.getContext("2d");
    this.animation = new AnimationController(this.#animate);

    setInterval(() => {
      this.syncShapes();
    }, 1000);
  }

  syncShapes() {
    this.services.store.get("drawing").setShapes(this.shapes);
  }

  draw() {
    this.clearDrawingArea();
    this.shapes.forEach((shape) => {
      shape.shape.draw(
        this.context,
        this.vcWidth,
        this.vcHeight,
        this.origin,
        this.scale
      );
    });
  }

  change(shapes, scale, origin, vcWidth, vcHeight) {
    this.vcWidth = vcWidth;
    this.vcHeight = vcHeight;
    this.shapes = [
      ...this.shapes.filter((shape) => shapes.find((s) => s.id === shape.id)),
      ...shapes.filter((shape) => !this.shapes.find((s) => s.id === shape.id)),
    ];
    this.scale = scale;
    this.origin = origin;
    this.draw();
  }

  genSquare(minS, maxS, acc) {
    const colors = ["red", "blue", "black", "green"];
    const size =
      (Math.floor(Math.random() * (maxS - minS)) + minS) * (1 / this.scale);
    const x =
      Math.floor(Math.random() * (this.vcWidth * (1 / this.scale))) +
      this.origin.x;

    const y =
      Math.floor(Math.random() * (this.vcHeight * (1 / this.scale))) +
      this.origin.y;

    const color = colors[Math.floor(Math.random() * colors.length)];
    return new Square(x, y, size, color, null, 0, acc);
  }

  clearDrawingArea(baseColor = "white") {
    this.context.fillStyle = baseColor;
    this.context.beginPath();
    this.context.fillRect(0, 0, this.vcWidth, this.vcHeight);
    this.context.closePath();
  }
}

export default DrawingService;
