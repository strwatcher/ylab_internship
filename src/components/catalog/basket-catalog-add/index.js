import React from "react";
import s from "./style.module.scss";

function BasketCatalogAdd({ onClick }) {
  return (
    <div className={s.wrapper}>
      <button onClick={onClick}>Добавить в корзину</button>
    </div>
  );
}

export default React.memo(BasketCatalogAdd);