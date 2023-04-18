var iconv = require('iconv');

var luan = 'ä¸­æ';
luan = '中文'
var ic = new iconv.Iconv('iso-8859-1', 'utf-8');
var buf = ic.convert(luan);
console.log(buf);
var buffer = buf.toString('utf-8');
console.log(buffer);