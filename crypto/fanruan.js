const crypto = require('crypto');
const { Buffer } = require('buffer');

// RSA 加密的片段长度
const FRAGMENT_LENGTH = 245;

/**
 * 将 Base64 编码的公钥字符串转换为 PEM 格式
 * @param {string} base64Key - Base64 编码的公钥
 * @returns {string} - PEM 格式的公钥
 */
function base64ToPem(base64Key) {
    return `-----BEGIN PUBLIC KEY-----\n${base64Key}\n-----END PUBLIC KEY-----`;
}

/**
 * 使用 RSA 公钥加密数据
 * @param {string} plainText - 要加密的文本
 * @param {string} publicKey - Base64 编码的公钥
 * @returns {string} - Base64 编码的加密结果
 */
function encrypt(plainText, publicKey) {
    // 将 Base64 公钥转换为 PEM 格式
    const pemKey = base64ToPem(publicKey);

    // 创建加密对象
    const encryptor = crypto.publicEncrypt(
        {
            key: pemKey,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(plainText, 'utf8')
    );

    // 返回 Base64 编码的加密结果
    return encryptor.toString('base64');
}

/**
 * 分段加密
 * @param {Buffer} data - 要加密的数据
 * @param {Object} publicKey - PEM 格式的公钥
 * @returns {Buffer} - 加密后的数据
 */
function dealEncryptFragment(data, publicKey) {
    const result = [];
    for (let i = 0; i < data.length; i += FRAGMENT_LENGTH) {
        const fragment = data.slice(i, i + FRAGMENT_LENGTH);
        const encryptedFragment = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_PADDING,
            },
            fragment
        );
        result.push(encryptedFragment);
    }
    return Buffer.concat(result);
}

// 示例用法
const publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkyP6/Ov6eQEgsmgUKqY3X5pH48iy1MUm
YVEaYJnbSRSfhDXvh6Ip7VenHemH19N2UELjTFNOEBIRh/3lyYyuiUswEKK8mnGi2AkBCs4PN+Xt
JakEcuqXsIa3TekQZOUQYHUb5oCYlUdwj5X93XdWrpVFAvTXiY/U8TeEy3vRZzq1bz5kkTZr6lOH
CyyGEMiscyJaAL9cXeVRsc71Mp/VY0RlyqIrOknuuI8SP7Vvu1XFXtIzJH5wSWow+6S/ejBf+k7c
lxosyWVz0bQ41htkmpvAt6UElybRWxN2dvInWSaN98GjSr09aq/0dGnLR187KvjXCegZu8Z4yRSG
eEW6OwIDAQAB`;

const plainText = 'admin';
const encryptedText = encrypt(plainText, publicKey);
console.log('Encrypted Text:', encryptedText);
console.log('--------');
console.log(encodeURI(encryptedText))
console.log('--------');
console.log(encodeURIComponent(encryptedText))