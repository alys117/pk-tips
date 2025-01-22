const crypto = require("crypto");

const publicKey = `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkyP6/Ov6eQEgsmgUKqY3X5pH48iy1MUm
YVEaYJnbSRSfhDXvh6Ip7VenHemH19N2UELjTFNOEBIRh/3lyYyuiUswEKK8mnGi2AkBCs4PN+Xt
JakEcuqXsIa3TekQZOUQYHUb5oCYlUdwj5X93XdWrpVFAvTXiY/U8TeEy3vRZzq1bz5kkTZr6lOH
CyyGEMiscyJaAL9cXeVRsc71Mp/VY0RlyqIrOknuuI8SP7Vvu1XFXtIzJH5wSWow+6S/ejBf+k7c
lxosyWVz0bQ41htkmpvAt6UElybRWxN2dvInWSaN98GjSr09aq/0dGnLR187KvjXCegZu8Z4yRSG
eEW6OwIDAQAB\n-----END PUBLIC KEY-----`;

// 公钥加密
const encodeData = crypto.publicEncrypt({
  key: publicKey,
  padding: crypto.constants.RSA_PKCS1_PADDING,
}, Buffer.from('admin1'));
console.log(encodeData.toString("base64"));
const urlsafestr = encodeData.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '')
console.log(urlsafestr);
