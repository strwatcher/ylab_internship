import React from "react";
import LayoutPanel from "@src/components/layouts/layout-panel";
import Input from "@src/components/elements/input";

PropertiesPanel.propTypes = {};

PropertiesPanel.defaultProps = {};

function PropertiesPanel({ objectProps, onChange, selected }) {
  const callbacks = {
    onColorChange: React.useCallback((color) => {
      onChange({ color });
    }, []),
    onXChange: React.useCallback((x) => {
      onChange({ x });
    }, []),
    onYChange: React.useCallback((y) => {
      onChange({ y });
    }, []),
    onSizeChange: React.useCallback((size) => {
      onChange({ size });
    }, []),
  };
  return (
    <LayoutPanel>
      {selected && (
        <>
          <Input
            type="color"
            title={"Цвет заливки"}
            name={"fillColor"}
            value={objectProps?.color}
            onChange={callbacks.onColorChange}
            theme={"default"}
          />
          <Input
            type="number"
            title={"Координата x"}
            name={"xCoord"}
            value={objectProps?.x}
            onChange={callbacks.onXChange}
            theme={"default"}
          />
          <Input
            type="number"
            title={"Координата y"}
            name={"yCoord"}
            value={objectProps?.y}
            onChange={callbacks.onYChange}
            theme={"default"}
          />
          <Input
            type="number"
            title={"Размер"}
            name={"size"}
            value={objectProps?.size}
            onChange={callbacks.onSizeChange}
            theme={"default"}
          />
        </>
      )}
    </LayoutPanel>
  );
}

export default React.memo(PropertiesPanel);
