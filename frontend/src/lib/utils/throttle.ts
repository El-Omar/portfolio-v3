// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (...args: any[]) => any;

export default function throttle<T extends Func>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let lastCall = 0;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = Date.now();

    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}
