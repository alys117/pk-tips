const globalTunnel = require('global-tunnel-ng');

globalTunnel.initialize({
  connect: 'neither',
  // protocol: 'https:',
  host: '127.0.0.1',
  port: 7890,
  // proxyAuth: 'userId:password', // optional authentication
  sockets: 50 // optional pool size for each http and https
})

const axios = require('axios')
axios({
  url: 'https://www.google.com',
  // url: 'https://api.github.com/users/panke',
  // url: 'http://192.168.1.34/test.txt',
  method: 'get'
}).then(res => { 
  console.log(res.data)
})
/*
https://www.npmjs.com/package/global-tunnel-ng
全局代理
 */