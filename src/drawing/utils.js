/**
 *
 * @param {x: number, y: number, width: number, height: number} a
 * @param {x: number, y: number, width: number, height: number} b
 */
export function isIntersected(a, b) {
  return a.x + a.width >= b.x &&
    a.x <= b.x + b.width &&
    a.y + a.height >= b.y &&
    a.y <= b.y + b.height;
}
