import React from "react";
import LayoutPanel from "@src/components/layouts/layout-panel";
import Input from "@src/components/elements/input";

PropertiesPanel.propTypes = {};

PropertiesPanel.defaultProps = {};

function PropertiesPanel({ onChange, selectedProps }) {
  const callbacks = {
    onColorChange: React.useCallback((color) => {
      onChange({color});
    }, []),
    onXChange: React.useCallback((x) => {
      onChange({x: parseInt(x)});
    }, []),
    onYChange: React.useCallback((y) => {
      onChange({y: parseInt(y)});
    }, []),
    onSizeChange: React.useCallback((size) => {
      const parsedSize = parseInt(size);
      onChange({width: parsedSize, height: parsedSize});
    }, []),
    onAccChange: React.useCallback((acc) => {
      onChange({acc: parseFloat(acc)})
    }, [])
  };
  return (
    <LayoutPanel>
      {!!selectedProps && (
        <>
          <Input
            type="color"
            title={"Цвет заливки"}
            name={"fillColor"}
            value={selectedProps.fill}
            onChange={callbacks.onColorChange}
            theme={"default"}
          />
          <Input
            type="number"
            title={"Координата x"}
            name={"xCoord"}
            value={selectedProps.x}
            onChange={callbacks.onXChange}
            theme={"default"}
          />
          <Input
            type="number"
            title={"Координата y"}
            name={"yCoord"}
            value={selectedProps.y}
            onChange={callbacks.onYChange}
            theme={"default"}
          />
          <Input
            type="number"
            title={"Размер"}
            name={"size"}
            value={selectedProps.width}
            onChange={callbacks.onSizeChange}
            theme={"default"}
          />
          <Input
            type="number"
            title={"Ускорение"}
            name={"acc"}
            value={selectedProps.acc}
            onChange={callbacks.onAccChange}
            theme={"default"}
            />
        </>
      )}
    </LayoutPanel>
  );
}

export default React.memo(PropertiesPanel);
