function run(){
  console.log(this);
}

// run()
const obj = {
  name: 'tom',
  work(coworker){
    console.log(`${this.name} is work on cooking with ${coworker}`);
  }
}
// obj.work()
Function.prototype.before = function(){
  console.log(this);
  console.log(arguments);
  console.log(arguments.callee)
  return this
}
obj.work.bind(obj).before('before ...')('dddd')