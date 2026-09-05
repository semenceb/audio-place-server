export function getRandomElement<TElement>(
  array: TElement[],
  count: number,
): TElement[] {
  const copy = array.slice();
  const randomElements: TElement[] = [];

  const actualCount = Math.min(count, array.length);

  for (let index = 0; index < actualCount; index++) {
    const randomIndex = Math.floor(Math.random() * copy.length);

    randomElements.push(...copy.splice(randomIndex, 1));
  }

  return randomElements;
}
