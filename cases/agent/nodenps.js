let request = require('request');
let util = require('util');

request({
    method: 'get',
    url: 'https://www.google.com/',
    proxy:util.format('http://%s:%d', '127.0.0.1', '7890'), // clash for windows
    forever: true// 长链接
}, (err, res) => {
    console.log(res)
    console.log(err)
});

request({
    method: 'get',
    url: 'http://192.168.0.249',
    proxy:util.format('http://%s:%d', '127.0.0.1', '8888'), // fiddler https失败
    forever: true// 长链接
}, (err, res) => {
    console.log(res.body)
    console.log(err)
});