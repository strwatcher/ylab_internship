import React from "react";
import propTypes from "prop-types";
import LayoutPanel from "@src/components/layouts/layout-panel";
import SimpleInput from "@src/components/elements/simple-input";

PropertiesPanel.propTypes = {};

PropertiesPanel.defaultProps = {};

function PropertiesPanel({ objectProps, onChange, onSubmit }) {
  const callbacks = {
    onColorChange: React.useCallback((e) => {
      onChange({color: e.target.value})
    }, []),
    onXChange: React.useCallback((e) => {
      onChange({x: e.target.value})
    }, []),
    onYChange: React.useCallback((e) => {
      onChange({y: e.target.value})
    }, []),
    onSizeChange: React.useCallback((e) => {
      onChange({size: e.target.value})
    }, []),
  }
  return (
    <LayoutPanel>
      <SimpleInput
        type="color"
        title={"Цвет заливки"}
        name={"fillColor"}
        value={objectProps?.color}
        onChange={callbacks.onColorChange}
      />
      <SimpleInput
        type="number"
        title={"Координата x"}
        name={"xCoord"}
        value={objectProps?.x}
        onChange={callbacks.onXChange}
      />
      <SimpleInput
        type="number"
        title={"Координата y"}
        name={"yCoord"}
        value={objectProps?.y}
        onChange={callbacks.onYChange}
      />
      <SimpleInput
        type="number"
        title={"Размер"}
        name={"size"}
        value={objectProps?.size}
        onChange={callbacks.onSizeChange}
      />
      <button onClick={onSubmit}>Применить</button>
    </LayoutPanel>
  );
}

export default React.memo(PropertiesPanel);
