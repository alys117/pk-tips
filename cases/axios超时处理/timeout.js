const axios = require('axios');
// axios.get('http://localhost:8077/timeout', {
//   timeout: 2000
// }).then(response => {
//   // 处理成功响应
//   console.log(response.data);
// }).catch(error => {
//   if (error.code === 'ECONNABORTED') {
//     // 超时错误处理
//     console.error('请求超时:', error.message);
//   } else {
//     // 其他错误处理
//     console.error('请求失败:', error.message);
//   }
// });
(async () => {
  try {
    const response = await axios.get('http://localhost:8077/timeout', { timeout: 20000 });
    console.log(response.data);
  }catch (error) {
    if (error.code === 'ECONNABORTED') {
      // 超时错误处理
      console.error('请求超时:', error.message);
    } else {
      // 其他错误处理
      console.error('请求失败:', error.message);
    }
  }

})()