import useServices from "@src/hooks/use-services";
import React from "react";
import s from "./style.module.scss";

function Drawing({
  shapes,
  origin,
  scale,
  selected
}) {
  const services = useServices();
  const dom = React.useRef(null);
  React.useEffect(() => {
    services.drawing.mount(dom.current);
    return () => services.drawing.unmount();
  }, []);

  React.useEffect(() =>  {
    services.drawing.change(shapes, scale, origin, selected)
  }, [shapes, scale, origin, selected])

  return (
    <div
      ref={dom}
      className={s.canvas}
    />
  );
}

export default React.memo(Drawing);
