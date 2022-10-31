import React from "react";
import Input from "@src/components/elements/input";

function LeafPanel({ onChange, selected }) {
  const callbacks = {
    onXChange: React.useCallback((x) => {
      onChange({ name: "x", value: parseInt(x) });
    }, []),
    onYChange: React.useCallback((y) => {
      onChange({ name: "y", value: parseInt(y) });
    }, []),
    onWidthChange: React.useCallback((width) => {
      onChange({ name: "width", value: parseInt(width) });
    }, []),
    onHeightChange: React.useCallback((height) => {
      onChange({ name: "height", value: parseInt(height) });
    }),
  };

  return (
    <>
      <Input
        type="number"
        title={"Координата x"}
        name={"xCoord"}
        value={selected.x}
        onChange={callbacks.onXChange}
        theme={"default"}
      />
      <Input
        type="number"
        title={"Координата y"}
        name={"yCoord"}
        value={selected.y}
        onChange={callbacks.onYChange}
        theme={"default"}
      />
      <Input
        type="number"
        title={"Ширина"}
        name={"width"}
        value={selected.width}
        onChange={callbacks.onWidthChange}
        theme={"default"}
      />
      <Input
        type="number"
        title={"Высота"}
        name={"height"}
        value={selected.height}
        onChange={callbacks.onHeightChange}
        theme={"default"}
      />
    </>
  );
}

export default React.memo(LeafPanel);
