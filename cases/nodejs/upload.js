const http = require('http')
const fs = require('fs')
const path = require('path')

const bufferSplit = function (buffer, deli) {
  let arr = []
  let n = 0
  while ((n = buffer.indexOf(deli)) != -1) {
    arr.push(buffer.slice(0, n))
    buffer = buffer.slice(n + deli.length)
  }
  arr.push(buffer)
  return arr
}

const server = http.createServer((req, res) => {
  let boundary = '--' + req.headers['content-type'].split('; ')[1].split('=')[1]
  console.log(boundary)

  let arr = []
  req.on('data', (buffer) => {
    arr.push(buffer)
  })
  req.on('end', () => {
    let buffer = Buffer.concat(arr)
    //1.切割分隔符
    let result = bufferSplit(buffer, boundary)
    result.pop()
    result.shift()
    // console.log(result.toString());
    //2.对每一个元素进行处理
    result.forEach((buffer) => {
      //3.切断buffer前面和后面的换行
      buffer = buffer.slice(2, buffer.length - 2)
      //4.去掉每个元素的\r\n\r\n
      let n = buffer.indexOf('\r\n\r\n') //获取分分隔符的位置
      let info = buffer.slice(0, n).toString() //获取字段信息

      let data = buffer.slice(n + 4) //获取字段内容
      // console.log(info);
      // console.log(data.toString());
      //5.判断文件和普通数据
      if (info.indexOf('\r\n') != -1) {
        //5.1文件信息 获取字段名和文件名
        let res2 = info.split('\r\n')[0].split('; ')
        let name = res2[1].split('=')[1] //获取字段名
        let filename = res2[2].split('=')[1] //获取文件名
        name = name.substring(1, name.length - 1) //去掉引号
        filename = filename.substring(1, filename.length - 1)
        // console.log(name);
        // console.log(filename);
        //文件上传
        const dirReady = mkdirsSync('./static')
        if(!dirReady){
          console.log('创建目录失败');
          return;
        }
        fs.writeFile(`./static/${filename}`, data, (err) => {
          if (err) {
            console.log(err)
          } else {
            console.log(`${filename} 上传成功`)
          }
        })
      } else {
        //5.2普通信息 获取字段名
        let name = info.split('; ')[1].split('=')[1]
        name = name.substring(1, name.length - 1)
        console.log(name + ':' + data)
      }
    })
    res.end(JSON.stringify({ msg: '上传成功' }))
  })
})

function mkdirsSync(dirname, mode){
  console.log(dirname);
  if(fs.existsSync(dirname)){
      return true;
  }else{
      if(mkdirsSync(path.dirname(dirname), mode)){
          fs.mkdirSync(dirname, mode);
          return true;
      }
  }
}
const port = 8000
server.listen(port, '0.0.0.0', () => {
  console.log('文件上传服务器开启成功，监听在：'+port)
})
