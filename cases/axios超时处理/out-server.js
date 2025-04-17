const path = require('path')
const xml2js = require('xml2js');
const dayjs = require('dayjs');
const parser = new xml2js.Parser({ explicitArray: false });
const builder = new xml2js.Builder({ renderOpts: { pretty: true } });
const express = require('express')
const bodyParser = require('body-parser')
const app4 = express()
// 将请求体中的 xml 解析为字符串。
app4.use(bodyParser.text({ type: 'text/xml' }));  //app.use(bodyParser.text()) // 处理Content-Type是text/plain
app4.use(bodyParser.json()) // 处理Content-Type为application/json
app4.use(bodyParser.urlencoded({ extended: false }))

app4.all('/*', function (req, res) {
  console.log('req.url', req.url)
  console.log('req.body', req.body)
  console.log('req.query', req.query)
  setTimeout(() => {
    console.log('setTimeout')
    res.end(`{"a":1}`)
  }, 10000)
})
const server_80 = app4.listen(8077, function () {
  const host = server_80.address().address
  const port = server_80.address().port
  console.log('应用访问地址为 http://%s:%s', host, port)
})