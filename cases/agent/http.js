const globalTunnel = require('global-tunnel-ng')

globalTunnel.initialize({
  connect: 'neither',
  // protocol: 'https:',
  host: '127.0.0.1',
  port: 8888,
  // proxyAuth: 'userId:password', // optional authentication
  sockets: 50, // optional pool size for each http and https
})

const http = require('http')

const postData = JSON.stringify({
  'msg': 'Hello World!'
})
var options = {
  hostname: 'localhost',
  port: 8084,
  path: '/api/raw',
  method: 'POST',
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Content-Length': Buffer.byteLength(postData)
  // }
}

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  })
  res.on('end', () => {
    console.log('No more data in response.')
  })
})

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`)
})

// 将数据写入请求正文
req.write(postData)
req.end()
