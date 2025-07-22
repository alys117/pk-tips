const path = require('path')
const xml2js = require('xml2js');
const dayjs = require('dayjs');
const parser = new xml2js.Parser({ explicitArray: false });
const builder = new xml2js.Builder({ renderOpts: { pretty: true } });
const express = require('express')
const bodyParser = require('body-parser')
const app4 = express()
// 将请求体中的 xml 解析为字符串。
app4.use(bodyParser.text({ type: 'text/xml' }));  //app.use(bodyParser.text()) // 处理Content-Type是text/plain
app4.use(bodyParser.json()) // 处理Content-Type为application/json
app4.use(bodyParser.urlencoded({ extended: false }))
app4.post(
  '/bsbiam/services/SoapTreasury4A',
  function (req, res) {
    // console.log('typeof req.body',  typeof req.body);
    res.writeHead(200, { 'Content-Type': 'text/xml;charset=utf-8' })
    if (typeof req.body === 'string' && req.body.indexOf('ApproverQuery') > -1) {
      console.log(1, 'dealBO.getAccount()', dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss.SSS')+'--------------------------------------------------------------------------------------------');
      formatXml(req.body)
      const username = req.body.match(/subAccount&gt;(.*?)&lt;\/subAccount/)[1]
      let resBody = '<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:getAccountResponse xmlns:ns1="http://SoapTreasury4A.boco.com.cn"><accountResult>&lt;?xml version="1.0" encoding="UTF-8"?&gt;&lt;response&gt;&lt;head&gt;&lt;responseTime&gt;2023-04-05 17:47:09&lt;/responseTime&gt;&lt;method&gt;ApproverSet&lt;/method&gt;&lt;/head&gt;&lt;body&gt;&lt;account&gt;' + username + '&lt;/account&gt;&lt;/body&gt;&lt;/response&gt;</accountResult></ns1:getAccountResponse></soap:Body></soap:Envelope>'
      console.log(1, 'resBody');
      formatXml(resBody)
      console.log(1,'--------------------------------------------------------------------------------------------');
      res.end(resBody)
    } else if (typeof req.body === 'string' && req.body.indexOf('CertificationStatusQuery') > -1) {
      console.log(2, 'dealBO.getTreasuryStatus()', dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss.SSS')+'--------------------------------------------------------------------------------------------');
      formatXml(req.body)
      let resBody = '<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:getTreasuryStatusResponse xmlns:ns1="http://SoapTreasury4A.boco.com.cn"><treasuryManagerResult>&lt;?xml version="1.0" encoding="UTF-8"?&gt;&lt;response&gt;&lt;head&gt;&lt;responseTime&gt;2023-04-05 17:47:11&lt;/responseTime&gt;&lt;method&gt;CertificationStatusResponse&lt;/method&gt;&lt;/head&gt;&lt;body&gt;&lt;result&gt;1&lt;/result&gt;&lt;resultDesc&gt;null&lt;/resultDesc&gt;&lt;sceneId&gt;8a9342375fbe5963015fbe5963f50000&lt;/sceneId&gt;&lt;historyAppSessionId&gt;null&lt;/historyAppSessionId&gt;&lt;relation&gt;&lt;policyAuthMethod&gt;remoteAuth&lt;/policyAuthMethod&gt;&lt;policyAccessMethod&gt;authent_type_sms:动态口令(短信);&lt;/policyAccessMethod&gt;&lt;/relation&gt;&lt;relation&gt;&lt;policyAuthMethod&gt;siteAuth&lt;/policyAuthMethod&gt;&lt;policyAccessMethod&gt;authent_type_static:主帐号密码;&lt;/policyAccessMethod&gt;&lt;/relation&gt;&lt;maxTime&gt;0&lt;/maxTime&gt;&lt;approvers&gt;&lt;approver&gt;lvchuanzhu&lt;/approver&gt;&lt;approver&gt;yuxiaoling&lt;/approver&gt;&lt;/approvers&gt;&lt;commonReasons&gt;&lt;commonReason&gt;其他&lt;/commonReason&gt;&lt;commonReason&gt;一证五号查询&lt;/commonReason&gt;&lt;commonReason&gt;实名制身份比对&lt;/commonReason&gt;&lt;commonReason&gt;报表数据统计&lt;/commonReason&gt;&lt;commonReason&gt;报表数据下载&lt;/commonReason&gt;&lt;commonReason&gt;结算数据核查&lt;/commonReason&gt;&lt;commonReason&gt;业务办理查询&lt;/commonReason&gt;&lt;commonReason&gt;故障处理查询&lt;/commonReason&gt;&lt;commonReason&gt;客户投诉查询&lt;/commonReason&gt;&lt;commonReason&gt;IMS鉴权密码查询&lt;/commonReason&gt;&lt;commonReason&gt;敏感文件导出下载&lt;/commonReason&gt;&lt;/commonReasons&gt;&lt;/body&gt;&lt;/response&gt;</treasuryManagerResult></ns1:getTreasuryStatusResponse></soap:Body></soap:Envelope>'
      console.log(2, 'resBody');
      formatXml(resBody)
      console.log(2,'--------------------------------------------------------------------------------------------');
      res.end(resBody)
    } else if (typeof req.body === 'string' && req.body.indexOf('authent_type_static') > -1) {
      if (Math.random() < 0.1) {
        console.log(3, 'getAccount()', dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss.SSS')+'--------------------------------------------------------------------------------------------');
        setTimeout(function () {
          console.log(3.1);
          formatXml(req.body)
          let resBody ='<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:siteAuthResponse xmlns:ns1="http://SoapTreasury4A.boco.com.cn"><siteAuthResult>&lt;?xml version="1.0" encoding="UTF-8"?&gt;&lt;response&gt;&lt;head&gt;&lt;responseTime&gt;2023-04-05 17:48:01&lt;/responseTime&gt;&lt;method&gt;Response&lt;/method&gt;&lt;appId&gt;&lt;/appId&gt;&lt;/head&gt;&lt;body&gt;&lt;result&gt;0&lt;/result&gt;&lt;resultDesc&gt;现场认证审批人密码输入错误或者请求参数不全&lt;/resultDesc&gt;&lt;/body&gt;&lt;/response&gt;</siteAuthResult></ns1:siteAuthResponse></soap:Body></soap:Envelope>'
          formatXml(resBody)
          console.log(3.1,'--------------------------------------------------------------------------------------------');
          res.end(resBody)
        }, 1)
      } else {
        console.log(3.2);
        formatXml(req.body)
        let resBody = '<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:siteAuthResponse xmlns:ns1="http://SoapTreasury4A.boco.com.cn"><siteAuthResult>&lt;?xml version="1.0" encoding="UTF-8"?&gt;&lt;response&gt;&lt;head&gt;&lt;responseTime&gt;2023-04-07 18:59:37&lt;/responseTime&gt;&lt;method&gt;Response&lt;/method&gt;&lt;appId&gt;&lt;/appId&gt;&lt;/head&gt;&lt;body&gt;&lt;result&gt;1&lt;/result&gt;&lt;resultDesc&gt;&lt;/resultDesc&gt;&lt;/body&gt;&lt;/response&gt;</siteAuthResult></ns1:siteAuthResponse></soap:Body></soap:Envelope>'
        formatXml(resBody)
        console.log(3.2,'--------------------------------------------------------------------------------------------');
        setTimeout(function () {
          res.end(resBody)
        }, 1)
      }
    } else if (typeof req.body === 'string' && req.body.indexOf('112222222333') > -1) {
      console.log(4, 'dynamicCode', dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss.SSS')+'--------------------------------------------------------------------------------------------');
      formatXml(req.body)
      let resBody = '<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:siteAuthResponse xmlns:ns1="http://SoapTreasury4A.boco.com.cn"><siteAuthResult>&lt;?xml version="1.0" encoding="UTF-8"?&gt;&lt;response&gt;&lt;head&gt;&lt;responseTime&gt;2023-04-07 18:59:37&lt;/responseTime&gt;&lt;method&gt;Response&lt;/method&gt;&lt;appId&gt;&lt;/appId&gt;&lt;/head&gt;&lt;body&gt;&lt;result&gt;1&lt;/result&gt;&lt;resultDesc&gt;&lt;/resultDesc&gt;&lt;/body&gt;&lt;/response&gt;</siteAuthResult></ns1:siteAuthResponse></soap:Body></soap:Envelope>'
      formatXml(resBody)
      console.log('--------------------------------------------------------------------------------------------');
      res.end(resBody)
    }  else if (typeof req.body === 'string' && req.body.indexOf('remoteFirstAuth') > -1) {
      console.log(4, 'remoteFirstAuth', dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss.SSS')+'--------------------------------------------------------------------------------------------');
      formatXml(req.body)
      console.log(4, 'remoteFirstAuth');
      let resBody = '<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:remoteFirstAuthResponse xmlns:ns1="http://SoapTreasury4A.boco.com.cn"><remoteFirstAuthResult>&lt;?xml version="1.0" encoding="UTF-8"?&gt;&lt;response&gt;&lt;head&gt;&lt;responseTime&gt;2025-02-12 14:31:43&lt;/responseTime&gt;&lt;method&gt;Response&lt;/method&gt;&lt;appId&gt;ff808081371704850137170485850000&lt;/appId&gt;&lt;/head&gt;&lt;body&gt;&lt;result&gt;1&lt;/result&gt;&lt;resultDesc&gt;发送应用级金库短信成功!&lt;/resultDesc&gt;&lt;/body&gt;&lt;/response&gt;</remoteFirstAuthResult></ns1:remoteFirstAuthResponse></soap:Body></soap:Envelope>'
      formatXml(resBody)
      console.log('--------------------------------------------------------------------------------------------');
      res.end(resBody)
    } else if(typeof req.body === 'string' && req.body.indexOf('remoteSecondAuth') > -1) {
      console.log(5, 'remoteSecondAuth');
      formatXml(req.body)
      const result = Math.random() > 0.5 ? 0 : 1
      const desc = result === 0 ? '验证码不正确' : '验证成功！'
      let resBody = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:remoteSecondAuthResponse xmlns:ns1="http://SoapTreasury4A.boco.com.cn"><remoteSecondAuthResult>&lt;?xml version="1.0" encoding="UTF-8"?&gt;&lt;response&gt;&lt;head&gt;&lt;responseTime&gt;2025-02-12 11:33:10&lt;/responseTime&gt;&lt;method&gt;Response&lt;/method&gt;&lt;appId&gt;ff808081371704850137170485850000&lt;/appId&gt;&lt;/head&gt;&lt;body&gt;&lt;result&gt;'+result+'&lt;/result&gt;&lt;resultDesc&gt;'+desc+'&lt;/resultDesc&gt;&lt;/body&gt;&lt;/response&gt;</remoteSecondAuthResult></ns1:remoteSecondAuthResponse></soap:Body></soap:Envelope>'
      formatXml(resBody)
      res.end(resBody)
    }else {
      console.log(6, 'no match');
      // formatXml(req.body)
      res.end('no match')
    }
  }
)

app4.post('/post123', function (req, res) {
  console.log('req.url', req.url)
  console.log('req.body', req.body)
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Myth', 'legend')
  res.end(`{"a":1}`)
})
function formatXml(text){
  let body = text.replaceAll(/&lt;/g, '<').replaceAll(/&gt;/g, '>').replaceAll(/&quot;/g, '"')
  parser.parseString(body, (err, result) => {
    if (err) throw err;
    console.log(builder.buildObject(result)); // 格式化输出
  });
}
app4.all('/html', function (req, res) {
  console.log('req.url', req.url)
  console.log('req.body', req.body)
  console.log('req.query', req.query)
  res.setHeader('Content-Type', 'text/html')
  res.end(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
    <body>
    <input type="text" value="${req.path}">
    <span>${req.path}</span>
    <p>不能复制</p>
    <script>
      console.log('last line')
      window.addEventListener('message', function (e) {
        console.log('e', e)
        document.addEventListener('copy', function (e) {
          console.log('no copy')
          e.preventDefault()
        })
      })
    </script>
    </body></html>`
  )
})
app4.all('/*', function (req, res) {
  console.log('req.url', req.url)
  console.log('req.body', req.body)
  console.log('req.query', req.query)
  res.end(`{"a":1}`)
})
const server_9091 = app4.listen(9091, function () {
  const host = server_9091.address().address
  const port = server_9091.address().port
  console.log('应用访问地址为 http://%s:%s', host, port)
})