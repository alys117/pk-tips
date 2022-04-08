const memoize = require('./memoize.js');
const log = console.log;
 
// 斐波那契数组
const fibonacci = (n) => {
    return n < 2 
        ? n
        : fibonacci(n - 1) + fibonacci(n - 2);
};
 
const memoizeFibonacci = memoize(fibonacci);
 
log(memoizeFibonacci(40));   // 新值，执行中...;    102334155  // 等待时间比较长
log(memoizeFibonacci(40));   // 来自缓存，这里缓存来自[[Scopes]]中;    102334155
