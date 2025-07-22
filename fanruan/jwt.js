const jwt = require('jsonwebtoken');

// 定义载荷
const payload = {
  sub: 'Alice', // 对应 Java 的 setSubject
  exp: Math.floor((new Date().getTime() + 6000000) / 1000) // 100分钟后的秒级时间戳
};

// 生成 Token
const token = jwt.sign(
  payload, 
  'FineReport2018', // 原始密钥（无需 Base64 编码）
  { algorithm: 'HS256' }
);

console.log(token);