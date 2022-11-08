var Mock = require('mockjs')
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|5-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        name: '@cword(2,4)',
        countyName: '@county(false)',
        county: '@county(true)',
        city: '@city(true)',
        'age|5-40': 12,
        'tip|2-5': '☆',
        'price|5-10.1-4' : 10, 
        sentence: '@csentence(10,14)',
        phone: /^1[358][1-9]\d{8}/,
        'emotion|1': ['happy', 'sad' , 'angry'],
        'emotion2|2-3': ['happy', 'sad' , 'angry']
    }]
})
// 输出结果
console.log(JSON.stringify(data, null, 2))