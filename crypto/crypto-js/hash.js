const CryptoJS = require('crypto-js')
var hash1 = CryptoJS.SHA1('Message')
console.log(hash1.toString())
var hash2 = CryptoJS.SHA256('Message')
console.log(hash2.toString())
console.log(hash2.toString(CryptoJS.enc.Base64))
console.log(hash2.toString(CryptoJS.enc.Hex))

console.log('--------------------------')
var words = CryptoJS.enc.Utf8.parse('user')
var utf8 = CryptoJS.enc.Utf8.stringify(words)

console.log(words, utf8)

var words = CryptoJS.enc.Base64.parse('dXNlcg==')
var base64 = CryptoJS.enc.Base64.stringify(words)
var utf8 = CryptoJS.enc.Utf8.stringify(words)
console.log(words, base64, utf8)

var words = CryptoJS.enc.Hex.parse('48656c6c6f2c20576f726c6421')
var hex = CryptoJS.enc.Hex.stringify(words)
var utf8 = CryptoJS.enc.Utf8.stringify(words)
console.log(words, hex, utf8)

//和普通base64加密不一样
function base64UrlEncode(str) {
  var encodedSource = CryptoJS.enc.Base64.stringify(str);
  // var reg = new RegExp('/', 'g');
  encodedSource = encodedSource.replace(/=+$/,'').replace(/\+/g,'-').replace(/\//g,'_');
  return encodedSource;
}

let header = JSON.stringify({
 "alg": "HS256",
 "typ": "JWT"
})

let payload =JSON.stringify({
 "name": "panke",
 "role": "admin",
 "expirationData": "2023-10-24 17:05:00"
});
let secretSalt = "user";

let before_sign = base64UrlEncode(CryptoJS.enc.Utf8.parse(header)) + '.' + base64UrlEncode(CryptoJS.enc.Utf8.parse(payload));

let  signature =CryptoJS.HmacSHA256(before_sign, secretSalt);
signature = base64UrlEncode(signature);

let final_sign = before_sign + '.' + signature;
console.log(final_sign);
//final_sign:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2NhciIsInJvbGUiOiJhZG1pbiIsImV4cGlyYXRpb25EYXRhIjoiMjAxOC0xMC0yNCAxNzowNTowMCJ9.bVc48JsxiM7ZZgtZch1QnRpLyt08M9LepwoLvs_aejI


