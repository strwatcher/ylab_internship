import DigitInput from "@src/components/elements/digit-input";
import LayoutModal from "@src/components/layouts/layout-modal";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import React, { useCallback } from "react";

function AddDialog({ onError }) {
  const store = useStore();
  const select = useSelector((state) => ({
    amount: state.addDialog.amount,
  }));

  const callbacks = {
    closeModal: useCallback(() => {
      store.get("modals").close();
      store.get("addDialog").setAmount(1);
    }, []),
    onChange: useCallback(
      (value) => store.get("addDialog").setAmount(value),
      []
    ),

    onAddClick: useCallback(() => {
      if (!/^\d+$/.test(select.amount) || select.amount == 0) {
        onError();
      }
      else {
        callbacks.closeModal();
      }
    }, [select.amount])
  };

  const { t } = useTranslate();
  return (
    <LayoutModal
      title={"Добавить"}
      labelClose={t("basket.close")}
      onClose={callbacks.closeModal}
      theme={{
        contentDisplay: "flex",
        frameMinWidth: "400px",
        contentPadding: "40px 0",
        scalable: false
      }}
    >
      <DigitInput value={select.amount} onChange={callbacks.onChange} />
      <button onClick={callbacks.onAddClick}>Добавить</button>
    </LayoutModal>
  );
}

export default React.memo(AddDialog);
