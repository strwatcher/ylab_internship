import React from "react";
import propTypes from "prop-types";

import s from "./style.module.scss";

LayoutPanel.propTypes = {
  children: propTypes.arrayOf(propTypes.node),
};

LayoutPanel.defaultProps = {};

function LayoutPanel({ children }) {
  return <div className={s.LayoutPanel}>{children}</div>;
}

export default React.memo(LayoutPanel);
