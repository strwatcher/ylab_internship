import { useClickOutside } from "@src/hooks/use-click-outside";
import React, { useEffect, useRef, useState } from "react";
import PureSearchSelect from "./pure-search-select";

function SearchSelect({ options, onSelect, value, width }) {
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

  const _nextOption = (currentIndex) => {
    if (currentIndex >= 0 && currentIndex < workingOptions.length - 1) {
      setCurrentOptionId(workingOptions[currentIndex + 1].value);
      refs.currentOption.current.nextElementSibling.focus();
    } else if (currentIndex < 0) {
      setCurrentOptionId(workingOptions[0].value);
      refs.search.current.nextElementSibling.focus();
    }
  };

  const _previousOption = (currentIndex) => {
    if (currentIndex > 0) {
      setCurrentOptionId(workingOptions[currentIndex - 1].value);
      refs.currentOption.current.previousElementSibling.focus();
    } else {
      refs.search.current.focus();
    }
  };

  const _changeOptions = (event, nextKey, previousKey) => {
    const currentIndex = workingOptions.findIndex(
      (item) => item.value === currentOptionId
    );
    if (event.key === nextKey) {
      event.preventDefault();
      _nextOption(currentIndex);
    } else if (event.key === previousKey) {
      event.preventDefault();
      _previousOption(currentIndex);
    }
  };

  const callbacks = {
    toggleShow: () => {
      setOpened(!opened);
    },

    select: (value) => () => {
      setCurrentOptionId(value);
      setOpened(false);
      onSelect && onSelect(value);
    },

    filterChange: (text) => {
      setFilter(text);
    },

    dropdownKeydown: (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setFilter("");
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
        event.preventDefault();
        if (!opened) setOpened(true);
      }
      if (!opened) {
        _changeOptions(event, "ArrowRight", "ArrowLeft");
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
  }, [filter]);

  useEffect(() => {
    setCurrentOption(options.find((item) => item.value === currentOptionId));
  }, [currentOptionId]);

  useEffect(() => {
    width && refs.select.current.style.setProperty("--width", width + "px");
  }, []);

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
