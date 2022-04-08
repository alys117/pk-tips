const memoize = (fn: Function) => {
  const cache = new Map();
  return (...args: any[]) => {
    const n = args[0];
    if (cache.has(n)) {
      return cache.get(n);
    }
    const result = fn(n);
    cache.set(n, result);
    return result;
  };
}

/* 斐波那契 */
// Language: typescript
function fibonacci(n: number): number {
  if (n <= 1) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
const fibonacciMemoized = memoize(fibonacci);
console.log(fibonacciMemoized(40));
console.log(fibonacciMemoized(40));