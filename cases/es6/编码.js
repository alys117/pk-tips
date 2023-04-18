let iconv = require('iconv-lite');
// 这里是utf8
let str = '/?中文=88';
// utf8转换成gbk
let encoded = iconv.encode(str, 'gbk');
console.log(encoded,encoded.toJSON())

// gbk转换成utf8
str = iconv.decode(Buffer.from([ 47, 63, 214, 208, 206, 196, 61, 56, 56 ]), 'gbk');
console.log('utf8 str:',str)
// out: Buffer <2F, 3F, D6, D0, CE, C4, 3D, 38, 38>
// Object {data: [47, 63, 214, 208, 206, 196, 61, 56, 56], type: "Buffer"}
// utf8 str: "/?中文=88"



let encoded1 = iconv.encode(str, 'utf-8');
console.log(encoded1,encoded1.toJSON())
console.log(11111, iconv.decode(encoded1, 'utf-8'));
console.log(22222, iconv.decode(Buffer.from([47, 63, 228, 184, 173,  230, 150, 135, 61, 56, 56]), 'utf-8'));


