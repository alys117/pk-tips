const a = {
  name: 'John',
  age: 18
}

const b = new Proxy(a, {
  get: function (target, prop, receiver) {
    console.log(`getting ${prop}`)
    return Reflect.get(target, prop, receiver)
  },
  set: function (target, prop, value, receiver) {
    console.log(`setting ${prop} to ${value}`)
    return Reflect.set(target, prop, value, receiver)
  }
})



Object.assign(b, { name: 'timmy', habby: 'playing cards' })

console.log(a);

const arr = Array.from({ length: 50 * 1000 / 100 })
const n = arr.length / 100
console.log(n);

console.log('------------');
const bb =[]
const aa = [0.5, 0.2, 0.1, 0.2].reduce((acc, cur) => {
  bb.push(acc)
  return acc + cur
}, 0)

console.log(aa, '-', bb);

const process = [{content: 'picking tables', timeConsuming: 35}]
function chuck() {
  const arr = []
  for (const pr of process) {
    const arrIncrease = Array.from({ length: 55 * 1000 / 200 }, (v, k) => 0)
    arr.push(...arrIncrease)
  }
  return 100 / arr.length
}

console.log(chuck()*274 + chuck());

// 修改 思路 前后不一致
// 改数据图形不变，生产环境存在


function replaceUrlParam(url, paramName, paramValue) {
  // 正则表达式匹配参数
  var pattern = new RegExp('(' + paramName + '=).*?(&|$)');
  // 如果URL中已存在该参数，则替换其值，否则添加该参数
  if (url.search(pattern) >= 0) {
      return url.replace(pattern, '$1' + paramValue + '$2');
  } else {
      // 如果参数已存在，则不添加&
      var pos = url.indexOf('?');
      if (pos > 0) {
          return url + '&' + paramName + '=' + paramValue;
      } else {
          return url + '?' + paramName + '=' + paramValue;
      }
  }
}

// 示例使用
var originalUrl = 'http://example.com/?12336=_erer123YYY&bar=456';
var newUrl = replaceUrlParam(originalUrl, 'token', '7_drebhg89');
console.log(newUrl); // 输出: http://example.com/?foo=789&bar=456
