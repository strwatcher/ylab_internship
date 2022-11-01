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
    width: state.drawing.width,
    height: state.drawing.height,
  }));

  const callbacks = {
    addLeafs: React.useCallback(() => {
      store
        .get("drawing")
        .addLeafs(
          30,
          50,
          select.origin.x,
          select.origin.y,
          select.width,
          200,
          select.scale,
          100
        );
    }, [select.width, select.scale, select.origin]),

    addShape: React.useCallback(
      (acc, width, height) => {
        store
          .get("drawing")
          .addRandomSquare(
            30,
            100,
            select.origin.x,
            select.origin.y,
            width,
            height,
            acc,
            select.scale
          );
      },
      [select.origin, select.scale]
    ),

    addShapeFull: React.useCallback(() => {
      callbacks.addShape(0, select.width, select.height);
    }, [select.width, select.height]),

    addShapeTop: React.useCallback(() => {
      callbacks.addShape(0.0098, select.width, 0);
    }, [select.width]),

    clear: React.useCallback(() => {
      store.get("drawing").clear();
    }, []),
    onChange: React.useCallback((obj) => {
      store.get("drawing").changeSelected(obj);
    }, []),
    onDrawingChange: React.useCallback((obj) => {
      store.get("drawing").setSome(obj);
    }, []),
  };

  return (
    <Layout>
      <Tools />
      <PropertiesPanel
        selected={select.selected}
        onChange={callbacks.onChange}
      />
      <Drawing
        shapes={select.shapes}
        origin={select.origin}
        scale={select.scale}
        selected={select.selected}
        onChange={callbacks.onDrawingChange}
      />
      <LayoutPanel>
        <button onClick={callbacks.addShapeFull}>Новая фигура</button>
        <button onClick={callbacks.addShapeTop}>Падающая фигура</button>
        <button onClick={callbacks.addLeafs}>Осень</button>
        <button onClick={callbacks.clear}>Отчистить</button>
      </LayoutPanel>
    </Layout>
  );
}

export default React.memo(DrawingPage);
