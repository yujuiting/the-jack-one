export const Random = Symbol('Random');

export interface Random {

  nextInt(): number;

  /**
   * Return a random floating point number between [0, 1)
   */
  next(): number;

  /**
   * Return a random floating point in range [min, max) min is included, max is not included
   */
  floating(min: number, max: number): number;

  /**
   * Return a random integer in range [min, max] min is included, max is included.
   * Implemented with rejection sampling, see https://medium.com/@betable/tifu-by-using-math-random-f1c308c4fd9d#.i13tdiu5a
   */
  integer(min: number, max: number): number;

  /**
   * Returns true or false randomly with 50/50 odds by default.
   * By default the likelihood of returning a true is .5 (50%).
   * @param likelihood takes values between [0, 1]
   */
  bool(likelihood?: number): boolean;

  /**
   * Returns one element from an array at random
   */
  pickOne<T>(array: T[]): T;

  /**
   * Returns a new array random picking elements from the original
   * @param array Original array to pick from
   * @param numPicks can be any positive number
   * @param allowDuplicates indicates whether the returned set is allowed duplicates (it does not mean there will always be duplicates
   * just that it is possible)
   */
  pickSet<T>(array: T[], numPicks: number, allowDuplicates?: boolean): T[];

  /**
   * Returns a new array that has its elements shuffled. Using the Fisher/Yates method
   * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
   */
  shuffle<T>(array: T[]): T[];

  /**
   * Generate a list of random integer numbers
   * @param length the length of the final array
   * @param min the minimum integer number to generate inclusive
   * @param max the maximum integer number to generate inclusive
   */
  range(length: number, min: number, max: number): number[];

}
