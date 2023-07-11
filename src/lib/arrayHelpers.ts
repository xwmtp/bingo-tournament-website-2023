export function chunkArray<T>(items: T[], chunkSize: number): T[][] {
  if (chunkSize < 1) {
    throw Error("Chunk size has to be an integer of 1 or larger");
  }

  const chunkArray: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    chunkArray.push(chunk);
  }
  return chunkArray;
}

export function chunkArrayByNumber<T>(array: T[], numberOfChunks: number): T[][] {
  if (numberOfChunks < 1) {
    throw Error("Number of chunks has to be an integer of 1 or larger");
  }
  const size = Math.ceil(array.length / numberOfChunks);
  return Array.from({ length: numberOfChunks }, (v, i) => array.slice(i * size, i * size + size));
}
