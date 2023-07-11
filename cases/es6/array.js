let obj = {
  name: 'obj',
  age: 19,
  dept: 'engenering',
}

let obj2 = { ...obj }

console.log(obj2)

// for (const iterator of obj) {


//   console.log(iterator)
// }


let obj1 = {
  attri1: [6, 6, 0],
  attri2: 4,
  attri4: 5
}
let obj3 = { ...obj1 }
let obj4 = Object.assign({}, obj1)
console.log(obj3);

obj3.attri1[0] = 1111
obj4.attri1[1] = 2222
obj3.attri2 = 4444
console.log(obj3, obj1, obj4);



let obj5 = {
  attri1: [6, 6, 0],
  name: 'simon',
  [Symbol.for('obj5')]: 'simon'
}
Object.defineProperty(obj5, 'attri2', {
  value: 4,
  enumerable: true, // 是否可枚举
  writable: false // 是否可写
})

console.log(JSON.stringify(obj5))



// 控制移动
function mobile(list, i, num) {
    /*
		list.splice(i + num, 1)[0]  把移除的这个元素重新添加到指定位置
    */
    list.splice(i, 0, list.splice(i + num, 1)[0]);
}
// - list 是送过来的数组
// - i 为下标
// - num  就是用来控制移动的  值为：1和-1
const a = [1,2,3,4,5,6,7,8,9,10]
a.splice(0, 0, ...a.splice(-4, 4))
console.log(a)

console.log([1,2,3,4,5,6,7,8,9].slice(4,5));


// js 数组生成并塞入1~30

const arr30 = Array.from({ length: 30 }, (_, i) => 1 + (i)) // 1-30
console.log('arr30 :>> ', arr30);

const arr99 = Array(100).toString().split(',').map((item,index)=>index)     //0-99 
console.log('arr99 :>> ', arr99);


// 找出数组中最后一个不为undefined的元素的函数
function findLastIndex(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] !== undefined) {
      return i;
    }
  }
  return -1;
}
console.log(findLastIndex([1, 2, 3, , undefined, undefined, undefined, 2, undefined, undefined, undefined]));
const dayjs = require('dayjs')
console.log(dayjs('2022-06-01').add(-1,'day').format('YYYY-MM-DD HH:mm:ss'));

console.log(dayjs('2019-01-25 12:23:54.786').valueOf()); // 1548381600000