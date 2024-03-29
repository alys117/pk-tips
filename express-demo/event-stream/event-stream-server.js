const bodyParser = require("body-parser");

// 解析以 application/json 和 application/x-www-form-urlencoded 提交的数据
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var cookieParser = require('cookie-parser');

const express = require("express");
var app = express();
app.use(jsonParser)
app.use(bodyParser.text()) // 处理Content-Type是text/plain
app.use(urlencodedParser)
app.use(cookieParser());
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};


app.use(allowCrossDomain); // 可代替 cors 模块
app.all('*', (req, res) => {
  console.log('start...');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  let allData = ''
  // 模拟发送事件
  const interval = setInterval(() => {
    const data = `data: ${new Date().toISOString()}\n`;
    res.write(data);
    console.log(data);
    allData += data
    if(allData.length > 200) {
      clearInterval(interval);
      res.end();
    }
  }, 400);
 
  // 当客户端断开连接时清理资源
  req.on('close', () => {
    console.log('client dropped me');
    clearInterval(interval);
  });
});

app.listen(8000, function () {
  console.log('启动监听 8000');
});

// https://blog.csdn.net/Ed7zgeE9X/article/details/124310751
// curl -X POST  http://localhost:8000 -H 'Content-Type: text/plain' -d 'Hello, plain!'
// curl -X POST  http://localhost:8000 -H 'Content-Type: application/json' -d '{"msg":"hello, json!"}'
// curl -X POST  http://localhost:8000 -H 'Content-Type: application/x-www-form-urlencoded' -d 'msg=hello, x-www-form-urlencoded!'