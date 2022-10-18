import React, { useState } from "react";
import {draw, clear} from "./drawing"
import s from "./style.module.scss";

function Canvas({ width, height, shapes, mouseMove, mouseDown, mouseUp }) {
  const [ctx, setCtx] = React.useState(null);
  const ref = React.useRef(null);

  React.useEffect(() => {
    setCtx(ref.current.getContext("2d"));
  }, []);

  React.useEffect(() => {
    if (ctx) {
      clear(ctx, width, height, "white");
      shapes.forEach((shape) => {
        if (
          shape.x + shape.size >= 0 &&
          shape.x <= width &&
          shape.y + shape.size >= 0 &&
          shape.y <= height
        ) {
          draw(ctx, shape);
        }
      });
    }
  }, [shapes]);

  return (
    <canvas
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
      onMouseLeave={mouseUp}
      ref={ref}
      className={s.canvas}
      width={width}
      height={height}
    />
  );
}

export default React.memo(Canvas);
