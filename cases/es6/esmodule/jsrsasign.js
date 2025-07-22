import jsrsasign from "jsrsasign";
// const header = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
// const payload = JSON.stringify({ sub: 'Alice', exp: Math.floor(Date.now() / 1000) + (60 * 60) }); // 1小时后过期
// const secret = 'FineReport2018'; // 确保这是一个256位的密钥，例如使用crypto模块生成或手动创建的32字节字符串

// const jwt = jsrsasign.jws.JWS.sign(null, { alg: 'HS256', jwk: { k: jsrsasign.b64utos(jsrsasign.hextob64(jsrsasign.HASH.sha256(secret))) } }, header + "." + payload);
// console.log("Generated JWT:", jwt);

 
// 设置头部信息
const header = { alg: "HS256", typ: "JWT" };
 
// 设置JWT有效载荷
const payload = {
  sub: "Alice", 
  exp: Math.floor(Date.now() / 1000) + 600, // 过期时间（当前时间戳加10分钟）
};
 
let token = jsrsasign.jws.JWS.sign(
  "HS256",
  JSON.stringify(header),
  JSON.stringify(payload),
  "FineReport2018"
);
 
console.log(token);
