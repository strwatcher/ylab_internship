import React from "react";
import Input from "@src/components/elements/input";

function SquarePanel({ onChange, selected }) {
  const callbacks = {
    onColorChange: React.useCallback((fill) => {
      onChange({ name: "fill", value: fill });
    }, []),
    onXChange: React.useCallback((x) => {
      onChange({ name: "x", value: parseInt(x) });
    }, []),
    onYChange: React.useCallback((y) => {
      onChange({ name: "y", value: parseInt(y) });
    }, []),
    onSizeChange: React.useCallback((size) => {
      const parsedSize = parseInt(size);
      onChange(
        { name: "width", value: parsedSize },
        { name: "height", value: "parsedSize" }
      );
    }, []),
    onAccChange: React.useCallback((acc) => {
      onChange({ name: "acc", value: parseFloat(acc) });
    }, []),
  };

  return (
    <>
      <Input
        type="color"
        title={"Цвет заливки"}
        name={"fillColor"}
        value={selected.fill}
        onChange={callbacks.onColorChange}
        theme={"default"}
      />
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
        title={"Размер"}
        name={"size"}
        value={selected.width}
        onChange={callbacks.onSizeChange}
        theme={"default"}
      />
      <Input
        type="number"
        title={"Ускорение"}
        name={"acc"}
        value={selected.acc}
        onChange={callbacks.onAccChange}
        theme={"default"}
      />
    </>
  );
}

export default React.memo(SquarePanel);
