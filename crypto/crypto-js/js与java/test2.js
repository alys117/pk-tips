const CryptoJS = require('crypto-js')
var encrypted = CryptoJS.enc.Base64.parse('3Q7r1iqtaRuJCo6QHA9/GhkTmbl4VkitV9ZsD3K2VB7LuBNg4enkJUA1cF8cHyovUH2N/jFz3kbq0QsHfPByCg==');
var key = CryptoJS.enc.Base64.parse('u/Gu5posvwDsXUnV5Zaq4g==');
console.log('key :>> ', key);
var iv = CryptoJS.enc.Base64.parse('5D9r9ZVzEYYgha93/aUK2w==');
var content = CryptoJS.AES.decrypt({ ciphertext: encrypted }, key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv})
// console.log(content);
console.log(CryptoJS.enc.Utf8.stringify(content));


var encrypted = CryptoJS.enc.Base64.parse('tE0sBM7xg5RaOeE9H105nQSbBfKpfHlsCaTwLKuC1ElK7zYMGBdCgoX3RBpsqZiGPuMgjeoPljd6ki2UJsHcmQ==');
var key = CryptoJS.enc.Utf8.parse('chinamobile12345');
var iv = CryptoJS.enc.Utf8.parse('1234567890abcdef');
var content = CryptoJS.AES.decrypt({ ciphertext: encrypted }, key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv})
// console.log(content);
console.log(CryptoJS.enc.Utf8.stringify(content));