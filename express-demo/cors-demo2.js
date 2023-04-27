const bodyParser=require("body-parser");
 
// 解析以 application/json 和 application/x-www-form-urlencoded 提交的数据
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var cookieParser = require('cookie-parser');

const express=require("express"); 
var app=express();
app.use(jsonParser)
app.use(urlencodedParser)
app.use(cookieParser());
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};

app.all('/set-cookie', (req, res, next) => {
  res.cookie("user", "jay", { maxAge: 2000000, httpOnly: true });
  if( req.headers.origin == 'http://192.168.0.113:5502' || req.headers.origin == 'http://localhost:5502' || req.headers.origin == 'http://127.0.0.1:5502' ){ 
    res.header('Access-Control-Allow-Origin', req.headers.origin); 
  }
  // res.header('Access-Control-Allow-Origin', req.get('Origin')) // 允许的地址,http://127.0.0.1:9000这样的格式
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since, X-Token') // 允许跨域请求header携带哪些东西
  // res.header('Access-Control-Allow-Headers', '*') // 有兼容问题,在IE下使用自定义header会报错，必须指定允许的header，例如上面的X-Token
  res.header('Access-Control-Allow-Credentials','true');
  // -----跨域请求-----
  
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })   
  res.end("set-cookie")
})

// app.use(allowCrossDomain); // 可代替 cors 模块
app.all('*', (req, res, next) => {
  console.log(req.headers);
  console.log(req.cookies);
  // -----跨域请求----- 可用pp.use(allowCrossDomain)代替
  res.header('Access-Control-Allow-Origin', req.get('Origin')) // 允许的地址,http://127.0.0.1:9000这样的格式
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since, X-Token') // 允许跨域请求header携带哪些东西
  // res.header('Access-Control-Allow-Headers', '*') // 有兼容问题,在IE下使用自定义header会报错，必须指定允许的header，例如上面的X-Token
  res.header('Access-Control-Allow-Credentials','true');
  // -----跨域请求-----
  
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })   
  res.end("跨域数据")
})
app.listen(8000, function(){
  console.log('启动监听 8000');
});

// https://blog.csdn.net/Ed7zgeE9X/article/details/124310751