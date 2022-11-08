import { useCallback } from "react";
import useSelector from "@src/hooks/use-selector";
import translate from "@src/utils/translate";
import useStore from "@src/hooks/use-store";

/**
 * Хук возвращает функция для локализации текстов
 * Связан с кодом языка из внешнего состояния
 */
export default function useTranslate() {
  const store = useStore();

  // Текущая локаль
  const lang: string = useSelector((state: any) => state.locale.lang);

  // Функция для семны локали
  const setLang = useCallback(
    (lang: string) => store.get("locale").setLang(lang),
    []
  );

  // Функция для локализации текстов
  const t = useCallback(
    (text: string, number: number = undefined) => {
      return translate(lang, text, number);
    },
    [lang]
  );

  return { lang, setLang, t };
}
