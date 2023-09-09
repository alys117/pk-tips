// 加密：
    // 转换秘钥
const CryptoJS = require('crypto-js');
const SECRET_KEY = 'xbZmgrx2DXPsfSOMeMwqkFCyYX='

var SHA1PRNG = require('./sha1prng');
var result = SHA1PRNG(SECRET_KEY)
console.log('SHA1PRNG :>>', result.toString('hex'));
let realKey = CryptoJS.SHA1(CryptoJS.SHA1(SECRET_KEY)).toString().substring(0, 32); //真正的key
console.log('realKey :>> ', realKey);

let message = 'http://hfx.net/i/7mwjNg'
let key =  CryptoJS.enc.Hex.parse(realKey);
let srcs = CryptoJS.enc.Utf8.parse(message);
let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
let cipherText = encrypted.toString();
console.log('cipherText :>> ', cipherText);
 
 
// 解密:
let content1 = CryptoJS.enc.Base64.parse(cipherText);
let decrypt = CryptoJS.AES.decrypt({ciphertext: content1}, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
let content = decrypt.toString(CryptoJS.enc.Utf8);
console.log("解密 :>>", content);




function stringToBytes(param,ascii) { //该方法只适用于utf-8编码和ascii编码(适用于生成文件),参数为string
    var bytes = new Array();
    if (ascii) {
        for (var i=0;i<param.length;i++) {
            bytes.push(param.charCodeAt(i));
        }
        return bytes;
    }
    for (var i=0;i<param.length;i++) {
        var c = param.charCodeAt(i);
        if (c == 0) { //兼容ascii编码向utf8转码,一般用不到
            bytes.push(0xe3); //0xe3=227
            bytes.push(0x84); //0x84=132
            bytes.push(0x80); //0x80=128
        } else if (c < 0x80) { //c < 128,首位为0,剩余7位
            bytes.push(c);
        } else if (c < 0x100) { //c < 256,兼容ascii编码向utf8转码,一般用不到
            bytes.push(0xc2); //0xc2=194
            bytes.push(c);
        } else if (c < 0x800) { //c < 2048,首位为110,表示该起始字节有1个后续字节,剩余5位
            bytes.push(((c >> 6) & 0x1f) | 0xc0); //0xC0=11000000,&0x1f表示取低5位(高位补0)
            bytes.push((c & 0x3f) | 0x80); //0x80=10000000,&0x3f表示取低6位(对64求余)
        } else if (c < 0x10000) { //c < 65536,首位为1110,表示该起始字节有2个后续字节,剩余4位
            bytes.push(((c >> 12) & 0x0f) | 0xe0); //0xE0=11100000,&0x0f表示取低4位(对16求余,高位补0)
            bytes.push(((c >> 6) & 0x3f) | 0x80);
            bytes.push((c & 0x3f) | 0x80);
        } else if (c < 0x10ffff) { //c < 2097152,首位为11110,表示该起始字节有3个后续字节,剩余3位
            bytes.push(((c >> 18) & 0x07) | 0xf0); //0xF0=11110000,&0x07表示取低3位(高位补0)
            bytes.push(((c >> 12) & 0x3f) | 0x80);
            bytes.push(((c >> 6) & 0x3f) | 0x80);
            bytes.push((c & 0x3f) | 0x80);
        } else return null; //超过0x10ffff,属于不合法字符
    }
    return bytes;
}
function bytesToString(params,ascii) { //该方法只适用于utf-8编码和ascii编码,参数为byte数组
    var result = "";
    if (ascii) {
        for (var i=0;i<params.length;i++) {
            result += String.fromCharCode(params[i]);
        }
        return result;
    }
    for (var i=0;i<params.length;i++) {
        if (params[i] >= 0xf8) { //超过0xf8=11111000,属于不合法字符
            result += String.fromCharCode(params[i]);
        } else if (params[i] >= 0xf0) { //0xf0=11110000,表示该起始字节有3个后续字节
            var bits = (params[i] & 0x07) << 18 | (params[i+1] & 0x3f) << 12 | (params[i+2] & 0x3f) << 6 | (params[i+3] & 0x3f);
            result += String.fromCharCode(bits);
            i += 3;
        } else if (params[i] >= 0xe0) { //0xe0=11100000,表示该起始字节有2个后续字节
            var bits = (params[i] & 0x0f) << 12 | (params[i+1] & 0x3f) << 6 | (params[i+2] & 0x3f);
            result += String.fromCharCode(bits);
            i += 2;
        } else if (params[i] >= 0xc0) { //0xc0=11000000,表示该起始字节有1个后续字节
            var bits = (params[i] & 0x1f) << 6 | (params[i+1] & 0x3f);
            result += String.fromCharCode(bits);
            i++;
        } else { //[227,132,128],[194,128]的情形已经融入到上面的判断语句中
            result += String.fromCharCode(params[i]);
        }
    }
    return result;
}

