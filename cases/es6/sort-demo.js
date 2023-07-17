const arr = [
    { huanbi: 0.21, tongbi: 0.12, cityid: 5 },
    { huanbi: 0.43, tongbi: 0.54, cityid: 999 },
    { huanbi: 0.56, tongbi: 0.34, cityid: 1 },
    { huanbi: 0.95, tongbi: 0.76, cityid: 2 },
    { huanbi: 0.76, tongbi: 0.98, cityid: 3 },
    { huanbi: 0.54, tongbi: 0.37, cityid: 4 },
]
// arr.sort((a, b) =>  b.tongbi - a.tongbi)
const sortProps = ['tongbi', 'huanbi']
sortProps.forEach((prop) => {
    arr.sort((a, b) =>  {
        if (a.cityid === 999) {
            return -1
        }
        if (b.cityid === 999) {
            return 1
        }
        return b[prop] - a[prop]
    })
    arr.map((item, index) => {
        item[`sn_${prop}`] = index
    })
})
arr.sort((a, b) =>  a.sn_tongbi - b.sn_tongbi)
console.log('arr :>> ', arr);
console.log('end');