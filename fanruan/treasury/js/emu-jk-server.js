const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app4 = express()
// 将请求体中的 xml 解析为字符串。
app4.use(bodyParser.text({type: 'text/xml'}));  //app.use(bodyParser.text()) // 处理Content-Type是text/plain
app4.use(bodyParser.json()) // 处理Content-Type为application/json
app4.use(bodyParser.urlencoded({ extended: false })) 
app4.post(
  '/bsbiam/services/SoapTreasury4A',
  function (req, res) {
    console.log('typeof req.body',  typeof req.body);
    res.writeHead(200, { 'Content-Type': 'text/xml;charset=utf-8' })
    if ( typeof req.body === 'string' && req.body.indexOf('ApproverQuery') > -1) {
      console.log('dealBO.getAccount() body：', req.body)
      res.end('<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:getAccountResponse xmlns:ns1="http://SoapTreasury4A.boco.com.cn"><accountResult>&lt;?xml version="1.0" encoding="UTF-8"?&gt;&lt;response&gt;&lt;head&gt;&lt;responseTime&gt;2023-04-05 17:47:09&lt;/responseTime&gt;&lt;method&gt;ApproverSet&lt;/method&gt;&lt;/head&gt;&lt;body&gt;&lt;account&gt;wangyuanchao7&lt;/account&gt;&lt;/body&gt;&lt;/response&gt;</accountResult></ns1:getAccountResponse></soap:Body></soap:Envelope>')
    }else if ( typeof req.body === 'string' && req.body.indexOf('CertificationStatusQuery') > -1) {
      console.log('dealBO.getTreasuryStatus() body：', req.body)
      res.end('<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:getTreasuryStatusResponse xmlns:ns1="http://SoapTreasury4A.boco.com.cn"><treasuryManagerResult>&lt;?xml version="1.0" encoding="UTF-8"?&gt;&lt;response&gt;&lt;head&gt;&lt;responseTime&gt;2023-04-05 17:47:11&lt;/responseTime&gt;&lt;method&gt;CertificationStatusResponse&lt;/method&gt;&lt;/head&gt;&lt;body&gt;&lt;result&gt;1&lt;/result&gt;&lt;resultDesc&gt;null&lt;/resultDesc&gt;&lt;sceneId&gt;8a9342375fbe5963015fbe5963f50000&lt;/sceneId&gt;&lt;historyAppSessionId&gt;null&lt;/historyAppSessionId&gt;&lt;relation&gt;&lt;policyAuthMethod&gt;remoteAuth&lt;/policyAuthMethod&gt;&lt;policyAccessMethod&gt;authent_type_sms:动态口令(短信);&lt;/policyAccessMethod&gt;&lt;/relation&gt;&lt;relation&gt;&lt;policyAuthMethod&gt;siteAuth&lt;/policyAuthMethod&gt;&lt;policyAccessMethod&gt;authent_type_static:主帐号密码;&lt;/policyAccessMethod&gt;&lt;/relation&gt;&lt;maxTime&gt;0&lt;/maxTime&gt;&lt;approvers&gt;&lt;approver&gt;gaodapeng&lt;/approver&gt;&lt;/approvers&gt;&lt;commonReasons&gt;&lt;commonReason&gt;其他&lt;/commonReason&gt;&lt;commonReason&gt;一证五号查询&lt;/commonReason&gt;&lt;commonReason&gt;实名制身份比对&lt;/commonReason&gt;&lt;commonReason&gt;报表数据统计&lt;/commonReason&gt;&lt;commonReason&gt;报表数据下载&lt;/commonReason&gt;&lt;commonReason&gt;结算数据核查&lt;/commonReason&gt;&lt;commonReason&gt;业务办理查询&lt;/commonReason&gt;&lt;commonReason&gt;故障处理查询&lt;/commonReason&gt;&lt;commonReason&gt;客户投诉查询&lt;/commonReason&gt;&lt;commonReason&gt;IMS鉴权密码查询&lt;/commonReason&gt;&lt;commonReason&gt;敏感文件导出下载&lt;/commonReason&gt;&lt;/commonReasons&gt;&lt;/body&gt;&lt;/response&gt;</treasuryManagerResult></ns1:getTreasuryStatusResponse></soap:Body></soap:Envelope>')
    }else if ( typeof req.body === 'string' && req.body.indexOf('authent_type_static') > -1) {
      if (Math.random() > 0.99999) {
        console.log('getAccount body：', req.body)
        setTimeout(function(){
          res.end('<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:siteAuthResponse xmlns:ns1="http://SoapTreasury4A.boco.com.cn"><siteAuthResult>&lt;?xml version="1.0" encoding="UTF-8"?&gt;&lt;response&gt;&lt;head&gt;&lt;responseTime&gt;2023-04-05 17:48:01&lt;/responseTime&gt;&lt;method&gt;Response&lt;/method&gt;&lt;appId&gt;&lt;/appId&gt;&lt;/head&gt;&lt;body&gt;&lt;result&gt;0&lt;/result&gt;&lt;resultDesc&gt;现场认证审批人密码输入错误或者请求参数不全&lt;/resultDesc&gt;&lt;/body&gt;&lt;/response&gt;</siteAuthResult></ns1:siteAuthResponse></soap:Body></soap:Envelope>')
        },100)
      }else{
        console.log('getAccount body：', req.body)
        setTimeout(function(){
          res.end('<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns1:siteAuthResponse xmlns:ns1="http://SoapTreasury4A.boco.com.cn"><siteAuthResult>&lt;?xml version="1.0" encoding="UTF-8"?&gt;&lt;response&gt;&lt;head&gt;&lt;responseTime&gt;2023-04-07 18:59:37&lt;/responseTime&gt;&lt;method&gt;Response&lt;/method&gt;&lt;appId&gt;&lt;/appId&gt;&lt;/head&gt;&lt;body&gt;&lt;result&gt;1&lt;/result&gt;&lt;resultDesc&gt;&lt;/resultDesc&gt;&lt;/body&gt;&lt;/response&gt;</siteAuthResult></ns1:siteAuthResponse></soap:Body></soap:Envelope>')
        },100)
      }
    }else {
      console.log('no match body：', req.body)
      res.end('no match')
    }
  }
)

const server_80 = app4.listen(80, function () {
  const host = server_80.address().address
  const port = server_80.address().port
  console.log('应用访问地址为 http://%s:%s', host, port)
})