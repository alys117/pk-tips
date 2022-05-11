var pg = require('pg');
//数据库配置
var conString = "tcp://postgres:postgres@192.168.1.33:9432/foreign_teacher"; //tcp://用户名：密码@localhost/数据库名
// var client =  new pg.Client(conString);
const conObj = {
    user: 'postgres',
    host: '192.168.1.33',
    database: 'foreign_teacher',
    password: 'postgres',
    port: 9432
}
var client =  new pg.Client(conObj);

var tem = 33;
//sql语句
// selectSQLString = 'insert into pet(tem) values ('+tem+') ';
selectSQLString = 'select * from zhparser.dict';
//客户端连接，进行数据插入
client.connect(function(error, results){
  if (error) {
    console.log('clientConnectionReady Error:'+error.message);
    client.end();
    return;
  }
  console.log('connection success...\n');
  client.query(selectSQLString,function(error,results){
    error && console.log(error);
    console.log(results);
    client.end();
  })
});
