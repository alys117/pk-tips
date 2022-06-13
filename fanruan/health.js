const axios = require('axios')

axios({
  url: 'http://192.168.0.103/status/json',
  method: 'get'
}).then(res =>{
  console.log(res.data);
  const nodes = res.data.servers.http
  console.log(nodes);
})