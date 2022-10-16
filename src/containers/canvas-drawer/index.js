import React from "react";
import propTypes from "prop-types";
import Canvas from "@src/components/drawing/canvas";
import { clear, draw } from "./drawing";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";

CanvasDrawer.propTypes = {};

CanvasDrawer.defaultProps = {};

function CanvasDrawer({ width, height }) {
  const store = useStore();
  const select = useSelector((state) => ({
    shapes: state.drawing.shapes,
    origin: state.drawing.origin,
    scale: state.drawing.scale,
  }));
  const [ctx, setCtx] = React.useState(null);
  const [isMoving, setIsMoving] = React.useState(false);
  const ref = React.useRef(null);
  const callbacks = {
    addShape: React.useCallback(() => {
      store
        .get("drawing")
        .addRandomShape(
          select.origin.x,
          select.origin.y,
          width + select.origin.x,
          height + select.origin.y,
          10,
          100,
          false
        );
    }),

    scroll: React.useCallback(
      (e) => {
        if (e.shiftKey) {
          console.log(e);
          const direction = Math.sign(e.deltaY);
          const ratio = direction === -1 ? 1.5 : 1 / 1.5;
          store.get("drawing").scale(ratio);
        } else {
          const direction = Math.sign(e.deltaY);
          const offset = direction * -50;
          store.get("drawing").moveOrigin({ x: 0, y: offset });
        }
      },
      [width, height]
    ),

    mouseDown: (e) => setIsMoving(true),

    mouseUp: (e) => setIsMoving(false),

    mouseMove: (e) => {
      if (isMoving) {
        store.get("drawing").moveOrigin({ x: -e.movementX, y: -e.movementY });
      }
    },
  };

  React.useEffect(() => {
    setCtx(ref.current.getContext("2d"));

    document.addEventListener("wheel", callbacks.scroll);

    return () => document.removeEventListener("wheel", callbacks.scroll);
  }, [callbacks.scroll]);

  React.useEffect(() => {
    if (ctx) {
      clear(ctx, width, height, "white");
      select.shapes.forEach((shape) => {
        if (
          // shape.x > select.origin.x - shape.size &&
          // shape.x < width + select.origin.x &&
          (shape.x - select.origin.x + shape.size) * select.scale >= 0 &&
          (shape.x - select.origin.x) * select.scale <= width &&
          (shape.y - select.origin.y + shape.size) * select.scale >= 0 &&
          (shape.y - select.origin.y) * select.scale <= height
        ) {
          draw(ctx, select.origin, select.scale, shape);
        }
      });
    }
  }, [select.shapes, select.origin, select.scale]);

  return (
    <>
      <Canvas
        ref={ref}
        width={width}
        height={height}
        mouseMove={callbacks.mouseMove}
        mouseDown={callbacks.mouseDown}
        mouseUp={callbacks.mouseUp}
      />
      <button onClick={callbacks.addShape}>new shape</button>
    </>
  );
}

export default React.memo(CanvasDrawer);
