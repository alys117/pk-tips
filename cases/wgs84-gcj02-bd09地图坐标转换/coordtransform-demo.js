//1. 引入 fs 模块
const fs = require('fs');
const path = require('path');
// const coordtransform = require('coordtransform') // npm install coordtransform，其实就是下面的本地代码
const coordtransform = require('./coordtransform')


console.log('转换前坐标：(104, 39)');
//百度经纬度坐标转国测局坐标
console.log('bd09togcj02:', coordtransform.bd09togcj02(104, 39));
//国测局坐标转百度经纬度坐标
console.log('gcj02tobd09', coordtransform.gcj02tobd09(104, 39));
//wgs84转国测局坐标
console.log('wgs84togcj02', coordtransform.wgs84togcj02(104, 39));
//国测局坐标转wgs84坐标
console.log('gcj02towgs84', coordtransform.gcj02towgs84(104, 39));
console.log('--------------示例结束--------------');


//3. 使用 Promise 封装
const p = new Promise(function (resolve, reject) {
    fs.readFile(path.join(__dirname, './1.csv'), (err, data) => {
        //判断如果失败
        if (err) reject(err);
        //如果成功
        resolve(data);
    });
});

p.then(function (value) {
    const rs = []
    const arr = value.toString().split('\r\n');
    for (let i = 0; i < arr.length; i++) {
        const line = arr[i].split(',');
        const [lng, lat] = coordtransform.gcj02towgs84(line[1], line[2])
        rs.push(line[0] + ', ' + lng + ', ' + lat)
    }
    console.log(rs.join('\r\n'));
}, function (reason) {
    console.log("读取失败!!");
});



