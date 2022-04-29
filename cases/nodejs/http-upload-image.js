const http = require('http')
const fs = require('fs')
const qs = require('querystring')
const server = http.createServer((req, res) => {
  if (req.url === '/upload') {
    if (req.method === 'POST') {
      req.setEncoding('binary')
      let body = ''
      const boundary = req.headers['content-type']
        .split(';')[1]
        .replace(' boundary=', '')
      // console.log(boundary)
      req.on('data', (data) => {
        body += data
      })
      // 监听写入结束
      req.on('end', () => {
        console.log(body);
        const payload = qs.parse(body, '\r\n', ': ')
        console.log(payload);
        const type = payload['Content-Type']
        const typeIndex = body.indexOf(type) // 拿到image/jpeg的索引位置
        const typeLength = type.length // 拿到image/jpeg这个字符串的长度
        let imageData = body.substring(typeIndex + typeLength)
        // 3. 将image/jpeg后面的两个空格去掉
        // imageData = imageData.replace('\r\n\r\n', '')
        imageData = imageData.replace(/^\s\s*/, '')
        // 4. 将最后的boundary去除掉
        imageData = imageData.substring(0, imageData.indexOf(`--${boundary}--`))
        fs.writeFile('./static/a1.json', imageData, { encoding: 'binary' }, (err) => {
          res.end('文件上传成功~')
        })
        console.log('文件上传成功')    
        res.end (JSON.stringify({msg: "文件上传成功"}))
      })
    }
  }
})
server.listen(8000, '0.0.0.0', () => {
  console.log('文件上传服务器开启成功')
})
