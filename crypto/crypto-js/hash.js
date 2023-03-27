const CryptoJS = require("crypto-js");
var hash1 = CryptoJS.SHA1("Message");
console.log(hash1.toString());
var hash2 = CryptoJS.SHA256("Message");
console.log(hash2.toString());
console.log(hash2.toString(CryptoJS.enc.Base64));
console.log(hash2.toString(CryptoJS.enc.Hex));


console.log('--------------------------');
var words = CryptoJS.enc.Utf8.parse('user');
var utf8  = CryptoJS.enc.Utf8.stringify(words);

console.log(words, utf8);


var words  = CryptoJS.enc.Base64.parse('dXNlcg==');
var base64 = CryptoJS.enc.Base64.stringify(words);
var utf8   = CryptoJS.enc.Utf8.stringify(words);
console.log(words, base64, utf8);


var words = CryptoJS.enc.Hex.parse('48656c6c6f2c20576f726c6421');
var hex   = CryptoJS.enc.Hex.stringify(words);
var utf8   = CryptoJS.enc.Utf8.stringify(words);
console.log(words, hex, utf8);

