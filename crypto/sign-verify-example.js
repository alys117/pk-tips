const crypto = require("crypto");
const fs = require("fs");
const assert = require("assert");
 
const privateKey = fs.readFileSync("./crypto/rsa/rsa-prv.pem");
const publicKey = fs.readFileSync("./crypto/rsa/rsa-pub.pem");
 
const data = "传输的数据";
 
// 第一步：用私钥对传输的数据，生成对应的签名
const sign = crypto.createSign("sha256");
// 添加数据
sign.update(data, "utf8");
sign.end();
// 根据私钥，生成签名
const signature = sign.sign(privateKey, "hex");
 
// 第二步：借助公钥验证签名的准确性
const verify = crypto.createVerify("sha256");
verify.update(data, "utf8");
verify.end();
assert.ok(verify.verify(publicKey, signature, "hex")); // assert.ok(verify.verify(publicKey, signature.replace('2','1'), "hex"));
