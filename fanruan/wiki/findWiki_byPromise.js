const menus = require('./bass_menu.js')
const path = require('path')
const fs = require('fs')

let promises = menus.map((element, index) => {
  return new Promise((resolve, reject) => {
    const path1 = element.url.substring(0, element.url.indexOf('cpt') + 3)
    fs.readFile(path.join('D:/fun/diting/', path1), 'utf-8', (err, data) => {
      if (err) {
        resolve({
          id: element.id,
          wiki: '路径错误'
        })
      } else {
        const rs = data.match(/(?<=wordDetail\/)\w{32}/g)
        if (rs instanceof Array && rs.length > 0) {
          // console.log(element.id, rs[0]);
          resolve({
            id: element.id,
            wiki: rs[0]
          })
        } else {
          resolve({
            id: element.id,
            wiki: '无百科信息'
          })
        }
      }
    })
  })

})

Promise.all(promises).then((allData) => {
  console.log('allData.length :>> ', allData.length);
  allData.forEach((item, index) => {
    console.log(item.id, item.wiki);
  })
})


var a = '/aaa/bbb/ccc.txt'
const b = a.lastIndexOf('/') // 8
console.log(a.substring(b+1));