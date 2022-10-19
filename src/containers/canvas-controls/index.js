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
  const [isMoving, setIsMoving] = React.useState(false);
  const [localShapes, setLocalShapes] = React.useState([]);

  const callbacks = {
    clearCanvas: React.useCallback(
      (context) => services.drawing.clearDrawingArea(context, width, height),
      [width, height]
    ),

    addShape: React.useCallback(() => {
      store.get("drawing").setShapes(localShapes);
      store.get("drawing").addRandomShape(width, height, 10, 100, 0);
    }, [width, height, localShapes]),

    addFallingShape: React.useCallback(() => {
      store.get("drawing").setShapes(localShapes);
      store.get("drawing").addRandomShape(width, height / 2, 10, 100, 0.0098);
    }, [localShapes, width, height]),

    clear: React.useCallback(() => {
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

    mouseDown: e => setIsMoving(true),
    mouseUp: e => setIsMoving(false),
    mouseMove: e => {
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
  
  // Устанавливаем копию массива фигур в локальный стейт
  React.useLayoutEffect(() => {
    setLocalShapes(select.shapes);
  }, [select.shapes]);

  // Скроллинг и зуминг
  React.useEffect(() => {
    document.addEventListener("wheel", callbacks.scroll);

    return () => document.removeEventListener("wheel", callbacks.scroll);
  }, [callbacks.scroll]);

  // Анимация фигур
  useAnimationFrame(callbacks.animate);

  return (
    <>
      <Canvas
        shapes={localShapes}
        width={width}
        height={height}
        mouseMove={callbacks.mouseMove}
        mouseDown={callbacks.mouseDown}
        mouseUp={callbacks.mouseUp}
        wheel={callbacks.wheel}
        clear={callbacks.clearCanvas}
        origin={select.origin}
        scale={select.scale}
      />
      <LayoutPanel>
        <button onClick={callbacks.addShape}>Новая фигура</button>
        <button onClick={callbacks.addFallingShape}>Падающая фигура</button>
        <button onClick={callbacks.clear}>Отчистить</button>
      </LayoutPanel>
    </>
  );
}

export default React.memo(CanvasControls);
