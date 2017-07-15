/**
 * Remove item from array.
 * @param item Removed item.
 * @param array From this array.
 */
export function removeFromArray<T>(array: T[], item: T): boolean {
  const index = array.indexOf(item);
  if (index === -1) {
    return false;
  }

  array.splice(index, 1);

  return true;
}

/**
 * Add item to array
 * @param item Added item.
 * @param array To this array.
 */
export function addToArray<T>(array: T[], item: T): boolean {
  const index = array.indexOf(item);
  if (index !== -1) {
    return false;
  }

  array.push(item);

  return true;
}

export function includeInArray<T>(array: T[], item: T): boolean {
  return array.includes(item);
}
