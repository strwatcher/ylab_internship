import { useEffect, useRef } from "react";

export function useFirstRender(callback: Function) {
  const firstRender = useRef(true);

  useEffect(() => {
    callback && callback();
    firstRender.current = false;
  }, []);

  return firstRender.current;
}
