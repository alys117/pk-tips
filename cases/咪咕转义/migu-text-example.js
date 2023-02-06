const jsonObj1 = require('./processed.json')

/**
 * 第一种方案：用正则替换转换成 对象
 */
let jsonObj2 = require('./sst_10010-8617829659404-8615129682072-00JZM135436213427Z0523135339.json')
const jsonStr2 = JSON.stringify(jsonObj2)
const jsonObj2_ = jsonStr2.replace(/\\/g,'').replace(/"json_1best":"/g,'"json_1best":').replace(/","lid/g,',"lid')
jsonObj2 = JSON.parse(jsonObj2_)
/**
 * 第er种方案：简单粗暴，推荐
 */
jsonObj2.lattice.forEach(e => e.json_1best = JSON.parse(e.json_1best))



let [dialog, input] = ['', undefined]
// input = jsonObj1
inout = jsonObj2

input.lattice.forEach(e => {
    dialog += e.spk+": "
    e.json_1best.st.rt[0].ws.forEach(e1 =>{
        dialog += e1.cw[0].w
    })
    dialog += '\n'
});
console.log(dialog)