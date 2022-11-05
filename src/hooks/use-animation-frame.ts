import React from "react";

export const useAnimationFrame = (callback: (dt: number) => void) => {
  const requestRef = React.useRef<number>();
  const prevTimeRef = React.useRef<number>();

  const animate = React.useCallback(
    (time: number) => {
      if (prevTimeRef.current) {
        const deltaTime = time - prevTimeRef.current;
        callback(deltaTime);
      }

      prevTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);
};
