const JSEncrypt = require('node-jsencrypt') // jsencrypt 不支持 commonjs
const encrypt = new JSEncrypt()
encrypt.setPublicKey(
  // '-----BEGIN PUBLIC KEY-----'+
'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCeFQt++HsOTay8e/NZ0SsOKNXionO7s0TD8yaxZmtLa7sYdQcuDb7MC1nz9BkFP1KOICuF6sAdurYvCU2FKGRkKIG35QAuESg7kAgFNFWmbI2Ify3Bm+S8YbBe1ZW8z4q0OPskPE4nYMOmWGEj0RgKWSGCa91t6uVCfzA4MVRsoQIDAQAB'
// +'-----END PUBLIC KEY-----'
)  
/* 
  1、秘钥有没有 -----BEGIN PUBLIC KEY----- 不影响
  2、秘钥里有没有换行也不影响
 */
const str = 'userId=tom&age=3'
const encodeData = encrypt.encrypt(str)
const urlsafedata = encodeData.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '')
console.log(encodeData);
console.log(urlsafedata);


const decrypt = new JSEncrypt()
decrypt.setPrivateKey(
  '-----BEGIN PRIVATE KEY-----'+
'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAJ4VC374ew5NrLx781nRKw4o1eKic7uzRMPzJrFma0truxh1By4NvswLWfP0GQU/Uo4gK4XqwB26ti8JTYUoZGQogbflAC4RKDuQCAU0VaZsjYh/LcGb5LxhsF7VlbzPirQ4+yQ8Tidgw6ZYYSPRGApZIYJr3W3q5UJ/MDgxVGyhAgMBAAECgYBnJYAsxuE0QgZ1rcLpVgvr30U/7ZPqY1x5JsyWcCeOPKsFmEapDBr0dGurPBifTeQGDIOZi8TzIQMCyeUk/2gQ0yeCQk/0/7Drsv8cebwdzugtxbJaKYcdii6TI1r46AO8+nDj835gZb7wBvtOJaFMXwAEEs7SFqFdD1Xi/vWT4QJBANclCIlYaHTiJXEmi7rJSDjyYacYxXmhPjxUhXPwdg/KtC9oLJ1yyTUkeY4RCYu5CJTQTsqCqfxfE16vWdAJ8B0CQQC8Gf9dRTx4ke25L+cGYtXkWu9ljp8435sEg/auLY3mboQpPn5gi9F411rT8YHYj8MPqZsP7yHpvParPmQm7g9VAkANYJ0eRSQBmIoxde8cRyW5fMC7rhuhS3heMfc2VU5R/w2jIPwdMiT2q/Tu83o/eNrive0YRHWjXpoKuiaAfA21AkBtpVHf0o4PUjEac7vdUxuPQxqtPle91UoNdccDfPZsThun1w/fw2DVaeM+DFc+H3760EjdHu3LzCSVaYcD0l0JAkBISb10PkmMLUvvKFJRX5c8PWLbBSFsVHreB4J0FfdkQT65oQz8ejTxr/x3pYRzEbA9JBjhq24BYoxEo2mmYLLw'
+'-----END PRIVATE KEY-----'
)
const decodeData = decrypt.decrypt(encodeData)
const decodeData2 = decrypt.decrypt(urlsafedata)
console.log('解密',decodeData,decodeData2);

/* 
结论： jsencrypt 无法解密urlsafe的加密串
*/
