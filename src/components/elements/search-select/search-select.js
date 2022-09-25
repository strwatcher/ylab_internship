import { joinClasses } from "@src/utils/join-classes";
import React from "react";
import Arrow from "./arrow";
import Option from "./option";
import SearchField from "./search-field";
import s from "./style.module.scss";

function PureSearchSelect({
  refs,
  options,
  currentOption,
  callbacks,
  opened,
  filter
}) {
  return (
    <div
      ref={refs.select}
      className={s.wrapper}
      onKeyDown={callbacks.selectKeydown}
      tabIndex={0}
    >
      <div className={s.head} onClick={callbacks.toggleShow}>
        <Option
          title={currentOption.title}
          iconString={currentOption.iconString}
        />
        <Arrow />
      </div>

      <div
        ref={refs.dropdown}
        className={joinClasses(s.body, opened && s.body__show)}
        onKeyDown={callbacks.dropdownKeydown}
      >
        <SearchField
          ref={refs.search}
          onChange={callbacks.filterChange}
          filter={filter}
        />
        <ul
          role={"listbox"}
          aria-activedescendant={currentOption}
          disabled
        >
          {options.map((item) => (
            <Option
              selectedRef={currentOption._id === item._id ? refs.currentOption : null}
              onClick={callbacks.select(item._id)}
              onKeyDown={callbacks.optionKeydown}
              selectable
              selected={currentOption._id === item._id}
              key={item._id}
              title={item.title}
              iconString={item.iconString}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default React.memo(PureSearchSelect);
