import Drawing from "@src/components/drawing/drawing";
import Layout from "@src/components/layouts/layout";
import Tools from "@src/containers/tools";
import React from "react";
import LayoutPanel from "@src/components/layouts/layout-panel";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import PropertiesPanel from "@src/containers/properties-panel";

function DrawingPage() {
  const store = useStore();
  const select = useSelector((state) => ({
    shapes: state.drawing.shapes,
    scale: state.drawing.scale,
    origin: state.drawing.origin,
    selected: state.drawing.selected,
    selectedProps: state.drawing.selectedProps
  }));

  const callbacks = {
    addShape: React.useCallback((acc) => {
      store.get("drawing").addRandomShape(10, 100, acc);
    }, []),
    clear: React.useCallback(() => {
      store.get("drawing").clear();
    }, []),
    onChange: React.useCallback((obj) => {
      store.get("drawing").setSelectedProps(obj);
    }, []),
  };

  return (
    <Layout>
      <Tools />
      <PropertiesPanel
        selected={select.selected}
        selectedProps={select.selectedProps}
        onChange={callbacks.onChange}
      />
      <Drawing
        shapes={select.shapes}
        origin={select.origin}
        scale={select.scale}
        selected={select.selected}
        selectedProps={select.selectedProps}
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
