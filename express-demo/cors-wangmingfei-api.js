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
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};


app.use(allowCrossDomain); // 可代替 cors 模块
app.all('*', async (req, res, next) => {
  console.log(req.headers);
  console.log(req.method, req.cookies);
  console.log(req.query, req.params, req.path);
  console.log('--------body--------');
  console.log(req.body);
  // -----跨域请求----- 可用pp.use(allowCrossDomain)代替
  console.log('req.get("Origin") :>> ', req.get('Origin'));
  res.header('Access-Control-Allow-Origin', req.get('Origin')) // 允许的地址,http://127.0.0.1:9000这样的格式
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since, X-Token') // 允许跨域请求header携带哪些东西
  // res.header('Access-Control-Allow-Headers', '*') // 有兼容问题,在IE下使用自定义header会报错，必须指定允许的header，例如上面的X-Token
  res.header('Access-Control-Allow-Credentials', 'true');
  // -----跨域请求-----


  function wait(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
  };
  await wait(100000)
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  res.end(JSON.stringify({
    status: 'ok',
    data: '跨域数据',
    msg: '出错误',
    success: true,
    authCode: '1001'
  }))
})


app.all('/api/draw_data', async (req, res, next) => {
  console.log(req.headers);
  console.log(req.method, req.cookies);
  console.log(req.query, req.params, req.path);
  console.log('--------body--------');
  console.log(req.body);
  console.log('req.get("Origin") :>> ', req.get('Origin'));
  res.header('Access-Control-Allow-Origin', req.get('Origin')) // 允许的地址,http://127.0.0.1:9000这样的格式
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since, X-Token') // 允许跨域请求header携带哪些东西
  // res.header('Access-Control-Allow-Headers', '*') // 有兼容问题,在IE下使用自定义header会报错，必须指定允许的header，例如上面的X-Token
  res.header('Access-Control-Allow-Credentials', 'true');

  function wait(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
  };
  await wait(100)
  res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  res.end(JSON.stringify({
    'draw_data': {
      'x': {
        'x_axis': [
          0
        ]
      },
      'y': {
        '增量市场增幅贡献pp': [
          '0.2751'
        ],
        '家庭市场增幅贡献pp': [
          '1.8381'
        ],
        '存量市场增幅贡献pp': [
          '1.9979'
        ]
      }
    },
    'sql': "SELECT `IMGC_pp` AS '增量市场增幅贡献pp', `HMGC_pp` AS '家庭市场增幅贡献pp', `EMGC_pp` AS '存量市场增幅贡献pp' FROM dw_city_operation_indicator WHERE `op_time` LIKE '2024%' AND `city_name` = '济南'"
  }))
})

app.listen(8000, function () {
  console.log('启动监听 8000');
});
