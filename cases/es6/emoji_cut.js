const str = '这是个不常用汉字-𪞙emoji😎表情------'
String.prototype.slicePoint = function (pStart, pEnd) {
  // 根据码点切割字符串
  let cIndex = 0 // 码元索引
  let pIndex = 0 // 码点索引
  let result = ''
  while (1) {
    if (pIndex >= pEnd || cIndex >= this.length) break
    const point = this.codePointAt(cIndex)
    if(pIndex >= pStart) result += String.fromCodePoint(point)
    cIndex += point > 0xffff ? 2 : 1
    pIndex++
  }
  return result
}

console.log(str.slicePoint(7, 19));
console.log(str.slice(7, 19));