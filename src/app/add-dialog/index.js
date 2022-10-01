import DigitInput from "@src/components/elements/digit-input";
import LayoutModal from "@src/components/layouts/layout-modal";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import React, { useCallback } from "react";

function AddDialog({ onSuccess }) {
  const store = useStore();
  const select = useSelector((state) => ({
    amount: state.addDialog.amount,
  }));

  const callbacks = {
    closeModal: useCallback(() => {
      store.get("modals").close();
      store.get("addDialog").setAmount(0);
    }, []),
    onAdd: useCallback(() => {
      onSuccess(select.amount);
      callbacks.closeModal();
    }, [select.amount]),
    onChange: useCallback(
      (value) => store.get("addDialog").setAmount(value),
      []
    ),
  };

  const { t } = useTranslate();
  return (
    <LayoutModal
      title={"Добавить"}
      labelClose={t("basket.close")}
      onClose={callbacks.closeModal}
      theme={{
        contentDisplay: "flex",
        frameMinWidth: "300px",
        contentPadding: "20px 0",
      }}
    >
      <DigitInput value={select.amount} onChange={callbacks.onChange} />
      <button onClick={callbacks.onAdd}>Добавить</button>
    </LayoutModal>
  );
}

export default React.memo(AddDialog);
