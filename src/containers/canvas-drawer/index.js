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
  }));
  const [ctx, setCtx] = React.useState(null);
  const ref = React.useRef(null);
  console.log(select.origin);
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

    scroll: (e) => {
      const direction = Math.sign(e.deltaY);
      const offset = direction * -50;
      console.log(offset);
      store.get("drawing").moveOrigin({ x: 0, y: offset });
    },
  };

  React.useEffect(() => {
    setCtx(ref.current.getContext("2d"));

    document.addEventListener("wheel", callbacks.scroll);
  }, []);

  React.useEffect(() => {
    if (ctx) {
      clear(ctx, width, height, "white");
      select.shapes.forEach((shape) => {
        console.log(shape.y + select.origin.y + shape.size);
        console.log(height);
        if (
          // shape.x > select.origin.x - shape.size &&
          // shape.x < width + select.origin.x &&
          shape.y - select.origin.y + shape.size >= 0 &&
          shape.y - select.origin.y <= height
        ) {
          console.log(true);
          draw(ctx, select.origin, shape);
        } else {
          console.log(false);
        }
      });
    }
  }, [select.shapes, select.origin]);

  return (
    <>
      <Canvas ref={ref} width={width} height={height} />
      <button onClick={callbacks.addShape}>new shape</button>
    </>
  );
}

export default React.memo(CanvasDrawer);
