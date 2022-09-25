import { useEffect } from "react";

export function useClickOutside(callback, ...refs) {
  useEffect(() => {
    const handleClickOutside = (event) => {
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
