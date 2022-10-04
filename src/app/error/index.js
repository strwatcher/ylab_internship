import LayoutModal from "@src/components/layouts/layout-modal";
import useStore from "@src/hooks/use-store";
import React, { useCallback } from "react";

function Error({ errorText }) {
  const store = useStore();

  const callbacks = {
    onClose: useCallback(() => {
      store.get("modals").close();
    }, []),
  };

  return (
    <LayoutModal
      onClose={callbacks.onClose}
      labelClose={"Закрыть"}
      title={"Ошибка"}
      theme={{ contentDisplay: "flex", frameMinWidth: "250px", contentPadding: "0", scalable: false}}
    >
      <div>{errorText || "Что-то пошло не так"}</div>
    </LayoutModal>
  );
}

export default React.memo(Error);
