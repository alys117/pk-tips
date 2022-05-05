function Test1() {
  this.a = 1
}
function Test2() {
  this.a = 2
}
const t = new Test1()
console.log(Test1.prototype.isPrototypeOf(t))
console.log(Test2.prototype.isPrototypeOf(t))

console.log(t.propertyIsEnumerable('a'))

const o = {}
console.log(o.toString())
// 打印结果：[object Object]
const arr = []
console.log(Object.prototype.toString.call(arr))
// 打印结果：[object Array]判断是不是数组

const obj = { a: 1, b: 2 }
const obj2 = { c: 3, d: 4, e: { f: 5, g: 6 } }
const obj3 = Object.assign({}, obj, obj2)
console.log(obj3)
obj3.e.g = 66
console.log(obj3)
console.log(obj2)
//  Object.assign() 是浅复制

const a = {
  b: 1,
  c: function () {},
}
var d = Object.create(a)
console.dir(d)
console.dir(d.__proto__)

Object.defineProperty(o, 'key', {
  value: '1',
  //     如果不指定这些属性描述符，默认都是false
  //     configurable: false,
  //     writable: false,
  //     enumerable: false
})
console.log(o.key, 'o.key') // 1
console.log(delete o.key, 'delete o.key') // false 尝试两种方案删除属性
console.log(Reflect.deleteProperty(o, 'key'), 'Reflect.deleteProperty()') // false
console.log(o.key, 'o.key') // 1 由于不可配置，属性未被删除
console.log(o) // 1 由于不可配置，属性未被删除
for (const key in o) {
  console.log(key) // 不可枚举
}

const obj_3 = { name: 'obj_3', addr: 'Shanghai',d: 'd' }
Object.defineProperties(obj_3, {
  a: { value: 1 },
  b: { value: 2 },
  c: { value: { age: 11 } },
})
console.log(obj_3)


const arr1 = [['attr','a'],['attr2','b'],[3,'c']]
console.log(Object.fromEntries(arr1))
// 打印结果：{ '3': 'c', attr: 'a', attr2: 'b' }
