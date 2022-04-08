let request = require('request');
const { HttpProxyAgent,HttpsProxyAgent } = require('hpagent');
let util = require('util');
let proxy = util.format('http://%s:%d', '127.0.0.1', '7890');
let agent_http=new HttpProxyAgent({
    keepAlive: true,// 配置这个长链接
    keepAliveMsecs: 5000,
    maxSockets: 256,
    maxFreeSockets: 256,
    scheduling: 'lifo',
    proxy
})
let agent_https=new HttpsProxyAgent({
    keepAlive: true,
    keepAliveMsecs: 5000,
    maxSockets: 256,
    maxFreeSockets: 256,
    scheduling: 'lifo',
    proxy
})
request({
    method: 'get',
    url: 'https://www.google.com/',
    agent:agent_https  // https接口用 agent_https
}, (error, response, body) => {
    console.log(body)
});