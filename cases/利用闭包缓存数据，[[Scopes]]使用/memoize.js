const memoize = function(fn) {
  const cache = {};
  console.log(cache, '初始缓存')

  return function() {
      const key = JSON.stringify(arguments);
      var value = cache[key];
      if(!value) {
          console.log('新值，执行中...');         // 为了了解过程加入的log，正式场合应该去掉
          value = [fn.apply(this, arguments)];  // 放在一个数组中，方便应对undefined，null等异常情况
          cache[key] = value;
      } else {
          console.log('来自缓存');               // 为了了解过程加入的log，正式场合应该去掉
      }
      console.log(cache, '缓存');               // 为了了解过程加入的log，正式场合应该去掉
      return value[0];
  }
}

module.exports = memoize;