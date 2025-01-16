
const express=require("express"); 
var app=express();
app.get('/1',function(req,res){ 
  const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(req.connection.remoteAddress, 'req.connection.remoteAddress');
  console.log(req.ip, 'req.ip');
  console.log(req.headers['x-forwarded-for'], 'req.headers[x-forwarded-for]');
  const port = req.connection.remotePort;
  res.send(`Client IP: ${ip}, Port: ${port}`);
});

app.listen(8099, function(){
  console.log('启动监听\u200d 8099');
});