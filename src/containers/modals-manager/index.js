import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import React from "react";

function ModalsManager() {
  const store = useStore();
  const select = useSelector((state) => ({
    modals: state.modals.items,
  }));
  return <>{select.modals.map((item, index) => item.render(index, item.onClose || (() => {}), item.onSuccess || (() => {})))}</>;
}

export default React.memo(ModalsManager);
