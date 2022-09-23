import { useClickOutside } from "@src/hooks/use-click-outside";
import { joinClasses } from "@src/utils/join-classes";
import React, { useEffect, useRef, useState } from "react";
import Arrow from "./arrow";
import Option from "./option";
import s from "./style.module.scss";

function SearchSelect({ options, onSelect }) {
  const [show, setShow] = useState(false);
  const [currentOption, setCurrentOption] = useState(0);
  const dropdownRef = useRef(null);
  const currentOptionRef = useRef(null);

  const handlers = {
    toggleShow: () => {
      setShow(!show);
    },

    optionKeydown: (index) => (event) => {
      let direction = 0;
      if (event.key === "Enter") {
        event.preventDefault();
        handlers.select(index)();
        dropdownRef.current.focus();
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (currentOption < options.length - 1) direction = 1;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (currentOption > 0) direction = -1;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (currentOption < options.length - 1 && !show) direction = 1;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (currentOption > 0 && !show) direction = -1;
      }
      if (direction !== 0) {
        setCurrentOption(currentOption + direction);
        if (direction === -1) {
          event.target.previousElementSibling.focus();
        }
        if (direction === 1) {
          event.target.nextElementSibling.focus();
        }
        console.log(event.target);
      }
    },

    selectKeydown: (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handlers.toggleShow();
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setShow(false);
        return;
      }

      if (event.key === "Tab" && show) {
        event.preventDefault();
        setShow(false);
      }

      if (event.key === " ") {
        event.preventDefault();
        if (!show) setShow(true);
      }
    },

    select: (index) => () => {
      setCurrentOption(index);
      setShow(false);
      onSelect && onSelect();
    },
  };

  useClickOutside(() => {
    setShow(false);
  }, dropdownRef);

  useEffect(() => {
    show && currentOptionRef.current.focus();
  }, [show]);

  return (
    <div
      ref={dropdownRef}
      className={s.wrapper}
      onKeyDown={handlers.selectKeydown}
      tabIndex={0}
    >
      <div className={s.head} onClick={handlers.toggleShow}>
        <Option
          title={options[currentOption].title}
          iconString={options[currentOption].iconString}
        />
        <Arrow />
      </div>

      <div className={joinClasses(s.body, show && s.body__show)}>
        <ul
          role={"listbox"}
          aria-activedescendant={options[currentOption]}
          tabIndex={-1}
        >
          {options.map((item, index) => (
            <Option
              selectedRef={currentOption === index ? currentOptionRef : null}
              onClick={handlers.select(index)}
              onKeyDown={handlers.optionKeydown(index)}
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
