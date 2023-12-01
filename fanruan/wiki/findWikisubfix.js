const menus = require('./bass_menu.js')
const path = require('path')
const fs = require('fs')
menus.forEach(element => {
    const path1 = element.url.substring(0, element.url.indexOf('cpt') + 3)
    fs.readFile(path.join('D:/fun/diting/', path1), 'utf-8', (err, data) => {
        if (err) {
            console.log(element.id, path1, '路径错误');
        } else {
            const rs = data.match(/(?<=wordDetail\/)\w{32}/g)
            if (rs instanceof Array && rs.length > 0) {
                console.log(element.id, rs[0]);
            } else {
                console.log(element.id, '无百科信息')
            }
        }
    })
});

const a = fs.statSync('D:/fun/diting/bass/202201/bak/1-4.cpt')
console.log(a);