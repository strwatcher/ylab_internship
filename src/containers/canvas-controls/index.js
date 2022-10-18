import React from "react";
import propTypes from "prop-types";
import Canvas from "@src/components/drawing/canvas";
import { clear, draw } from "../../components/drawing/canvas/drawing";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import LayoutPanel from "@src/components/layouts/layout-panel";
import { useAnimationFrame } from "@src/hooks/use-animation-frame";
import { useCallback } from "react";
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
  const [isMoving, setIsMoving] = React.useState(false);
  const [shapesCopy, setShapesCopy] = React.useState([]);

  const callbacks = {
    clear: React.useCallback(
      (context) => services.drawing.clearDrawingArea(context, width, height),
      [width, height]
    ),

    addShape: React.useCallback(() => {
      console.log(shapesCopy);
      store.get("drawing").setShapes(shapesCopy);
      store.get("drawing").addRandomShape(width, height, 10, 100, 0);
    }, [width, height, shapesCopy]),

    addFallingShape: React.useCallback(() => {
      store.get("drawing").setShapes(shapesCopy);
      store.get("drawing").addRandomShape(width, height / 2, 10, 100, 0.0098);
    }, [shapesCopy, width, height]),

    clearCanvas: React.useCallback(() => {
      store.get("drawing").clear();
    }, []),

    scroll: React.useCallback(
      (e) => {
        const direction = Math.sign(e.deltaY);
        if (e.shiftKey) {
          const ratio = direction === -1 ? 1.5 : 1 / 1.5;
          store.get("drawing").scale(ratio, width, height, {
            x: e.clientX - origin.x,
            y: e.clientY - origin.y,
          });
        } else {
          const offset = direction * -50;
          store.get("drawing").moveOrigin({ x: 0, y: offset });
        }
      },
      [width, height]
    ),

    mouseDown: (e) => setIsMoving(true),

    mouseUp: (e) => setIsMoving(false),

    mouseMove: (e) => {
      // console.log("offset: ", origin.x, " ", origin.y)
      // console.log("calculated: ", e.clientX - origin.x, " ", e.clientY - origin.y)
      if (isMoving) {
        store.get("drawing").moveOrigin({ x: -e.movementX, y: -e.movementY });
      }
    },

    setShapes: React.useCallback(
      (shapes) => store.get("drawing").setShapes(shapes),
      []
    ),

    animate: React.useCallback(
      (dt) => {
        setShapesCopy(
          shapesCopy.map((shape) =>
            shape.fall(
              dt,
              height / select.scale + select.origin.y - shape.height
            )
          )
        );
      },
      [shapesCopy, height, select.scale, select.origin]
    ),
  };

  React.useEffect(() => {
    document.addEventListener("wheel", callbacks.scroll);

    return () => document.removeEventListener("wheel", callbacks.scroll);
  }, [callbacks.scroll]);

  React.useEffect(() => {
    setShapesCopy(select.shapes);
  }, [select.shapes]);

  useAnimationFrame(callbacks.animate);

  const transformedShapes = React.useMemo(() => {
    return shapesCopy.map((shape) =>
      shape.normalize(select.origin, select.scale)
    );
  }, [shapesCopy, select.scale, select.origin]);

  return (
    <>
      <Canvas
        shapes={transformedShapes}
        width={width}
        height={height}
        mouseMove={callbacks.mouseMove}
        mouseDown={callbacks.mouseDown}
        mouseUp={callbacks.mouseUp}
        wheel={callbacks.wheel}
        clear={callbacks.clear}
      />
      <LayoutPanel>
        <button onClick={callbacks.addShape}>Новая фигура</button>
        <button onClick={callbacks.addFallingShape}>Падающая фигура</button>
        <button onClick={callbacks.clearCanvas}>Отчистить</button>
      </LayoutPanel>
    </>
  );
}

export default React.memo(CanvasControls);
