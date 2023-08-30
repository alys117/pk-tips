const p1 = new Promise((resolve, reject) => {
  setTimeout(() => reject('hello'), 100)
})
.then(result => result);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result);

//Promise.all必须是都成功才会走then，否则catch会捕获第一个报错的promise实例
Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// Error: 报错了