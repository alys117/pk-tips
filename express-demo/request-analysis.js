const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // 处理Content-Type为application/json
app.use(bodyParser.urlencoded({ extended: false })) // 处理Content-Type为application/x-www-form-urlencoded
// app.use(bodyParser.json({
//   verify: function (req, res, buf, encoding) {
//       req.rawBody = buf;
//   }
// }));
app.use(bodyParser.text()) // 处理Content-Type是text/plain
app.use(express.static(path.join(__dirname, 'public')))
// express接收form-data，主要是用来文件上传
const multer = require('multer')

const upload = multer({ dest: __dirname + '/static/upload' }) // 设置上传的目录文件夹
const cpUpload = upload.fields([
  { name: 'avatar', maxCount: 2 },
  { name: 'gallery', maxCount: 8 },
])
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
  console.log(req.files, 'req.files') // 上传的文件信息
  console.log(typeof req.body, 'body类型typeof req.body')
  console.log('------req.body------')
  console.log(req.body)
  console.log('-----req.params-----')
  console.log(req.params)
  console.log('-----req.query------')
  console.log(req.query)
  // console.log('****',req.chunk);
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }) //设置response编码为utf-8
  const response = {
    query: { ...req.query },
    parames: { ...req.params },
  }
  // 此种解析 你无法保证所有的人都在请求头里面加了 Content-Type
  if (typeof req.body === 'object' && !Object.keys(req.body).length) {
    let [plain, json] = ['', undefined]
    //不能正确解析json 格式的post参数
    req.on('data', function (chunk) {
      plain += chunk //读取参数流转化为字符串
    })
    req.on('end', function () {
      console.log('------req.body拼接方式------')
      console.log(plain)
      // 读取参数流结束后将转化的body字符串解析成 JSON 格式
      try {
        json = JSON.parse(plain)
      } catch (err) {
        json = '解析出错'
      }
      res.end(
        JSON.stringify(Object.assign(response, { body: { plain, json } }))
      )
    })
  } else {
    typeof req.body === 'object'?
    res.end(JSON.stringify(Object.assign(response, { body: { ...req.body } })))
    :res.end(JSON.stringify(Object.assign(response, { body: req.body })))
  }
})

const server = app.listen(8083, function () {
  const host = server.address().address
  const port = server.address().port
  console.log('应用访问地址为 http://%s:%s', host, port)
})
