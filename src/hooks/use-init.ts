import { useEffect } from "react";

/**
 * Хук для асинхронных расчётов, которые будут исполнены при первом рендере или изменении depends.
 */
export default function useInit({
  callback,
  depends = [],
  options = { backForward: false },
}: {
  callback: () => void;
  depends?: any[];
  options?: { backForward: boolean };
}) {
  useEffect(() => {
    callback();

    const evCallback = (_: PopStateEvent) => {
      callback();
    };
    // Если в истории браузера меняются только search-параметры, то react-router не оповестит
    // компонент об изменениях, поэтому хук можно явно подписать на событие изменения истории
    // браузера (если нужно отреагировать на изменения search-параметров при переходе по истории)
    if (options.backForward) {
      window.addEventListener("popstate", evCallback);
      return () => {
        window.removeEventListener("popstate", evCallback);
      };
    }
  }, depends);
}
