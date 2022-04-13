/*
启动时在 node 后面加上 --inspect-brk  标志，Node.js 将监听调试客户端，默认情况下监听在 127.0.0.1:9229 地址，
也可以显示指定地址 --inspect-brk=_host:port_
注意 node --inspect 与 node --inspect-brk 的区别：--inspect 不会终断，--inspect-brk 在用户代码启动之前会终断，也就是代码在第一行就会暂停执行。

浏览器地址栏输入 chrome://inspect/  或者 about:inspect
Remote Target 下展示了当前运行的 Node.js 版本号，打开 inspect 或 Open dedicated Devtools for Node 链接

1、Resume script execution(F8): 恢复脚本执行，每一次都会自动执行到断点处。
2、Step over next function call(F10)：跳过下一个函数调用，执行当前代码行，在当前代码行的下一行处停止，是一步一步的操作。
3、Step into next function call(F11)：单步进入下一个函数调用。
4、Step out next function call(F11)：单步退出下一个函数调用。
5、Step(F9)：执行当前代码行并在下一行处停止。

原文地址 https://www.imooc.com/article/313777

node --inspect --debug-brk 使用chrome调试.js
*/

const treeData = [
  {
    title: '1',
    key: '1',
    children: [
      {
        title: '1-1', key: '1-1',
        children: [
          { title: '1-1-1', key: '1-1-1', },
          { title: '1-1-2', key: '1-1-2', },
        ],
      },
      { title: '1-2', key: '1-2', },
      { title: '1-3', key: '1-3', },
      { title: '1-4', key: '1-4', },
    ],
  },
  { title: '2', key: '2', },
]
let level = 0
function f(arr, selectedKey) {
  return arr
    .filter((item) => item.key !== selectedKey)
    .map((item) => {
      item = Object.assign({ level: level++ }, item)
      if (item.children) {
        item.children = f(item.children, selectedKey)
      }
      return item
    })
}
console.log(f(treeData, '1-2'))
console.log('end')

/*
判断是否为闰年
 */
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}
/*
判断邮箱地址
 */
function isEmail(email) {
  let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  return reg.test(email)
}
/*
计算阶乘
显示caller和callee
*/
function factorial(n) {   // 阶乘
  if (n === 1) {
    return 1
  }
  console.log(factorial.caller);
  return n * arguments.callee(n - 1)
}
function caller(params) {
  factorial(6)
}
caller()

const {nanoid} = require('nanoid')
console.log(nanoid());
console.log(nanoid());
console.log(nanoid());
console.log(nanoid());

/*这是要提交的内容*/
