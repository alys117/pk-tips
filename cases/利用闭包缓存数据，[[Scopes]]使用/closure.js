function f(){
  let value = Math.random()
  console.log(value)
  debugger
  return function(){
    console.log(value)
  }
}

let arr = [f(), f(), f()]

arr[0]()
arr[0]()
arr[1]()
arr[1]()

function makeArmy() {
  let shooters = [];
  let i = 0;
  while (i < 10) {
    let j = i
    let shooter = function() { // 一个闭包
      console.log(j);
    };
    shooters.push(shooter);
    i++;
  }
  return shooters;
}
let army = makeArmy()
army[2]()
army[5]()