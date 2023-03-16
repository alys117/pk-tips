/* 下面是axios使用 https-proxy-agent */
var axios = require('axios')
var HttpsProxyAgent = require('https-proxy-agent')

const httpsAgent = new HttpsProxyAgent(`http://127.0.0.1:7890`); // https代理,如果请求的是http 会自动忽略这个选项
const service = axios.create({
    proxy: false,
    httpsAgent
})

const api_key = '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'
const data = {
    model: 'gpt-3.5-turbo-0301',
    messages:  [{role: 'user', content: '美国有多少人口？'}]
}
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${api_key}`
}
service({
  url: 'https://api.openai.com/v1/chat/completions',
  method: 'post',
  headers,
  data
}).then(res=>{
  console.log(res.data.choices);
})