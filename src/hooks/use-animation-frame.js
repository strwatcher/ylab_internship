import React from "react";

export const useAnimationFrame = (callback) => {
  const requestRef = React.useRef();
  const prevTimeRef = React.useRef();

  const animate = React.useCallback(time => {
    if (prevTimeRef.current) {
      const deltaTime = time - prevTimeRef.current;
      callback(deltaTime);
    }

    prevTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback])

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);
}