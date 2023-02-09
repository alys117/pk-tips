const bodyParser=require("body-parser");
 
// 解析以 application/json 和 application/x-www-form-urlencoded 提交的数据
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });
const express=require("express"); 
var app=express();
app.use(jsonParser)
app.use(urlencodedParser)
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};
// app.use(allowCrossDomain); // 可代替 cors 模块
app.all('*', (req, res, next) => {
  // -----跨域请求----- 可用pp.use(allowCrossDomain)代替
  res.header('Access-Control-Allow-Origin', '*'); // res.header('Access-Control-Allow-Origin', req.get('Origin')) // 允许的地址,http://127.0.0.1:9000这样的格式
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since') // 允许跨域请求header携带哪些东西
  res.header('Access-Control-Allow-Credentials','true');
  // -----跨域请求-----
  
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }) 
  res.end("跨域数据")
})

app.listen(8000, function(){
  console.log('启动监听 8000');
});