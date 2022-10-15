import React from "react";
import propTypes from "prop-types";

import s from "./style.module.scss";

Resized.propTypes = {
  render: propTypes.func,
  theme: propTypes.shape({
    height: propTypes.string,
    width: propTypes.string,
  }),
};

Resized.defaultProps = {
  theme: {
    height: "85vh",
    width: "100%",
  },
};

function Resized({ render, theme }) {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const wrapperRef = React.useRef(null);

  const callbacks = {
    resize: () => {
      setWidth(wrapperRef.current.clientWidth);
      setHeight(wrapperRef.current.clientHeight);
    },
  };

  React.useEffect(() => {
    window.addEventListener("resize", callbacks.resize);

    return () => window.removeEventListener("resize", callbacks.resize);
  }, []);

  React.useEffect(() => {
    wrapperRef.current.style.setProperty("--height", theme.height);
    wrapperRef.current.style.setProperty("--width", theme.width);
    callbacks.resize();
  }, [theme]);

  return (
    <div className={s.Resized} ref={wrapperRef}>
      {render(width, height)}
    </div>
  );
}

export default React.memo(Resized);
