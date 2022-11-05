import { RefObject, useEffect } from "react";

export function useClickOutside(callback: Function, ...refs: RefObject<any>[]) {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      for (let ref of refs) {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
        return;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs]);
}
