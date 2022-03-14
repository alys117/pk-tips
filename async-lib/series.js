var async = require('async')
console.time('test');

async.series({
  one: function(callback) {
      setTimeout(function() {
          callback(null, 1);
      }, 2000);
  },
  two: function(callback){
      setTimeout(function() {
          callback(null, 2);
      }, 1000);
  }
}, function(err, results) {
  console.log(results);
  console.timeEnd('test');
});

console.time('test2');
async.series([
  function(callback) {
    setTimeout(function() {
      callback(null, 1);
    }, 2000);
  },  
  function(callback) {
    setTimeout(function() {
        callback(null, 2);
    }, 1000);
  }
],
// optional callback
function(err, results) {
  console.log(results);
  console.timeEnd('test2');
});