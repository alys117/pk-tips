const crypto = require("crypto");
 
const secret = crypto.randomBytes(32); // 密钥
const content = "hello world!"; // 要加密的明文
 
const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    secret,
    Buffer.alloc(16, 0)
);
cipher.update(content, "utf8");
// 加密后的结果：e2a927165757acc609a89c093d8e3af5
const mi = cipher.final("hex")
console.log(mi);


const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    secret,
    Buffer.alloc(16, 0)
);
decipher.update(mi, "hex");
console.log(decipher.final("utf8")); // 解密后的结果：hello world!