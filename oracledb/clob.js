const fs = require('fs')
var oracledb = require('oracledb');
var config = {
  user: 'sdbass',　　//用户名
  password: 'ibmdb2',　　//密码
  //IP:数据库IP地址，PORT:数据库端口，SCHEMA:数据库名称
  connectString: "192.168.0.252:1521/orclpdb"
};
oracledb.fetchAsString = [oracledb.CLOB];
oracledb.getConnection(
  config,
  async function (err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    const arr = ['sdbass_test', 'count_dim_pub_city']
    for (let i = 0; i < 2; i++) {
      //查询某表十条数据测试，注意替换你的表名
      try {
        const result = await connection.execute(`SELECT DBMS_METADATA.GET_DDL('PROCEDURE', 'PROC_${arr[i].toUpperCase()}', 'SDBASS') as c FROM DUAL`)
        console.log(result.metaData);
        console.log(result.rows[0][0]);
        console.log('----------------');
        fs.writeFile(`c:/Users/drunk/Desktop/${arr[i]}.txt`, result.rows[0][0], (err) => {
          if (err) {
            console.log(err)
          } else {
            console.log(`${arr[i]} 写文件成功`)
          }
        })
        
      } catch (error) {
        console.error('无此存储过程: '+arr[i])
      }
    }

    doRelease(connection);
  }
);

function doRelease(connection) {
  connection.close(
    function (err) {
      if (err) {
        console.error(err.message);
      }
    });
}
