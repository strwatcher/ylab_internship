import React, { useState } from "react";

import s from "./style.module.scss";

function Canvas({width, height}, ref) {
  return (
    <canvas ref={ref} className={s.canvas} width={width} height={height} />
  );
}

export default React.memo(React.forwardRef(Canvas));
