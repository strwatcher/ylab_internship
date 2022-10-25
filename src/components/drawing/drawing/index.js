import Core from "@src/drawing/core";
import React from "react";
import s from "./style.module.scss";

function Drawing({ shapes, origin, scale, selected, onChange }) {
  const core = React.useMemo(() => new Core(), [])
  const dom = React.useRef(null);

  React.useEffect(() => {
    core.mount(dom.current, onChange)
    return () => core.unmount();
  }, []);

  React.useEffect(() => {
    core.changeShapes(shapes);
  }, [shapes]);

  React.useEffect(() => {
    core.changeMetrics(scale, origin)
  }, [scale, origin]);

  React.useEffect(() => {
    core.changeSelected(selected);
  }, [selected]);


  return <div ref={dom} className={s.canvas} />;
}

export default React.memo(Drawing);
