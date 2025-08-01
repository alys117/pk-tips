const p1 = Promise.resolve(1)
async function test() {
  return p1
}

const p2 = test()
console.log(p1);
console.log(p2);

console.log(p1 === p2); // false

// 状态吸收题目
async function async1() {
  console.log(1);
  await async2();
  console.log('aaa');
}

async function async2() {
  return Promise.resolve(2)
}

// function async2() {
//   return Promise.resolve(2)
// }

async1()

Promise.resolve()
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  }).then(() => {
    console.log(5);
  })