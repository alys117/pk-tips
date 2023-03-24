const CryptoJS = require("crypto-js");

//加密
const a = CryptoJS.DES.encrypt('userid=lihanzhang&usercityid=999', 'myKey').toString();
console.log(a);
var decrypted = CryptoJS.DES.decrypt(a, "myKey");
console.log(decrypted);
console.log(decrypted.toString(CryptoJS.enc.Utf8));