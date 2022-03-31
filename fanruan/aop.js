//Aop构造器
function Aop(options) {
  this.options = options
}
//业务方法执行前钩子
Aop.prototype.before = function (cb) {
  cb.apply(this)
}
//业务方法执行后钩子
Aop.prototype.after = function (cb) {
  cb.apply(this)
}
//业务方法执行器
Aop.prototype.execute = async function (beforeCb, runner, afterCb) {
  this.before(beforeCb)

  const r = await new Promise((resolve, reject) => {
    console.log('执行中');
    setTimeout(() => {
      console.log(arguments);
      runner.apply(this, arguments)
      resolve('执行成功')
    }, 1000)
  })
  console.log(r);
  this.after(afterCb)
}

var aop = new Aop({
  afterInfo: '执行后',
  runnerInfo: '执行中',
  beforeInfo: '执行前',
})

var beforeCb = function () {
  console.log(this.options.beforeInfo)
}
var afterCb = function () {
  console.log(this.options.afterInfo)
}
var runnerCb = function () {
  console.log(this.options.runnerInfo)
}
function work(p1,p2) {
  console.log(arguments);
  console.log(this.name + ' working ... ',p1,p2)
}
obj = { name: 'kyo' }
aop.execute(beforeCb, work.bind(obj, '123','456'), afterCb)
