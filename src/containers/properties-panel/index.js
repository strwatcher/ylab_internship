import React from "react";
import LayoutPanel from "@src/components/layouts/layout-panel";
import { Square } from "@src/drawing/square";
import SquarePanel from "@src/containers/panels/square-panel";
import { Leaf } from "@src/drawing/leafs";
import LeafPanel from "@src/containers/panels/leaf-panel";

PropertiesPanel.propTypes = {};

PropertiesPanel.defaultProps = {};

function PropertiesPanel({ onChange, selected }) {
  const CurPanel = React.useMemo(() => {
    if (selected instanceof Square) {
      return SquarePanel;
    }
    if (selected instanceof Leaf) {
      return LeafPanel;
    }
  }, [selected]);

  return (
    <LayoutPanel>
      {!!selected && <CurPanel onChange={onChange} selected={selected} />}
    </LayoutPanel>
  );
}

export default React.memo(PropertiesPanel);
