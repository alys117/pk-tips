function walking(obj) {
  console.log(`${obj} is running`)
}

walking('james')

const runner = {
  name: 'jake',
  running(pet) {
    console.log(`${this.name} is running with ${pet}`)
  },
}
runner.running('jerry')
console.log('-----------------')
Function.prototype.before = function () {
  console.log(arguments,'before的arguments');
  var self = this // 保存被拦截函数的this
  return function () {
    console.log(arguments, '代理函数的arguments')
    setTimeout(()=>{
      var agent = self.apply(this, arguments) // 返回代理函数
      return agent
    }, 1000)
  }
}
walking.before()('jordan')
runner.running.bind(runner).before('before...')('tom')
