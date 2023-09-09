const obj = {
  name: 'obj',
  age: 19,
  [Symbol.for('name')]: 'simon',
}
console.log(obj[Symbol.for('name')])

console.log(Symbol.for('name').description, 'decription')
Object.defineProperty(obj, 'hobby', {
  value: 'coding',
  enumerable: false, // 是否可枚举
  writable: false // 是否可写
})
obj.hobby = 'reading'

for (const key in obj) {
  console.log(key, obj[key], 'in 遍历') // symbol不会被遍历
}
Object.getOwnPropertyNames(obj).forEach(key => { 
  console.log(key, obj[key]) // symbol不会被遍历
})

let clone = Object.assign({}, obj)

console.log(clone); // cloned带有



const myIterable = {a:1,b:'2uui',[Symbol('$c')]:3};
console.log(Object.getOwnPropertyNames(myIterable));
console.log(Object.getOwnPropertySymbols(myIterable));
