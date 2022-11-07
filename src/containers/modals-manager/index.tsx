import ModalsBase from "@src/components/elements/modals-base";
import useSelector from "@src/hooks/use-selector";
import { State } from "@src/store/types";
import React, { useEffect } from "react";

function ModalsManager() {
  const selector = (state: State) => ({
    modals: state.modals.items,
  });
  const select = useSelector(selector);

  useEffect(() => {
    if (select.modals.length >= 1) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [select.modals.length]);

  if (!select.modals.length) return <></>;

  return (
    <ModalsBase>
      {select.modals.map((item, index) => (
        <item.Modal key={index} {...item.props} />
      ))}
    </ModalsBase>
  );
}

export default React.memo(ModalsManager);
