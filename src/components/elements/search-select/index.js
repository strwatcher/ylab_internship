import { useClickOutside } from "@src/hooks/use-click-outside";
import { textWidth } from "@src/utils/text-width";
import React, { useEffect, useRef, useState } from "react";
import PureSearchSelect from "./pure-search-select";

function SearchSelect({ options, onChange, value, width, responsible }) {
  const [opened, setOpened] = useState(false);
  const [currentOptionId, setCurrentOptionId] = useState(value);
  const [currentOption, setCurrentOption] = useState({});
  const [workingOptions, setWorkingOptions] = useState([]);
  const [filter, setFilter] = useState("");
  const refs = {
    select: useRef(null),
    dropdown: useRef(null),
    search: useRef(null),
    currentOption: useRef(null),
  };

  const _nextOption = (currentIndex, additional) => {
    if (currentIndex >= 0 && currentIndex < workingOptions.length - 1) {
      setCurrentOptionId(workingOptions[currentIndex + 1].value);
      refs.currentOption.current.nextElementSibling.focus();
      additional();
    } else if (currentIndex < 0) {
      setCurrentOptionId(workingOptions[0].value);
      refs.search.current.nextElementSibling.focus();
      // additional()
    }
  };

  const _previousOption = (currentIndex, additional) => {
    if (currentIndex > 0) {
      setCurrentOptionId(workingOptions[currentIndex - 1].value);
      refs.currentOption.current.previousElementSibling.focus();
      additional();
    } else {
      refs.search.current.focus();
    }
  };

  const _changeOptions = (
    event,
    nextKey,
    previousKey,
    additional = (nextIndex) => {}
  ) => {
    const currentIndex = workingOptions.findIndex(
      (item) => item.value === currentOptionId
    );
    if (event.key === nextKey) {
      event.preventDefault();
      _nextOption(currentIndex, () => {
        additional(currentIndex + 1);
      });
    } else if (event.key === previousKey) {
      event.preventDefault();
      _previousOption(currentIndex, () => {
        additional(currentIndex - 1);
      });
    }
  };

  const callbacks = {
    toggleShow: () => {
      setOpened(!opened);
    },

    select: (value) => () => {
      setCurrentOptionId(value);
      setOpened(false);
      onChange && onChange(value);
    },

    filterChange: (text) => {
      setFilter(text);
    },

    dropdownKeydown: (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setFilter("");
        callbacks.select(currentOption.value)();
        refs.select.current.focus();
      }

      if (event.key === "Shift") {
        event.preventDefault();
        refs.search.current.focus();
      }
      _changeOptions(event, "ArrowDown", "ArrowUp");
    },

    selectKeydown: (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        callbacks.toggleShow();
      }
      if (event.key === "Escape" || (event.key === "Tab" && opened)) {
        event.preventDefault();
        setFilter("");
        refs.select.current.focus();
        callbacks.toggleShow();
      }
      if (event.key === " ") {
        if (!opened) {
          event.preventDefault();
          setOpened(true);
        }
      }
      if (!opened) {
        _changeOptions(event, "ArrowRight", "ArrowLeft", (nextIndex) =>
          callbacks.select(workingOptions[nextIndex].value)()
        );
        _changeOptions(event, "ArrowDown", "ArrowUp", (nextIndex) =>
          callbacks.select(workingOptions[nextIndex].value)()
        );
      }
    },
  };

  useClickOutside(() => setOpened(false), refs.select, refs.dropdown);

  useEffect(() => {
    opened && refs.search.current && refs.search.current.focus();
  }, [opened]);

  useEffect(() => {
    setWorkingOptions(
      options.filter((item) =>
        item.title.toLowerCase().startsWith(filter.toLowerCase())
      )
    );
  }, [filter, options]);

  useEffect(() => {
    setCurrentOption(options.find((item) => item.value === currentOptionId));
  }, [currentOptionId]);

  useEffect(() => {
    let newWidth;
    if (!width) {
      const maxOption = options.reduce((prev, cur) =>
        prev.title.length > cur.title.length ? prev : cur
      );
      newWidth = Math.floor(textWidth(maxOption.title, "15px sans-serif"));
      refs.select.current.style.setProperty("--width", newWidth + 70 + "px");
    } else {
      refs.select.current.style.setProperty("--width", width + "px");
    }
  }, [options, responsible]);

  return (
    <PureSearchSelect
      callbacks={callbacks}
      refs={refs}
      options={workingOptions}
      currentOption={currentOption}
      opened={opened}
      filter={filter}
    />
  );
}

export default React.memo(SearchSelect);
