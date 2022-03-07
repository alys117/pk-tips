const bodyParser=require("body-parser");
 
// 解析以 application/json 和 application/x-www-form-urlencoded 提交的数据
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });
const express=require("express"); 
var app=express();
app.use(jsonParser)
app.use(urlencodedParser)
app.post('/aa/:name/:age',function(req,res){
  res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  var errorData_500 = {
    status: '50200', 
    msg: 'Not haha!',
};
res.end(JSON.stringify(errorData_500));

});

app.listen(8000);