// server.js
const express = require('express');
const app = express();

app.get('/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  // 设置流式响应头
  res.setHeader('Content-Type', 'application/json'); // 无所谓,可以不设置，但是开发者模式里不好观察response
  res.setHeader('Transfer-Encoding', 'chunked');

  const messages = ['Hello', ' ', 'World', '!', '🚀'];
  let index = 0;

  const sendChunk = (isFinal = false) => {
    res.write(JSON.stringify(messages[index++]) + '\n'); // 必须加换行符
    
    if (!isFinal && index < messages.length) {
      setTimeout(sendChunk, 500); // 改用递归保证顺序
    } else {
      res.end(); // 显式结束响应
    }
  };

  sendChunk(); // 启动发送
 
});

app.listen(3000, () => console.log('Server running on port 3000'));
