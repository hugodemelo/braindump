/**
 * You can use inline user defined type guards to avoid unnecessary casts.
 * Type refinement is limited to a scope, which means that the refined type isn't carried over
 * to another scope.
 * The way to carry over refined type to another scope is to use 'user-defined type guards'.
 *
 * Suppose you have a mixed array and you want to apply a mapping function only to elements
 * of type number.
 */
const mixedArray: unknown[] = [1, true, "hello", {}, 4, () => { }, 56, 12];

/**
 * Without cast and carry over.
 */
mixedArray
  .filter(value => typeof value === 'number')
  .map(num => num * 10) // error: Object is of type 'unknown'

/**
 * With explicit cast.
 */
mixedArray
  .filter(value => typeof value === 'number')
  .map(num => (num as number) * 10)

/**
 * With inline user defined type guard.
 */
mixedArray
  .filter((value: unknown): value is number => typeof value === 'number')
  .map(num => num * 10)
