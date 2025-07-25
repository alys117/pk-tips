var mysql      = require('mysql');
const fs = require('fs').promises; // 使用Promise API
var connection = mysql.createConnection({
  host     : '192.168.10.110',
  user     : 'root',
  password : '123.abc',
  database : 'sdbass'
});

async function getData(){
  const prom = new Promise((resolve, reject) => {
    connection.connect();
    // pic字段是blob字段
    connection.query('SELECT pic from a_blob where pic is not null and col2 =3', function (error, results, fields) {
      if (error) throw error;
      console.log(results[0].pic);
      const bin = results[0].pic
      // 如何把str 再转回 二进制数据
      connection.end();
      resolve(bin);
    });
  })
  const data = await prom;
  return data
} 
async function main(){
  try {
    const data = await getData();
    await fs.writeFile('c:/users/drunk/desktop/'+Math.random().toString(16).substring(2)+'.png', data);
    console.log('图片已保存到本地');
  } catch (err) {
    console.error('操作失败:', err);
  }
}

main()
