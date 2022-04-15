var async = require('async')

async.parallel([
  function(cb) { setTimeout(()=>{cb(null,'haha')},1000) }, // 该函数的值不会传给最终callback，但要占个位置
  function(cb) { setTimeout(()=>{cb(null,'heihei')},200) },
  function(cb) { setTimeout(()=>{cb(null,'hehe')},150)  }
], function(err, results) {
  console.log(err,results)
});


const axios = require('axios');

const task = [
    new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve('task resolved')
      },2000)
    })
   ,
    new Promise((resolve,reject)=>{
      setTimeout(()=>{
        reject('task rejected')
      },1000)
    })
]

Promise.allSettled(task).then(function(results) {
  console.log(results,'任务都结束了')
})


const task3 = [
  (async function(cb) {
    const res =await axios({url:'https://api.github.com/users/panke'})
    console.log(res.status,'api返回');
    const res2 = await new Promise((resolve, reject) => {
      setTimeout(resolve, 2000,res.data.avatar_url)
    })
    return res2
  })(),
  (function(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve('task3 resolved')
      },500) 
    })
  })()
]

Promise.allSettled(task3).then(function(results) {
  console.log(results,'任务都结束了')
})

const task4 = [{name:'alice'},{name:'violet'}]
Promise.allSettled(task4).then(function(results) {
  console.log(results,'task4任务都结束了')
})