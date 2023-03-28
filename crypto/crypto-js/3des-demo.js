const cryptoJs = require('crypto-js')

//随机生成指定数量的16进制key
const generatekey = (num) => {
  let library = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let key = ''
  for (var i = 0; i < num; i++) {
    let randomPoz = Math.floor(Math.random() * library.length)
    key += library.substring(randomPoz, randomPoz + 1)
  }
  return key
}
// DES(CBC)加密
const encryptByCBC = function (message, key1, iv1) {
  let key = cryptoJs.enc.Utf8.parse(key1)
  let iv = cryptoJs.enc.Utf8.parse(iv1)
  let srcs = cryptoJs.enc.Utf8.parse(message)
  // 加密模式为CBC，补码方式为PKCS5Padding（也就是PKCS7）
  let encrypted = cryptoJs.TripleDES.encrypt(srcs, key, {
    iv: iv,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.Pkcs7,
  })
  return cryptoJs.enc.Base64.stringify(encrypted.ciphertext) //返回base64
}

// DES(CBC)解密
const decryptByCBC = function (message, key1, iv1) {
  let key = cryptoJs.enc.Utf8.parse(key1)
  let iv = cryptoJs.enc.Utf8.parse(iv1)
  let base64 = cryptoJs.enc.Base64.parse(message)
  let src = cryptoJs.enc.Base64.stringify(base64)
  // 解密模式为CBC，补码方式为PKCS5Padding（也就是PKCS7）
  let decrypt = cryptoJs.TripleDES.decrypt(src, key, {
    iv: iv,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.Pkcs7,
  })
  let decryptedStr = decrypt.toString(cryptoJs.enc.Utf8)
  return decryptedStr.toString()
}

var json_arr = 'hello world'
var key = "xxxxxxxx";
var iv = "xxx_xxxx";
var en_str = encryptByCBC(json_arr, key, iv);  //json_arr是要加密的内容
console.log('加密' + en_str);
var de_str = decryptByCBC(en_str, key, iv);
console.log('解密' + de_str);

// 3DES加密解密验证网站 http://tool.chacuo.net/crypt3des
/* 

[0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 1, 1, 0, 0, 0, 1, 
 0, 0, 0, 0, 0, 0, 0, 0, 
 0, 0, 1, 1, 0, 0, 1, 0, 
 0, 0, 0, 0, 0, 0, 0, 0, 
 0, 0, 1, 1, 0, 0, 1, 1, 
 0, 0, 0, 0, 0, 0, 0, 0, 
 0, 0, 1, 1, 0, 1, 0, 0] 

 [0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 1, 0, 0, 0, 1, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0]
 
 */