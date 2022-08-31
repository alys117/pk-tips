const http = require('http')
const fs = require('fs')
const url = require('url')
let server = http.createServer(function (req, res) {
  const pathname = url.parse(req.url).pathname
  console.log(req.url, pathname)
  res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' })
 if (req.url.indexOf('/jsonp') > -1) {
    res.end(`myfunc({a:122,b:'jsonp的数据'})`)
  } else {
    readFile(__dirname + pathname).then((data) => {
      res.write(data, 'binary')
      res.end()
    }).catch(e =>{
      res.end('404, not found')
    })
  }
})
server.listen(9632, '0.0.0.0', () => {
  console.log('服务器9632开启成功')
})

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'binary', (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(data)
    })
  })
}