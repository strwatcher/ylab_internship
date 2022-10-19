import useServices from "@src/hooks/use-services";
import React from "react";
import s from "./style.module.scss";

function Canvas({
  width,
  height,
  shapes,
  origin,
  scale,
}) {
  const services = useServices();
  const ref = React.useRef(null);
  React.useEffect(() => {
    services.drawing.init(ref.current, origin, scale, shapes)
  }, []);

  React.useEffect(() =>  {
    services.drawing.change(shapes, scale, origin, width, height)
  }, [shapes, scale, origin, width, height])

  return (
    <canvas
      ref={ref}
      className={s.canvas}
      width={width}
      height={height}
    />
  );
}

export default React.memo(Canvas);
