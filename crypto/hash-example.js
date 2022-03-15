const crypto = require("crypto");
const fs = require("fs");
 
function getFileHash(file, algorithm) {
    if (!crypto.getHashes().includes(algorithm)) {
        throw new Error("不支持此哈希函数");
    }
 
    return new Promise(resolve => {
        const hash = crypto.createHash(algorithm);
 
        const rs = fs.createReadStream(file);
        rs.on("readable", () => {
            const data = rs.read();
            if (data) {
                hash.update(data);
            }
        });
        rs.on("end", () => {
            resolve(hash.digest("hex"));
        });
    });
}
 
// 用法：获取文件md5
getFileHash("./package.json", "md5").then(val => {
    console.log(val);
});



 
function encryptData(data, key, algorithm) {
    if (!crypto.getHashes().includes(algorithm)) {
        throw new Error("不支持此哈希函数");
    }
 
    const hmac = crypto.createHmac(algorithm, key);
    hmac.update(data);
    return hmac.digest("hex");
}
 
// output: 12e2df74fc110c05ebf224ae87751bcb13ee9cd76f6d8febefd626054eea6fdf
console.log(encryptData("root", "one piece", "sha256"));