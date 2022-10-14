import { useCallback, useRef } from "react";

export function useInfinityScroll(fetching, hasMore, onIntersection) {
  const observer = useRef();
  const observedRef = useCallback(
    (node) => {
      if (fetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onIntersection();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetching, hasMore, onIntersection]
  );

  return observedRef;
}
