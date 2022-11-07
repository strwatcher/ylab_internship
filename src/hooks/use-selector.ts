import { State } from "@src/store/types";
import { useEffect, useMemo, useState } from "react";
import shallowequal from "shallowequal";
import useStore from "./use-store";

/**
 * Хук для доступа к объекту хранилища
 */
export default function useSelector(
  selector: (state: State) => any
): ReturnType<typeof selector> {
  const store = useStore();

  const [state, setState] = useState(() => selector(store.getState()));

  // Подписка в useMemo чтобы сразу подписаться и только при первом рендере
  const unsubscribe = useMemo(() => {
    return store.subscribe(() => {
      // Новая выборка
      const newState = selector(store.getState());
      // Установка выбранных данных, если они изменились
      setState((prevState: any) => {
        // Сравнение с предыдущей выборкой
        return shallowequal(prevState, newState) ? prevState : newState;
      });
    });
  }, []);

  // Отписка от store при демонтировании
  useEffect(() => unsubscribe(), [unsubscribe]);

  return state;
}
