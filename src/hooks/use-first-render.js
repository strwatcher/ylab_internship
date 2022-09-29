import { useEffect, useRef } from "react";

export function useFirstRender(callback) {
  const firstRender = useRef(true);

  useEffect(() => {
    callback && callback();
    firstRender.current = false;
  }, []);

  return firstRender.current;
}
