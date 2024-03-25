const CryptoJS = require("crypto-js");
// DES加密
const encryptDes = (message, key) => {
  const keyHex = CryptoJS.enc.Base64.parse(key);
  const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

// DES解密
const decryptDes = (ciphertext, key) => {
  const keyHex = CryptoJS.enc.Base64.parse(key);
  // direct decrypt ciphertext
  const decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}



const key = "FQGSUuCrgL8="
const encoded = encryptDes('zhujinqi', key);
console.log('encoded :>> ', encoded);
const decoded = decryptDes(encoded, key);
console.log('decoded :>> ', decoded);



const x = new Int8Array([21, 1, -110, 82, -32, -85, -128, -65]);


function arrayBufferToBase64(array) {
  array = new Uint8Array(array);
  var length = array.byteLength;
  var table = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', '0', '1', '2', '3',
    '4', '5', '6', '7', '8', '9', '+', '/'];
  var base64Str = '';
  for (var i = 0; length - i >= 3; i += 3) {
    var num1 = array[i];
    var num2 = array[i + 1];
    var num3 = array[i + 2];
    base64Str += table[num1 >>> 2]
      + table[((num1 & 0b11) << 4) | (num2 >>> 4)]
      + table[((num2 & 0b1111) << 2) | (num3 >>> 6)]
      + table[num3 & 0b111111];
  }
  var lastByte = length - i;
  if (lastByte === 1) {
    var lastNum1 = array[i];
    base64Str += table[lastNum1 >>> 2] + table[((lastNum1 & 0b11) << 4)] + '==';
  } else if (lastByte === 2) {
    var lastNum1 = array[i];
    var lastNum2 = array[i + 1];
    base64Str += table[lastNum1 >>> 2]
      + table[((lastNum1 & 0b11) << 4) | (lastNum2 >>> 4)]
      + table[(lastNum2 & 0b1111) << 2]
      + '=';
  }
  return base64Str;
}

console.log(arrayBufferToBase64([21, 1, -110, 82, -32, -85, -128, -65]), '值一样');
console.log(arrayBufferToBase64([21, 1, 146, 82, 224, 171, 128, 191]), '值一样');
const buf = Buffer.from('FQGSUuCrgL8=', 'base64')
console.log(buf);



const buffer = Buffer.from([21, 1, -110, 82, -32, -85, -128, -65]);
const numberArray = Array.from(buffer).map(byte => parseInt(byte, 10));
 
console.log(numberArray);