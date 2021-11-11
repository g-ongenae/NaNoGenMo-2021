/**
 * Wait and returns a result but in async/await format
 * @param timeOut the number of milliseconds to wait
 * @param res the result to return after the wait
 * @returns anything you want
 */
const wait = <T>(timeOut: 1000, res: T): Promise<T> =>
  new Promise((resolve: (res: T) => void): void => {
    setTimeout(() => resolve(res), timeOut);
  });

/**
 * Wait for one seconds and returns true
 */
export const waitTrue = async (): Promise<boolean> => wait(1000, true);
