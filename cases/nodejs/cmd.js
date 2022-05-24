// var cmd = 'tasklist'
const cmd = 'copy webpack.config.js aaaa.js'
const cmd2 = 'd:/tools/sox-14.4.2/sox.exe  --version'
//获取 子进程模块的exec方法,用于执行cmd命令
var exec = require('child_process').exec
const fs = require('fs')

//运行 定义的cmd命令
exec(cmd2, function (err, stdout, stderr) {
  if (err) {
    return console.log(err)
  } else {
    console.log(stdout)
    // const content = fs.readFileSync('./aaaa.js','utf-8')
    // console.log(content);
  }
})
