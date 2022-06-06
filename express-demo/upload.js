var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
var fs = require('fs')
var multer = require('multer')
var upload = multer({ dest: path.join(__dirname, 'tmp/uploads') });
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))

// curl -F 'media=@a1.png;filename=333.png' -F 'p1=foo' -F 'p2=bar' http://localhost:8081/file_upload
//  upload.array(文件参数名，最大文件数量)	
//  upload.feilds([{name:文件名称1,maxCount:最大文件1数量},{name:文件名称2,maxCount:最大文件2数量}...])

app.post('/file_upload', upload.single('media'), function (req, res) {
  let file = req.file;
  console.log(file.originalname,file.filename)
  console.log(req.body)
  // fieldname: 上传文件标签在表单中的name
  let filename = path.join(__dirname, 'tmp/uploads/') + file.filename;
  // 判断上传的图片格式
  // mimetype：该文件的Mime type
  if (file.mimetype == "image/jpeg") {
      filename += ".jpg";
  }
  if (file.mimetype == "image/png") {
      filename += ".png";
  }
  if (file.mimetype == "image/gif") {
      filename += ".gif";
  }
  fs.renameSync(file.path, filename);
  console.log(req.file);
  // 响应
  res.json("上传成功");
})

// curl -X POST -d "aaa=bbb" "http://localhost:8081/process_post/aa/77?first_name=ke&last_name=pan"
app.post('/process_post/:subflag1/:subflag2', urlencodedParser, function (req, res) {
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


var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})
