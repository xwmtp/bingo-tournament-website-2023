export function onlyUnique<T>(value: T, index: number, self: Array<T>): boolean {
  return self.indexOf(value) === index;
}

export function onlyUniqueStringsCaseInsensitive(
  value: string,
  index: number,
  self: Array<string>
): boolean {
  return onlyUnique<string>(
    value.toLowerCase(),
    index,
    self.map((str) => str.toLowerCase())
  );
}
