import { useCallback, useRef } from "react";

export function useInfinityScroll(fetching, hasMore, setPageNum) {
  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (fetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetching, hasMore]
  );

  return lastItemRef;
}
