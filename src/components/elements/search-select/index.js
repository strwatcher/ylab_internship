import { useClickOutside } from "@src/hooks/use-click-outside";
import React, { useEffect, useRef, useState } from "react";
import PureSearchSelect from "./search-select";

function SearchSelect({ options, onSelect }) {
  const [opened, setShow] = useState(false);
  const [currentOptionId, setCurrentOptionId] = useState(options[0]._id);
  const [currentOption, setCurrentOption] = useState({});
  const [workingOptions, setWorkingOptions] = useState([]);
  const [filter, setFilter] = useState("");
  const refs = {
    select: useRef(null),
    dropdown: useRef(null),
    search: useRef(null),
    currentOption: useRef(null),
  };

  const callbacks = {
    toggleShow: () => {
      setShow(!opened);
    },

    select: (id) => () => {
      setCurrentOptionId(id);
      setShow(false);
      onSelect && onSelect();
    },

    filterChange: (text) => {
      setFilter(text);
    },

    nextOption: (currentIndex) => {
      if (currentIndex >= 0 && currentIndex < workingOptions.length - 1) {
        setCurrentOptionId(workingOptions[currentIndex + 1]._id);
        refs.currentOption.current.nextElementSibling.focus();
      } else if (currentIndex < 0) {
        setCurrentOptionId(workingOptions[0]._id);
        refs.search.current.nextElementSibling.focus();
      }
    },

    previousOption: (currentIndex) => {
      if (currentIndex > 0) {
        setCurrentOptionId(workingOptions[currentIndex - 1]._id);
        refs.currentOption.current.previousElementSibling.focus();
      } else {
        refs.search.current.focus();
      }
    },

    changeOptions: (event, nextKey, previousKey) => {
      const currentIndex = workingOptions.findIndex(
        (item) => item._id === currentOptionId
      );
      if (event.key === nextKey) {
        event.preventDefault();
        callbacks.nextOption(currentIndex);
      } else if (event.key === previousKey) {
        event.preventDefault();
        callbacks.previousOption(currentIndex);
      }
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
      callbacks.changeOptions(event, "ArrowDown", "ArrowUp");
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
        if (!opened) setShow(true);
      }
      if (!opened) {
        callbacks.changeOptions(event, "ArrowRight", "ArrowLeft");
      }
    },
  };

  useClickOutside(() => setShow(false), refs.select, refs.dropdown);

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
    setCurrentOption(options.find((item) => item._id === currentOptionId));
  }, [currentOptionId]);

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
