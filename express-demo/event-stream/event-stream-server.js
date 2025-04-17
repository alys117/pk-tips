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
  // res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  let allData = '##### 项目硬件需求\n' +
  '| 配置 | 数量 | 用途 |\n' +  
  '| --- | --- | --- |\n' +
  '| 4核16G\\|100G | 1 | 负载均衡服务器：nginx分发 |\n' +
  '| 4核16G\\|100G | 1 | 缓存服务器：内存服务redis |\n'+
  '#### 使用反引号定义代码块，并定义高亮\n'+
  '```java\n'+
  'pubic static void main(String[] args) {\n'+
  '  System.out.println("Hello world");\n'+
  '}\n'+
  '```\n'

  let arr = allData.split('');
  let line = ''
  // 模拟发送事件
  const interval = setInterval(() => {
    const charactor = arr.shift(1)
    if(charactor === '\n') {
      console.log(line);
      line = ''
    } else {
      line += charactor
    }
    res.write(charactor);
    if(arr.length === 0) {
      clearInterval(interval);
      res.end();
    }
  }, 20);
 
  // 当客户端断开连接时清理资源
  req.on('close', () => {
    console.log('client dropped me');
    clearInterval(interval);
  });
});

app.listen(8000, function () {
  console.log('启动监听 8000');
});