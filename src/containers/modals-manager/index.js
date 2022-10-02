import ModalsBase from "@src/components/elements/modals-base";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import React, { useEffect } from "react";

function ModalsManager() {
  const store = useStore();
  const select = useSelector((state) => ({
    modals: state.modals.items,
  }));

  useEffect(() => {
    if (select.modals.length >= 1) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [select.modals.length]);

  return (
    select.modals.length >= 1 && (
      <ModalsBase>
        {select.modals.map((item, index) =>
          item.render(
            index,
          )
        )}
      </ModalsBase>
    )
  );
}

export default React.memo(ModalsManager);
