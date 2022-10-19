import Canvas from "@src/components/drawing/canvas";
import Relative from "@src/components/elements/relative";
import Layout from "@src/components/layouts/layout";
import Tools from "@src/containers/tools";
import React from "react";
import LayoutPanel from "@src/components/layouts/layout-panel";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";

function Drawing() {
  const store = useStore();
  const select = useSelector((state) => ({
    shapes: state.drawing.shapes,
    scale: state.drawing.scale,
    origin: state.drawing.origin,
  }));

  const callbacks = {
    addShape: React.useCallback((acc) => {
      // store.get("drawing").setShapes(localShapes);
      store.get("drawing").addRandomShape(10, 100, acc);
    }, []),
    clear: React.useCallback(() => {
      store.get("drawing").clear();
    }, []),
  };

  const renders = {
    canvas: React.useCallback(
      (width, height, origin) => (
        <Canvas
          width={width}
          height={height}
          shapes={select.shapes}
          origin={select.origin}
          scale={select.scale}
        />
      ),
      [select.shapes, select.origin, select.scale]
    ),
  };

  return (
    <Layout>
      <Tools />
      <Relative
        render={renders.canvas}
        theme={{
          width: "100%",
          height: "85vh",
        }}
      />
      <LayoutPanel>
        <button onClick={() => callbacks.addShape(0)}>Новая фигура</button>
        <button onClick={() => callbacks.addShape(0.0098)}>Падающая фигура</button>
        <button onClick={callbacks.clear}>Отчистить</button>

      </LayoutPanel>
    </Layout>
  );
}

export default React.memo(Drawing);
