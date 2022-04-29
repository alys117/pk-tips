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

