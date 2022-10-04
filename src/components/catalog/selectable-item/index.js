import { cn as bem } from "@bem-react/classname";
import DigitInput from "@src/components/elements/digit-input";
import numberFormat from "@src/utils/number-format";
import propTypes from "prop-types";
import React, { useCallback } from "react";
import "./style.css";

function SelectableItem(props) {
  const cn = bem("SelectableItem");
  const callbacks = {
    onSelect: useCallback(
      (e) => props.onSelect(props.item._id),
      [props.onSelect, props.item]
    ),
    onChangeAmount: useCallback(
      amount => props.onChangeAmount(props.item._id, amount),
      [] 
    )
  };
  const selected = props.selected;
  return (
    <div className={cn({ selected })} onClick={callbacks.onSelect}>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("center")}>
        {props.selected && <DigitInput onChange={callbacks.onChangeAmount} value={props.amount}/>}
      </div>
      <div className={cn("right")}>
        <div className={cn("price")}>
          {numberFormat(props.item.price)} {props.labelCurr}
        </div>
      </div>
    </div>
  );
}

SelectableItem.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func,
  onChangeAmount: propTypes.func,
  link: propTypes.string,
  labelCurr: propTypes.string,
  labelAdd: propTypes.string,
  selected: propTypes.bool
};

SelectableItem.defaultProps = {
  onSelect: () => {},
  labelCurr: "₽",
  labelAdd: "Добавить",
};

export default React.memo(SelectableItem);
