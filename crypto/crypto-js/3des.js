const CryptoJS = require("crypto-js");

function encryptByDES(message, key) {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

function decryptByDES(ciphertext, key) {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var decrypted = CryptoJS.TripleDES.decrypt(ciphertext, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

var message = "user";
var key1 = "12345678";
var key2 = "aaaaaaaa";
var key3 = "cccccccc";
var ciphertext = encryptByDES(message, key1);
console.log(ciphertext);
ciphertext = encryptByDES(ciphertext, key2);
ciphertext = encryptByDES(ciphertext, key3);
console.log("加密后的数据：" + ciphertext);

var plaintext = decryptByDES(ciphertext, key3);
plaintext = decryptByDES(plaintext, key2);
plaintext = decryptByDES(plaintext, key1);
console.log("解密后的数据：" + plaintext);
