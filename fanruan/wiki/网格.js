const fs = require('fs');
const path = require('path');

const units = require('./allUnits.json')
const menus = require('./bass_menu.js')
const actives = require('./activeUnits.json')
const hits = require('./hitrate.json')

units.forEach((item, index) => {
  const tmp = menus.find(i=> {
    return i.url === item.path
  })
  const tmp2 = undefined
  if (tmp) {
    let tmp2 = actives.find(i=> {
      return i.path === item.path
    })
    let tmp3 = hits.find(i=> i['菜单id'] === tmp.id)
    tmp3 = undefined
    console.log(index+1+'~'+tmp.id+'~'+tmp.url+"~"+tmp.menu_name+"~"+tmp.belong+'~'+(tmp2?'已过滤':'未做限制') + "~" + item.mtime + "~" + (tmp3?tmp3['点击量']:'无点击量'));
  }else{
    console.log(index+1+'~'+'/'+'~'+item.path+"~"+'/'+"~"+'/'+'~'+'未上线'+'~' + item.mtime+'~'+'无点击量' );
  }
})
