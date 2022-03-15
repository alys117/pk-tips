const crypto = require("crypto");
const fs = require("fs");
 
const privateKey = fs.readFileSync("./crypto/rsa/rsa-prv.pem");
const publicKey = fs.readFileSync("./crypto/rsa/rsa-pub.pem");
 
const content = "hello world!"; // 待加密的明文内容
 
// 公钥加密
const encodeData = crypto.publicEncrypt(publicKey, Buffer.from(content));
console.log(encodeData.toString("base64"));
// 私钥解密
const decodeData = crypto.privateDecrypt(privateKey, encodeData);
console.log(decodeData.toString("utf8"));