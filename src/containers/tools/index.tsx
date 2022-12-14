import Basket from "@src/app/basket";
import BasketSimple from "@src/components/catalog/basket-simple";
import LayoutFlex from "@src/components/layouts/layout-flex";
import Menu from "@src/components/navigation/menu";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import { State } from "@src/store/types";
import React, { useCallback, useMemo } from "react";

function ToolsContainer() {
  const store = useStore();

  const select = useSelector((state: State) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => {
      console.log("test");
      store.get("modals").open<typeof Basket, {}>({ Modal: Basket, props: {} });
    }, []),
  };

  const options = {
    menu: useMemo(
      () => [
        { key: 1, title: t("menu.main"), link: "/" },
        { key: 2, title: t("chat.title"), link: "/chat" },
        { key: 3, title: "Рисование", link: "/drawing" },
      ],
      [t]
    ),
  };

  return (
    <LayoutFlex flex="between" indent="big">
      <Menu items={options.menu} />
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        t={t}
      />
    </LayoutFlex>
  );
}

export default React.memo(ToolsContainer);
