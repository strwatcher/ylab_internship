import React from "react";
import s from "./style.module.scss";

function Canvas({
  width,
  height,
  shapes,
  clear,
  origin,
  scale,
  mouseMove,
  mouseDown,
  mouseUp,
}) {
  const [ctx, setCtx] = React.useState(null);
  const ref = React.useRef(null);

  React.useEffect(() => {
    setCtx(ref.current.getContext("2d"));
  }, []);

  React.useEffect(() => {
    if (ctx) {
      clear(ctx);
      shapes.forEach((shape) => {
        shape.draw(ctx, width, height, origin, scale);
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
