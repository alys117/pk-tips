const obj ={
  name: 'xiaoming',
  age: 13,
  'self-defination': 'hello' //用引号包裹不符合js变量命名规则的的属性名称，但是无法用.符合访问属性。
}
console.log(obj); 
console.log(obj['self-defination']); 

const jsonStr = '{"name": "xiaoming", "age": 13, "self-defination": "hello"}'
const josnObj = JSON.parse(jsonStr)
console.log(josnObj);
for (const key in josnObj) {
  console.log(key, josnObj[key])
}
// for (const iterator of josnObj) { // 报错，对象没有实现iterator接口
//   console.log(iterator)
// }
Object.keys(josnObj).forEach(key => {
  console.log(key, josnObj[key])
})
Object.values(josnObj).forEach(value => {
  console.log(value)
})
console.log('------------');
const key = Object.getOwnPropertyNames(obj)
console.log(key);
console.log('============');
console.log(Object.entries(obj));
Object.entries(obj).forEach(([key, value]) => {
  console.log(key, value)
})