let request = require('request');
let util = require('util');
request({
    method: 'get',
    url: 'https://www.google.com/',
    proxy:util.format('http://%s:%d', '127.0.0.1', '7890'),
    forever: true// 长链接
}, (err, res) => {
    console.log(res)
    console.log(err)
});