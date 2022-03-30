var async = require('async')

async.parallel([
  function(cb) { setTimeout(()=>{cb(null,'haha')},2000) }, // 该函数的值不会传给最终callback，但要占个位置
  function(cb) { setTimeout(()=>{cb(null,'heihei')},200) },
  function(cb) { setTimeout(()=>{cb(null,'hehe')},150)  }
], function(err, results) {
  console.log(err,results)
});