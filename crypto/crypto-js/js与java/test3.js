const CryptoJS = require('crypto-js')

const wordArray = CryptoJS.enc.Base64.parse('xbZmgrx2DXPsfSOMeMwqkFCyYX=');
console.log('wordArray :>> ', wordArray);
let key = CryptoJS.SHA1(CryptoJS.SHA1(wordArray)).toString().substring(0, 32); // sha1prng
key = CryptoJS.enc.Hex.parse(key);
//解密方法
decrypt = function (word) {
    let srcs = CryptoJS.enc.Base64.parse(word);
    let decrypted = CryptoJS.AES.decrypt({ ciphertext: srcs }, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    let content = decrypted.toString(CryptoJS.enc.Utf8);
    return content;
}
 
//加密方法
encrypt = function (word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}
var a1 = encrypt('http://hfx.net/i/7mwjNg')
var a2 = decrypt(a1)
console.log('密文 :>> ', a1);
console.log('解密 :>> ', a2);