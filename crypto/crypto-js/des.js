const CryptoJS = require("crypto-js");

//加密
const a = CryptoJS.DES.encrypt('user', 'asiainfo');
// console.log(a);
console.log(a.ciphertext.toString().toUpperCase());
var decrypted = CryptoJS.DES.decrypt(a, "asiainfo");
// console.log(decrypted);
console.log(decrypted.toString(CryptoJS.enc.Utf8));

console.log('=============以上没有使用初始向量==================');

// des加密方法使用初始向量
function desEncrypt(message, key, iv) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var ivHex = CryptoJS.enc.Utf8.parse(iv);
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString().toUpperCase();
}

// des解密方法初始向量
function desDecrypt(ciphertext, key, iv) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var ivHex = CryptoJS.enc.Utf8.parse(iv);
    var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
    }, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

const text1 = 'user';

const encryptedText = desEncrypt(text1,'asiainfo','123')
console.log(encryptedText);
const decryptedText = desDecrypt(encryptedText,'asiainfo','123')
console.log(decryptedText);