 
var promise1 = new Promise((resoleve, reject) => {
  setTimeout(() => {
    reject(new Error("promise1--3000"));
    // resoleve("promise1--3000");
  }, 3000);
});
var promise2 = new Promise((resoleve, reject) => {
  setTimeout(() => {
    // reject(new Error("promise1--1000"))
    resoleve("promise2--1000");
  }, 1000);
});
var promise3 = new Promise((resoleve, reject) => {
  setTimeout(() => {
    resoleve("promise3--5000");
    // reject(new Error("promise1--5000"))
  }, 5000);
});
var promiseArr = [promise1, promise2, promise3];
console.time("promiseArr");
Promise.allSettled(promiseArr)
  .then((res) => {
    console.log("res", res);
    console.timeEnd("promiseArr");
  })
  .catch((err) => console.error(err))
  .finally(() => console.log("finally"));