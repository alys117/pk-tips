const path = require('path');
module.exports = {
  //打包入口文件路径
  entry: './src/index.js',
  //path打包出口路径，filename写打包后文件名
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js',
  },
};