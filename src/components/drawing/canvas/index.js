import propTypes from "prop-types";
import React from "react";

import s from "./style.module.scss";

Canvas.propTypes = {
  width: propTypes.number,
  height: propTypes.number
};

function Canvas({ width, height }) {
  return <canvas className={s.canvas}></canvas>;
}

export default React.memo(Canvas);
