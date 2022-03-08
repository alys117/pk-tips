const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(bodyParser.json({
//   verify: function (req, res, buf, encoding) {
//       req.rawBody = buf;
//   }
// }));
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, 'public')))
// express接收form-data，主要是用来文件上传
const multer =require('multer')

const upload = multer({dest:__dirname+'/static/upload'}) // 设置上传的目录文件夹
const cpUpload = upload.fields([{ name: 'avatar', maxCount: 2 }, { name: 'gallery', maxCount: 8 }])
app.use(cpUpload)

// var storage = multer.diskStorage({
//   // 文件存储的位置
//   destination: function (req, file, cb) {
//     cb(null, __dirname+'/static/upload');
//   },
//   // 文件重命名
//   filename: function (req, file, cb) {
//     console.log(file)
//     let timeStamp = new Date().getTime()
//     cb(null, timeStamp + '.' + file.originalname.split(".")[1]);
//   }
// })
// var upload = multer({ storage: storage })
// app.use(upload.any())


// curl -X POST -d "bodydatakey=bodydatavalue" "http://localhost:8083/process_post/aa/77?first_name=ke&last_name=pan"
app.post('/process_post/:subflag1/:subflag2', function (req, res) {
  console.log(req.files);  // 上传的文件信息
  console.log(req.body);
  console.log('----------');
  console.log(req.params);
  console.log('----------');
  console.log(req.query);
  // console.log('****',req.chunk);
  res.end("haha")
})

app.post('/form-data/:ddd',function (req, res) {
  console.log(req.files);  // 上传的文件信息
  console.log(req.body);
  console.log('----------');
  console.log(req.params);
  console.log('----------');
  console.log(req.query);

  res.end("form-data")
})

const server = app.listen(8083, function () {
  const host = server.address().address
  const port = server.address().port
  
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
