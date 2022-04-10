/* 这是官方给出的https-proxy-agent示例 */
var url = require('url');
var https = require('https');
var HttpsProxyAgent = require('https-proxy-agent');

// HTTP/HTTPS proxy to connect to
var proxy = process.env.http_proxy || 'http://127.0.0.1:7890';
console.log('using proxy server %j', proxy);

// HTTPS endpoint for the proxy to connect to
var endpoint = process.argv[2] || 'https://graph.facebook.com/tootallnate';
console.log('attempting to GET %j', endpoint);
var options = url.parse(endpoint);

// create an instance of the `HttpsProxyAgent` class with the proxy server information
var agent = new HttpsProxyAgent(proxy);
options.agent = agent;

https.get(options, function (res) {
  console.log('"response" event!', res.headers);
  res.pipe(process.stdout);
});

/* 下面是axios使用 https-proxy-agent */
var axios = require('axios');
const httpsAgent = new HttpsProxyAgent(`http://127.0.0.1:7890`);
const service = axios.create({
    proxy:false,
    httpsAgent
})
service.get('https://www.google.com/').then(res=>{
    console.log(res)
})