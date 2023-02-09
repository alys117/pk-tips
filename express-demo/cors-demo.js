const bodyParser=require("body-parser");
const cors = require('cors')
 
// 解析以 application/json 和 application/x-www-form-urlencoded 提交的数据
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });
const express=require("express"); 
var app=express();
app.use(jsonParser)
app.use(urlencodedParser)

app.options('/cross/:name/:age', cors())
app.post('/cross/:name/:age',cors(),function(req,res){ 
  res.header('Content-Type','application/json;charset=utf-8') //”XML 解析错误：格式不佳“ 因为ajax请求指定了数据类型是json，后台返回数据如果不指定内容类型是文本，默认就是html类型，这样返回到前端就会自动调用html的解析器对文件进行解析，因此报这个异常（在Chrome没有这个错误）。
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  var errorData_500 = {
    ...req.body,
    status: '50200', 
    msg: 'Not haha!',
  };
  res.end(JSON.stringify(errorData_500));
});

app.listen(8000, function(){
  console.log('启动监听 8000');
});