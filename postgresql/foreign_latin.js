const pg = require('pg')
const { pinyin } = require('pinyin')
const latinize = require('latinize')

function latinName(val){
  const pinYin = pinyin(val, {
    style: 'normal',
    mode: 'surname',
    compact: true
  })
  const name = pinYin.length ? latinize(pinYin[0].join('')) : ''
  
  return name
}

// 数据库配置
var config = {
  user: 'postgres',
  host: '192.168.0.103',
  database: 'deheng',
  password: 'postgres',
  port: 5432,
  // 扩展属性
  max: 20, // 连接池最大连接数
  idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
}

// 创建连接池
var pool = new pg.Pool(config)

pool.connect().then((client) => {
  client
    .query('Select * FROM test WHERE age = $1 or age <> $1', [21])
    .then((res) => {
      res.rows.forEach((item) => {
        console.log(item)
        const rs = client.query('UPDATE test SET name_latin=$1, name2_latin=$2 WHERE id=$3', [
          latinName(item.name),
          latinName(item.name2),
          item.id,
        ])
      })
      return 'haha'
    })
    .then((res) => {
      console.log('结果：',res);
    }).finally(_=>{
      client.release()
      console.log('结束工作');
    })
})
