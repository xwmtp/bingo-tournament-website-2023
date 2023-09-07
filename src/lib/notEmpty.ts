export function notEmpty<T>(item: T | undefined): item is T {
  return !!item;
}
