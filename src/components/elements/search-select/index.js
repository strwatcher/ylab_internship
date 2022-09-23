import { useClickOutside } from "@src/hooks/use-click-outside";
import { joinClasses } from "@src/utils/join-classes";
import React, { useRef, useState } from "react";
import Arrow from "./arrow";
import Option from "./option";
import s from "./style.module.scss";

function SearchSelect({ options, onSelect }) {
  const [show, setShow] = useState(false);
  const [currentOption, setCurrentOption] = useState(0);
  const dropdownRef = useRef(null);

  const handlers = {
    toggleShow: (event) => {
      setShow(!show);
    },

    optionKeydown: (index) => (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setShow(false);
        setCurrentOption(index);
      }
    },

    selectKeydown: (event) => {
      let nextOption = currentOption;
      if (event.key === "ArrowDown" || (event.key === "ArrowRight" && !show)) {
        event.preventDefault();
        if (currentOption < options.length - 1) nextOption += 1;
      }
      if (event.key === "ArrowUp" || (event.key === "ArrowLeft" && !show)) {
        event.preventDefault();
        if (currentOption > 0) nextOption -= 1;
      }

      if (event.key === "Escape") {
        setShow(false);
        return;
      }

      if (nextOption !== currentOption) {
        setCurrentOption(nextOption);
      }
    },

    select: (index) => () => {
      setCurrentOption(index);
      setShow(false);
    },
  };

  useClickOutside(() => {
    setShow(false);
  }, dropdownRef);

  return (
    <div
      ref={dropdownRef}
      className={s.wrapper}
      onKeyDown={handlers.selectKeydown}
    >
      <button className={s.head} onClick={handlers.toggleShow}>
        <Option
          title={options[currentOption].title}
          iconString={options[currentOption].iconString}
        />
        <Arrow />
      </button>

      <div className={joinClasses(s.body, show && s.body__show)}>
        <ul
          role={"listbox"}
          aria-activedescendant={options[currentOption]}
          tabIndex={-1}
        >
          {options.map((item, index) => (
            <Option
              onClick={handlers.select(index)}
              selectable
              selected={currentOption === index}
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

export default React.memo(SearchSelect);
