console.log('TL2rUVyoEaDvDuSfwYNgFwhLczQGwqqf' === 'TL2rVUyoEaDvDuSfwYNgFwhLczQGWqqf');
const axios = require('axios')
const coordtransform = require('coordtransform');

// https://api.map.baidu.com/geoconv/v1/?coords=114.21892734521,29.575429778924&from=1&to=5&ak=你的密钥 //GET请求
const url = 'https://api.map.baidu.com/geoconv/v1/?coords=119.52466,35.39238&from=1&to=5&ak=TL2rVUyoEaDvDuSfwYNgFwhLczQGWqqf'
// [Running] node "d:\work\projects\pk-tips\cases\bmap\geoconv.js"
// {
//   status: 0,
//   result: [ { x: 119.53650015688909, y: 35.39838957047481 } ]
// }
// const coords = '119.52466,35.39238;120.38445,36.11785;115.334980,35.227810;119.205810,36.438530;115.42848,35.22887;119.908310,36.325690;120.102830,37.458090;116.028610,37.177630;120.649630,37.552880;120.486430,36.158990;117.182110,37.077010;116.58945,35.74404;118.151490,36.749380;117.12304,37.28565;117.781450,35.014450;117.73002,37.52818;117.668210,37.728910;116.972130,36.650720;120.00088,36.24849;117.18196,35.08432;118.486020,37.462130;115.540210,35.248670;120.49391,36.13707;117.28281,35.64565;121.606820,37.430020;121.462780,37.361110'
const coords = '120.2262356893818,36.00371278606858'
console.log('origin 84:', coords);
let url1 = `https://api.map.baidu.com/geoconv/v1/?coords=${coords}&from=1&to=5&ak=TL2rVUyoEaDvDuSfwYNgFwhLczQGWqqf`
const res = axios({
  url: url1,
  method: 'GET'
}).then(res => {
  console.log(res.data);
  const [x, y] = [res.data.result[0].x, res.data.result[0].y];
  const coords_gcj02 = coordtransform.bd09togcj02(x, y);
  const coords_wgs84 = coordtransform.gcj02towgs84(...coords_gcj02) 
  console.log('http接口转bd09', [x, y]);
  console.log(coords_gcj02);
  console.log(coords_wgs84);
  console.log('-----------------------');
  const _84 = coords.split(',')
  const _gcj = coordtransform.wgs84togcj02(..._84);
  const _bd = coordtransform.gcj02tobd09(..._gcj);
  const _gcj_ = coordtransform.bd09togcj02(..._bd);
  const _84_ = coordtransform.gcj02towgs84(..._gcj_);
  console.log(_bd);
  console.log(_84_);
})
