var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'mysql.sqlpub.com',
  user     : 'panke20231011',
  password : 'c2595211ed6fe8a5',
  database : 'test20231011'
});

async function getData(){
  const prom = new Promise((resolve, reject) => {
    connection.connect();
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results[0].solution);
      connection.end();
      resolve(results[0].solution);
    });
  })
  const data = await prom;
  return data
} 
async function main(){
  const data = await getData();
  console.log(data, 'data');
}

main()
