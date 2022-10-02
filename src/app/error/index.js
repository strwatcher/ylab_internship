import LayoutModal from "@src/components/layouts/layout-modal";
import React, { useCallback } from "react";

function Error({ onClose, errorText }) {
  const callbacks = {
    onClose: useCallback(() => {
      onClose();
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
