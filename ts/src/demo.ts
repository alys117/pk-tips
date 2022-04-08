enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName);  // 显示'Green'因为上面代码里它的值是2


// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}

type Maplish = {
  [index: string]: number
}
type M = keyof Maplish
const m:M = 1
const m2:M = "sdfd"
const m3: Maplish = {1:1036}
console.log(m3[1]);