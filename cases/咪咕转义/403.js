const axios = require('axios');
(async function(cb) {
  const res =await axios({
    url:'https://b2b.10086.cn/b2b/main/listVendorNotice.html?noticeType=2',
    method: 'get'
  })
  // console.log(res.data);
  const html = res.data;
  let _qt = ''
  html.match(/(?<=\*\/')\w*(?=')/g).forEach((item) => {
    console.log(item); _qt += item
  })
  const data = {
    'page.currentPage': 1,
    'page.perPageSize': 20,
    'noticeBean.sourceCH': '',
    'noticeBean.source': '',
    'noticeBean.title': '',
    'noticeBean.startDate': '',
    'noticeBean.endDate': '',
    _qt: _qt
  }
  console.log(data);
  const res2 =await axios({
    url:'https://b2b.10086.cn/b2b/main/listVendorNoticeResult.html?noticeBean.noticeType=2',
    method: 'post',
    data: data,
    transformRequest: [
      function (data) {
         let ret = ''
         for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
         }
         ret = ret.substring(0, ret.lastIndexOf('&'));
         return ret
      }
    ],
    headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  const rs = res2.data;
})()  