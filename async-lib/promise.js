let thenable = {
  then: function(resolve, reject) {
    console.log('立即执行then方法');
    setTimeout(() => {
      resolve(42);
    },1000)
  }
}

let p1 = Promise.resolve(thenable); // 立即执行then方法
p1.then(function (value) {
  console.log(value);  // 42
})