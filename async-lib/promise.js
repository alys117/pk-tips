setTimeout(() => {console.log('setTimeout')},0); // 最后执行

let thenable = {
  then: function(resolve, reject) {
    console.log('立即执行then方法'); // 第二个输出
    resolve(42);
    // setTimeout(() => { resolve(42) },2000)
  }
}
let p1 = Promise.resolve(thenable); // 立即执行thenable的then方法, 不需要调用p1.then(),但是却是在本轮事件循环结束后才执行
p1.then(function (value) {
  console.log(value);  // 第三个输出
})


const arr = []
for(let i=0;i<1000000;i++){
  arr.push(new Uint8Array(1000))
  if(arr.length === 1000000){
    console.log(arr.length) //最先输出
  }
}
/** 执行结果
  1000000
  立即执行then方法
  42
  setTimeout 
*/