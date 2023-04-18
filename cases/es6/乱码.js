// const encoder = new TextEncoder()
// const text = '中文'
// const encodedData = encoder.encode(text)
// console.log(encodedData)
// const binaryString = encodedData.reduce(
//   (acc, byte) => acc + byte.toString(2).padStart(8, '0'),
//   ''
// )
// console.log(binaryString)



// const arrOutput = [0xe4, 0xb8, 0xad, 0xe6, 0x96, 0x87]
// const a = '中文'
// var str = 'ä¸­æ';
// var utfstring =decodeURIComponent(escape(str))
// var utfstring2 =decodeURI(encodeURI(str))
// console.log(escape(str));
// console.log(utfstring)
// console.log(utfstring2);

// const axios = require('axios')
// axios.get('http://localhost:8075/webroot/decision/view/report?'+
// 'viewlet=GettingStarted.cpt&op=export&format=excel&__filename__='+encodeURIComponent('测试')).then(res=>{
//   const filename = res.headers['content-disposition'].split('filename=')[1]
//   console.log('帆软url直接导出需要处理：',decodeURI(escape(filename)))
// })


const c = new TextDecoder('gbk').decode(new Uint8Array([   214, 208, 206, 196 ]).buffer)
console.log(c);// out:  "中文"
