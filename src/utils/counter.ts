/**
 * Генерирует уникальный код на основе счётчика
 */
counter.value = 0;

export default function counter(): number {
  return ++counter.value;
}
