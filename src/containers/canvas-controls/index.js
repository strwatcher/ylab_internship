import React from "react";
import Canvas from "@src/components/drawing/canvas";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import LayoutPanel from "@src/components/layouts/layout-panel";
import { useAnimationFrame } from "@src/hooks/use-animation-frame";
import useServices from "@src/hooks/use-services";

CanvasControls.propTypes = {};

CanvasControls.defaultProps = {};

function CanvasControls({ width, height, origin }) {
  const store = useStore();
  const services = useServices();
  const select = useSelector((state) => ({
    shapes: state.drawing.shapes,
    origin: state.drawing.origin,
    scale: state.drawing.scale,
  }));

  const callbacks = {
    addFallingShape: React.useCallback(() => {
      store.get("drawing").setShapes(localShapes);
      store.get("drawing").addRandomShape(width, height / 2, 10, 100, 0.0098);
    }, [localShapes, width, height]),

    setShapes: React.useCallback(
      (shapes) => store.get("drawing").setShapes(shapes),
      []
    ),

    animate: React.useCallback(
      (dt) => {
        setLocalShapes(
          localShapes.map((shape) =>
            shape.fall(
              dt,
              height / select.scale + select.origin.y - shape.height
            )
          )
        );
      },
      [localShapes, height, select.scale, select.origin]
    ),
  };
  
  useAnimationFrame(callbacks.animate);

  return (
    <>
    </>
  );
}

export default React.memo(CanvasControls);
