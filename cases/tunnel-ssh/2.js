const tunnel = require('tunnel-ssh')
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
const config = {
  keepAlive: true,
  // host1
  host: '110.42.196.74', // '106.xx.xxx.xx'
  username: 'root',
  password: 'syUvocation001',
  port: 22,
  dstHost: 'localhost',
  dstPort: 5432,
  localHost: '127.0.0.1',
  localPort: 27018 //or anything else unused you want
}

const server = tunnel(config, function (error, server) {
  if (error) {
    console.log(error)
    return
  }

  console.log('SSH tunnel connected')
  var pg = require('pg')

  // var config1 = {
  //   user: 'postgres',
  //   host: 'localhost',
  //   database: 'foreign_teacher_tmp',
  //   password: 'syUvocation001',
  //   port: 5432,
  //   // 扩展属性
  //   max: 20, // 连接池最大连接数
  //   idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
  // }
  
  // // 创建连接池
  // var pool = new pg.Pool(config1)
  
  // pool.connect().then((client) => {
  //   client
  //     .query('Select * FROM teacher')
  //     .then((res) => {
  //       res.rows.forEach((item) => {
  //         const rs = client.query('UPDATE teacher SET first_name_latin=$1, surname_latin=$2 WHERE id=$3', [
  //           latinName(item.first_name),
  //           latinName(item.surname),
  //           item.id,
  //         ])
  //       })
  //       return 'haha'
  //     })
  //     .then((res) => {
  //       console.log('结果：',res);
  //     }).finally(_=>{
  //       client.release()
  //       console.log('结束工作');
  //     })
  // })

  // 数据库配置
  var conString = "tcp://postgres:syUvocation001@localhost:27018/foreign_teacher_tmp"; //tcp://用户名：密码@localhost/数据库名
  var client =  new pg.Client(conString);
  selectSQLString = 'select * from role'
  //客户端连接，进行数据插入
  client.connect(function (error, results) {
    if (error) {
      console.log('clientConnectionReady Error:' + error.message)
      client.end()
      return
    }
    console.log('connection success...\n')
    client.query('Select * FROM teacher')
    .then((res) => {
      // console.log(res.rows)
      const arrpromise = []
      res.rows.forEach((item) => {
        console.log(item.id)
        const rs = client.query('UPDATE teacher SET first_name_latin=$1, surname_latin=$2 WHERE id=$3', [
          latinName(item.first_name),
          latinName(item.surname),
          item.id,
        ])
        arrpromise.push(rs)
      })
      return Promise.allSettled(arrpromise)
    })
    .then((res) => {
      console.log(res.length,'update success')
      client.end()
      server.close()
    }).finally(_=>{
      console.log('结束工作');
    })
  })
})
