export default function numberFormat(value: number, options = {}): string {
  return new Intl.NumberFormat("ru-RU", options).format(value);
}
