import * as l from "./locales";
const locales: any = l;
/**
 * Перевод фраз по словарю
 */
export default function translate(
  lang: string,
  text: string,
  plural: number
): string {
  const result =
    locales[lang] && typeof locales[lang][text] !== "undefined"
      ? locales[lang][text]
      : text;

  if (typeof plural !== "undefined") {
    const key = new Intl.PluralRules(lang).select(plural);
    return result[key] || result;
  }

  return result;
}
