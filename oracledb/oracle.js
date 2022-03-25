/* 
教程  https://www.cnblogs.com/maomingchao/p/9324090.html
*/
var oracledb = require('oracledb');
let Ut = require("./Delay");
var config = {
  user:'sdbass',　　//用户名
  password:'ibmdb2',　　//密码
  //IP:数据库IP地址，PORT:数据库端口，SCHEMA:数据库名称
  connectString : "192.168.0.253:1521/sdcrm"
};
oracledb.getConnection(
  config,
  function(err, connection)
  {
    if (err) {
      console.error(err.message);
      return;
    }
　　//查询某表十条数据测试，注意替换你的表名
    connection.execute("SELECT * FROM ( SELECT A.*, ROWNUM RN FROM (SELECT * FROM dim_pub_city) A WHERE ROWNUM <= 18) WHERE RN >= 0",
      function(err, result)
      {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        //打印返回的表结构
        console.log(result.metaData);
        //打印返回的行数据
        console.log(result.rows);
        doRelease(connection);
      });
  });

  function doRelease(connection)
  {
    connection.close(
      function(err) {
        if (err) {
          console.error(err.message);
        }
      });
  }
