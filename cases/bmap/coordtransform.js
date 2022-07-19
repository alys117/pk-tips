//国测局坐标(火星坐标,比如高德地图在用),百度坐标,wgs84坐标(谷歌国外以及绝大部分国外在线地图使用的坐标)
var coordtransform=require('coordtransform');
//百度经纬度坐标转国测局坐标
var bd09togcj02=coordtransform.bd09togcj02(116.404, 39.915); // 百度转国测局坐标
//国测局坐标转百度经纬度坐标 
var gcj02tobd09=coordtransform.gcj02tobd09(116.404, 39.915); // 火星坐标转百度坐标
//wgs84转国测局坐标
var wgs84togcj02=coordtransform.wgs84togcj02(116.404, 39.915); // wgs84坐标转国测局坐标
//国测局坐标转wgs84坐标
var gcj02towgs84=coordtransform.gcj02towgs84(116.404, 39.915); // 国测局坐标转wgs84坐标
console.log(bd09togcj02);
console.log(gcj02tobd09);
console.log(wgs84togcj02);
console.log(gcj02towgs84);
//result
//bd09togcj02:   [ 116.39762729119315, 39.90865673957631 ]
//gcj02tobd09:   [ 116.41036949371029, 39.92133699351021 ]
//wgs84togcj02:  [ 116.41024449916938, 39.91640428150164 ]
//gcj02towgs84:  [ 116.39775550083061, 39.91359571849836 ]

var aa=coordtransform.gcj02towgs84(116.41024449916938, 39.91640428150164);
console.log('gcj-84',[116.41024449916938, 39.91640428150164],aa);
var bb=coordtransform.wgs84togcj02(...aa);
var bb_=coordtransform.gcj02tobd09(...bb);
var bb__ = coordtransform.bd09togcj02(...bb_);
var bb___ = coordtransform.gcj02towgs84(...bb__);
console.log('84-gcj',aa,bb);
console.log('gcj-bd09',bb,bb_);
console.log('bd09-gcj',bb_,bb__);
console.log('gcj-84',bb__,bb___);
var cc=coordtransform.gcj02towgs84(...bb);
console.log('gcj-84',bb,cc);
// 精度五位小数,相当于精确到米
// gcj-84 [ 116.41024449916938, 39.91640428150164 ] [ 116.40400191537934, 39.91500120257608 ]
// 84-gcj [ 116.40400191537934, 39.91500120257608 ] [ 116.41024641439492, 39.91640548400729 ]
// gcj-84 [ 116.41024641439492, 39.91640548400729 ] [ 116.40400383143125, 39.91500240568536 ]