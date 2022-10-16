import React from "react";
import propTypes from "prop-types";
import Canvas from "@src/components/drawing/canvas";
import { draw } from "./drawing";

CanvasDrawer.propTypes = {};

CanvasDrawer.defaultProps = {};

function CanvasDrawer({ width, height }) {
  const [ctx, setCtx] = React.useState(null);
  const [shapes, setShapes] = React.useState([]);

  const callbacks = {
    genCoords: () => {
      const x = Math.floor(Math.random() * width)
      const y = Math.floor(Math.random() * height)
      return [x, y]
    },
    newShape: () => {
      const [x, y] = callbacks.genCoords();
      const shape = {
        type: "rect",
        x, y,
        size: Math.floor(Math.random() * 100) + 10,
        fill: true
      }
      setShapes([...shapes, shape])
    }
  }
  const ref = React.useRef(null);
  React.useEffect(() => {
    setCtx(ref.current.getContext("2d"));
  }, []);

  React.useEffect(() => {
    console.log(shapes)
    if (ctx) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "black";
      shapes.map(shape => draw(ctx, shape))
    }
  }, [shapes]);

  return (
    <>
      <Canvas ref={ref} width={width} height={height} />
      <button onClick={callbacks.newShape}>new shape</button>
    </>
  );
}

export default React.memo(CanvasDrawer);
