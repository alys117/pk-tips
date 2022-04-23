var express = require('express');
var app = express()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const fs = require('fs');
/**
 * 通过流将视频发给客户端： Partial Content
 * http://blog.csdn.net/lv18092081172/article/details/51457525
 */

 console.log(__dirname);  console.log(process.cwd())
 app.get('/video', function(req, res, next) {
  let path = './express-demo/assets/sintel.mp4';
  let stat = fs.statSync(path);
  let fileSize = stat.size;
  let range = req.headers.range;

  // fileSize 3332038

  if (range) {
      let parts = range.replace(/bytes=/, "").split("-");
      let start = parseInt(parts[0], 10);
      let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;

      // end 在最后取值为 fileSize - 1 
      end = end > fileSize - 1 ? fileSize - 1 : end;

      let chunksize = (end - start) + 1;
      let file = fs.createReadStream(path, { start, end });
      console.log(`bytes ${start}-${end}/${fileSize}`,chunksize);
      let head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
          'Content-Disposition': 'attachment; filename=sintel.mp4'
      };
      res.writeHead(206, head);
      file.pipe(res);
  } else {
      let head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
          'Content-Disposition': 'attachment; filename=sintel.mp4'
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
  }
})

// curl -X POST -d "aaa=bbb" "http://localhost:8086/post/aa/77?first_name=ke&last_name=pan"
app.post('/post/:param1/:param2', urlencodedParser, function (req, res) {
  // 输出 JSON 格式
  res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});//设置response编码为utf-8
  var response = {
    a:'hello',
    ...req.body,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }
  console.log('req.body',req.body);
  console.log('req.params',req.params);
  console.log('req.query',req.query);

  res.end(JSON.stringify(response))
})

var server = app.listen(8086, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})