const http = require('http')
const fs = require('fs')
var url = require('url')
var path = require('path')

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname
  console.log('pathname::', `.${pathname}`)
  const q = url.parse(decodeURI(req.url), true).query //解析参数为id的值
  console.log('query q::', q)
  fs.readFile(`.${pathname}`, function (isErr, data) {
    if (isErr) {
      res.end('Read file failed!')
      return
    }
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件
      'Content-Disposition': 'attachment; filename=' + path.basename(pathname), //告诉浏览器这是一个需要下载的文件
    })
    res.end(data)
  })
})
server.listen(8000, '0.0.0.0', () => {
  console.log('服务器开启成功')
})
// 下载命令：C:\Users\drunk\Desktop>curl -o a.png "http://127.0.0.1:8000/static/img/mvc_logo.png?q=989&dada=haha"