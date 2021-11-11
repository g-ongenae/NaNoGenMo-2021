/**
 * Get a random element in the given array
 * @param arr an array of anything
 * @returns a random element of the array
 */
export const getRandomElementIn = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * (arr.length - 1))];
