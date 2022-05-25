let request = require('request');
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 // 即"不拒绝未认证的证书" 影响整个环境所有代码
// const req0 = request.defaults({
//   proxy: "http://127.0.0.1:8888"
// })
// req0.get("https://www.baidu.com").on("response", (res) =>{
//   console.log(res);
//   console.log('----1----');
// })

const req = request.defaults({
  proxy: "http://127.0.0.1:8888",
  rejectUnauthorized: false,
})
req.get("https://www.baidu.com").on("response", (res) =>{
  console.log(res);
  console.log('--------');
})

// openssl x509 -inform DER -in FiddlerRoot.cer -outform PEM -out fiddler.pem
const req1 = request.defaults({
  proxy: "http://127.0.0.1:8888",
  ca: require("fs").readFileSync("d:/fiddler.pem", {encoding: "utf-8"}),
})
req1.get("https://www.baidu.com").on("response", console.log)
