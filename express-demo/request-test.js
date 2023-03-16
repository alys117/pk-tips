const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // 处理Content-Type为application/json
app.use(bodyParser.text()) // 处理Content-Type是text/plain
app.use(bodyParser.urlencoded({ extended: false })) // 处理Content-Type为application/x-www-form-urlencoded，如果req头信息里面没明确content-type：这也是默认的处理方式，所以这个是一定要配置的。

// curl -X POST -d "bodydatakey=bodydatavalue" "http://localhost:8083/process_post/aa/77?first_name=ke&last_name=pan"
app.post('/receive', function (req, res) {
  console.log(' body类型(typeof req.body): ', typeof req.body)
  console.log('-----req.params-----', req.params)
  console.log('-----req.query------', req.query)
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }) //设置response编码为utf-8
  // 此种解析 你无法保证所有的人都在请求头里面加了 Content-Type
  if (typeof req.body === 'object') {
    console.log('----------------')
    console.log(req.body)
    Object.keys(req.body).forEach((key) => {
      console.log(key, 'key', req.body[key], 'req.body[key]')
    })
    console.log('----------------')
    res.end(JSON.stringify({ msg: 'object', code: 200 }))
  } else {
    console.log(typeof req.body, 'typeof req.body')
    console.log(req.body, ' else')
    res.end(JSON.stringify({ msg: 'string', code: 200 }))
  }
})
app.get('/*', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  console.log('get请求'+req.uri, req.body)
  res.end(JSON.stringify({ msg: '8083', code: 200 }))
})

const app2 = express()
// 不使用bodyparser
app2.post('/receive', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }) //设置response编码为utf-8
  console.log('不使用bodyparser，req里没有body属性: ', req.body)
  let plain = ''
  req.on('data', function (chunk) {
    plain += chunk
  })
  req.on('end', function () {
    console.log('------req.body拼接方式------')
    console.log(plain)
    // 读取参数流结束后将转化的body字符串解析成 JSON 格式
    try {
      const res = JSON.parse(plain)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
    res.end(JSON.stringify({ msg: 'ok', code: 200 }))
  })
})

app2.post(
  '/receive/api/1',
  bodyParser.json(),
  bodyParser.text(),
  bodyParser.urlencoded(),
  function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }) //设置response编码为utf-8
    console.log('post请求/receive2', req.body)
    res.end(JSON.stringify({ msg: 'ok', code: 200 }))
  }
)
app2.post(
  '/web/*',
  bodyParser.json(),
  bodyParser.text(),
  bodyParser.urlencoded(),
  function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }) //设置response编码为utf-8
    console.log('post请求/receive2', req.body)
    
    res.end(JSON.stringify({ msg: 'ok', code: 200 }))
  }
)

app2.post(
  '/api/receive',
  bodyParser.text({ type: function(req){
    return true // 不管你的请求头里面有没有Content-Type，都用text解析器解析
  } }),
  function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
    console.log('post请求/api/receive body：', req.body)
    res.end(JSON.stringify({ msg: '请求都按照text解析', code: 200 }))
  }
)

app2.post('/api/raw', bodyParser.raw({ 
  type: '*/*' // 不管你的请求头content-type(但是必须有content-type头)，都用raw解析器解析
}), function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  console.log('post请求/api/raw', req.body)
  console.log(req.body.toString())
  res.end(JSON.stringify({ msg: '请求body按照raw解析', code: 200 }))
})
app2.get('/*', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  console.log('get请求/receive2', req.body)
  res.end(JSON.stringify({ msg: 'ok', code: 200 }))
})

app2.get('/receive2', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  console.log('get请求/receive2', req.body)
  res.end(JSON.stringify({ msg: 'ok', code: 200 }))
})
/* ---------模拟 vue-admin-template登录------------------ */
/* ----------------------------------------------------- */
app2.post('/api/user/login', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  console.log('post请求/api/user/login', req.body)
  res.end(JSON.stringify({ data: {token: 'admin-token', tip: 'pan'}, code: 20000 }))
})
app2.get('/api/user/info', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  console.log('get请求/api/user/info', req.body)
  res.end('{"code":20000,"data":{"roles":["admin"],"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}')
})
app2.post('/api/user/logout', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  console.log('post请求/api/user/logout', req.body)
  res.end(JSON.stringify({ data: 'success', code: 20000 }))
})
app2.post('/api/test', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  console.log('post请求/api/test', req.body)
  res.end(JSON.stringify({ data: "123", code: 20000 }))
})
app2.get('/vue-admin-template/table/list', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  console.log('get请求/api/test', req.body)
  res.end(JSON.stringify({ data: "456", code: 20000 }))
})
/* ----------------------------------------------------- */
/* ---------模拟 vue-admin-template登录 end-------------- */

const typeis = require('type-is')
const app3 = express()
app3.use(bodyParser.json({ type: function(req) {
  if (undefined === req.headers['content-type']) {
    // cleos POST data without content-type
    return true
  } else {
    return Boolean(typeis(req, 'application/json'))
  }
}}))
app3.post(
  '/api/receive',
  function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
    console.log('post请求/api/receive body：', req.body)
    res.end(JSON.stringify({ msg: 'app3 8085', code: 200 }))
  }
)

const server_8083 = app.listen(8083, function () {
  const host = server_8083.address().address
  const port = server_8083.address().port
  console.log('应用访问地址为 http://%s:%s', host, port)
})

const server_8084 = app2.listen(8084, function () {
  const host = server_8084.address().address
  const port = server_8084.address().port
  console.log('应用访问地址为 http://%s:%s', host, port)
})

const server_8085 = app3.listen(8085, function () {
  const host = server_8085.address().address
  const port = server_8085.address().port
  console.log('应用访问地址为 http://%s:%s', host, port)
})
