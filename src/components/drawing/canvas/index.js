import React, { useState } from "react";

import s from "./style.module.scss";

function Canvas({ width, height, mouseMove, mouseDown, mouseUp }, ref) {
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

export default React.memo(React.forwardRef(Canvas));
