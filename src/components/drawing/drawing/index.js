import useServices from "@src/hooks/use-services";
import React from "react";
import s from "./style.module.scss";

function Drawing({
  shapes,
  origin,
  scale,
  selected,
  selectedProps
}) {
  const services = useServices();
  const dom = React.useRef(null);
  React.useEffect(() => {
    services.drawing.mount(dom.current);
    return () => services.drawing.unmount();
  }, []);

  React.useEffect(() =>  {
    services.drawing.changeShapes(shapes)
  }, [shapes]);


  React.useEffect(() =>  {
    services.drawing.changeMetrics(scale, origin)
  }, [scale, origin]);

  React.useEffect(() =>  {
    services.drawing.changeSelected(selected, selectedProps)
  }, [selected, selectedProps]);


  return (
    <div
      ref={dom}
      className={s.canvas}
    />
  );
}

export default React.memo(Drawing);
