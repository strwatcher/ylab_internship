import React from "react";
import s from "./style.module.scss";

function List({ messages, render, loadRef, listRef }) {
  return (
    <div className={s.list} ref={listRef}>
      <div className={s.top} ref={loadRef}></div>
      {messages.map((message, index) => render(message, index))}
    </div>
  );
}

export default React.memo(List);
