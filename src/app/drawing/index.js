import Drawing from "@src/components/drawing/drawing";
import Layout from "@src/components/layouts/layout";
import Tools from "@src/containers/tools";
import React from "react";
import LayoutPanel from "@src/components/layouts/layout-panel";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";

function DrawingPage() {
  const store = useStore();
  const select = useSelector((state) => ({
    shapes: state.drawing.shapes,
    scale: state.drawing.scale,
    origin: state.drawing.origin,
  }));

  const callbacks = {
    addShape: React.useCallback((acc) => {
      store.get("drawing").addRandomShape(10, 100, acc);
    }, []),
    clear: React.useCallback(() => {
      store.get("drawing").clear();
    }, []),
  };

  return (
    <Layout>
      <Tools />
      <Drawing
        shapes={select.shapes}
        origin={select.origin}
        scale={select.scale}
      />
      <LayoutPanel>
        <button onClick={() => callbacks.addShape(0)}>Новая фигура</button>
        <button onClick={() => callbacks.addShape(0.0098)}>
          Падающая фигура
        </button>
        <button onClick={callbacks.clear}>Отчистить</button>
      </LayoutPanel>
    </Layout>
  );
}

export default React.memo(DrawingPage);
