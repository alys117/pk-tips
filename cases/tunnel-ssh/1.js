const tunnel = require('tunnel-ssh')

const config = {
  keepAlive: true,
  // host1
  host: '192.168.0.104', // '106.xx.xxx.xx'
  username: 'root',
  password: 'ibmdb2',
  port: 22,
  dstHost: '192.168.0.103',
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
  //数据库配置
  var conString = "tcp://postgres:postgres@localhost:27018/deheng"; //tcp://用户名：密码@localhost/数据库名
  var client =  new pg.Client(conString);
  selectSQLString = 'select * from test'
  //客户端连接，进行数据插入
  client.connect(function (error, results) {
    if (error) {
      console.log('clientConnectionReady Error:' + error.message)
      client.end()
      return
    }
    console.log('connection success...\n')
    client.query(selectSQLString).then((results,err)=>{
      err && console.log(err)
      console.log(results.rows)
      client.end() 
      server.close()
    })
  })
})
