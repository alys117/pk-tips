const crypto = require("crypto");
const fs = require("fs");
 
/* 
可以在gitbash里面运行命令
openssl genrsa -out pkcs1.pem 1024
openssl pkcs8 -topk8 -inform PEM -in pkcs1.pem -outform PEM -nocrypt -out pkcs8.pem  //生成pkcs1的私钥，java需要pkcs8的
openssl rsa -in pkcs1.pem -outform PEM -pubout -out pub.pem // 生成pkcs8的公钥
*/
let privateKey = fs.readFileSync("./crypto/rsa/pkcs1.pem");
let publicKey = fs.readFileSync("./crypto/rsa/pub.pem");

// publicKey = '-----BEGIN PUBLIC KEY-----\n'+'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+NltwN+4J1lTTCyWEd7nCPN+ibu1iC/00EzYonIAG7mztpCn0YKJdkVix1IW2XQWYF3uriC7LRRhjbPp1dF2ZB/4FH36fwsgoKY489c/FLcl9Gtdn+JBcDELw3i44Jvja/QFZKiUObaEHzMSYBxSe4AIhnpBP1vCZzW5CT46M+QIDAQAB\n'+'-----END PUBLIC KEY-----'
publicKey = '-----BEGIN PUBLIC KEY-----\n'+'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+NltwN+4J1lTTCyWEd7nCPN+ibu1iC/00EzYonIAG7mztpCn0YKJdkVix1IW2XQWYF3uriC7LRRhjbPp1dF2ZB/4FH36fwsgoKY489c/FLcl9Gtdn+JBcDELw3i44Jvja/QFZKiUObaEHzMSYBxSe4AIhnpBP1vCZzW5CT46M+QIDAQAB\n'+'-----END PUBLIC KEY-----'
// privateKey = '-----BEGIN PRIVATE KEY-----\n'+'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAL42W3A37gnWVNMLJYR3ucI836Ju7WIL/TQTNiicgAbubO2kKfRgol2RWLHUhbZdBZgXe6uILstFGGNs+nV0XZkH/gUffp/CyCgpjjz1z8UtyX0a12f4kFwMQvDeLjgm+Nr9AVkqJQ5toQfMxJgHFJ7gAiGekE/W8JnNbkJPjoz5AgMBAAECgYBuy37LiOiQtlXGcHG0DYEYURj6pp6DQ/SDBsW/Nhmk7/BnI/6EKF2rHuSJAP+5z8lYZCVXLwYCxQaFs47YJ6X0YjC2ry60J5y+rU+m8E7nmve6VD6mX9k0hG79euK+5T38qeb7BJHCOhbleUciT+uy3FCpcibn4Slk20eQGBKDYQJBAOjGkbqDpj4tL7M8Km+xArNpM4n3Ujfs4f+faMpMiDkMvrX4uI9h0h1Oa+JMCMDh8M8byW0gYiQoDwnA+A1/9o0CQQDRMKiFalPqIVUuS2QxBTW7A6q87ZZD+W78lm2oBMMD301oSPyWwrUJ4yfwV2hDpknZdOe2XSavyK0RhNfF+dsdAkEAzL27eD5Lfuznw9Lr0In1QjEKMBPlsWMd9WUVGrruJp/bLtuyGguEcFqF8enG2UDiOojKRr3xFLRXZdDhXZ5sEQJBAKMQOOz2uz7QiOOzZQBJPV7wNtFaqj2GXBuM7yF/xLxp/p8B9dNXJ2PzrBhPKjlBkGNwG4cuCZAQ78euM7xhTYkCQEcodfo1zIuM6ktlKvs1L41YyF7Wmo3Mt1ua9WdYuoZ/FoyE3wdo7/Ss5SRUGAbYyugvf1wAZPb7NZUEc+95oBs=\n'+'-----END PRIVATE KEY-----'
privateKey = '-----BEGIN PRIVATE KEY-----\n'+'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAL42W3A37gnWVNMLJYR3ucI836Ju7WIL/TQTNiicgAbubO2kKfRgol2RWLHUhbZdBZgXe6uILstFGGNs+nV0XZkH/gUffp/CyCgpjjz1z8UtyX0a12f4kFwMQvDeLjgm+Nr9AVkqJQ5toQfMxJgHFJ7gAiGekE/W8JnNbkJPjoz5AgMBAAECgYBuy37LiOiQtlXGcHG0DYEYURj6pp6DQ/SDBsW/Nhmk7/BnI/6EKF2rHuSJAP+5z8lYZCVXLwYCxQaFs47YJ6X0YjC2ry60J5y+rU+m8E7nmve6VD6mX9k0hG79euK+5T38qeb7BJHCOhbleUciT+uy3FCpcibn4Slk20eQGBKDYQJBAOjGkbqDpj4tL7M8Km+xArNpM4n3Ujfs4f+faMpMiDkMvrX4uI9h0h1Oa+JMCMDh8M8byW0gYiQoDwnA+A1/9o0CQQDRMKiFalPqIVUuS2QxBTW7A6q87ZZD+W78lm2oBMMD301oSPyWwrUJ4yfwV2hDpknZdOe2XSavyK0RhNfF+dsdAkEAzL27eD5Lfuznw9Lr0In1QjEKMBPlsWMd9WUVGrruJp/bLtuyGguEcFqF8enG2UDiOojKRr3xFLRXZdDhXZ5sEQJBAKMQOOz2uz7QiOOzZQBJPV7wNtFaqj2GXBuM7yF/xLxp/p8B9dNXJ2PzrBhPKjlBkGNwG4cuCZAQ78euM7xhTYkCQEcodfo1zIuM6ktlKvs1L41YyF7Wmo3Mt1ua9WdYuoZ/FoyE3wdo7/Ss5SRUGAbYyugvf1wAZPb7NZUEc+95oBs=\n'+'-----END PRIVATE KEY-----'
const content = "hello world!"; // 待加密的明文内容
 
// 公钥加密
const encodeData = crypto.publicEncrypt(publicKey, Buffer.from(content));
console.log(encodeData.toString("base64"));
const urlsafestr = encodeData.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '')
console.log(urlsafestr);
// 私钥解密
// const decodeData = crypto.privateDecrypt(privateKey, encodeData);
const decodeData = crypto.privateDecrypt(privateKey, Buffer.from(urlsafestr,'base64'));
console.log(decodeData.toString("base64"));