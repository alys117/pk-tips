const a = require('./1.json')
const a2 = require('./2.json')
function sortAsc(jsonObj) {
  const sortObj = {};
   Object.keys(jsonObj).sort().forEach(function(key) {
   sortObj[key] = jsonObj[key];
  });
  return sortObj
 }
console.log('1:>> ', JSON.stringify(sortAsc(a.devDependencies),null,2) );
console.log('2:>> ', JSON.stringify(sortAsc(a2.devDependencies),null,2) );

function customSort(arr) {
  // 定义一个新数组来存储排序后的结果
  let sortedArr = [];
  const mid = arr.length % 2 === 0 ? (arr.length / 2 + 1) : (arr.length + 1) / 2
  if (arr.length % 2 === 0) {
    for (let i = 0; i < mid - 1; i++) {
      sortedArr.push(i + 1);
      sortedArr.push(mid + i);
    }
  }else{
    for (let i = 0; i < mid - 1; i++) {
      sortedArr.push(i + 1);
      sortedArr.push(mid + i + 1);
    }
    sortedArr.push(mid);
  }
  return sortedArr;
}

// 使用示例
const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const sortedArray = customSort(originalArray);
console.log(sortedArray); // 输出: [1, 6, 2, 7, 3, 8, 4, 9, 5, 10]