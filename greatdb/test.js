
// 原Buffer
const originalBuffer = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x80]); // 包含非UTF8字符

// 编码为Base64字符串
const base64String = originalBuffer.toString('binary'); // "SGVsbG9A"
console.log(base64String);
console.log(originalBuffer.toString('hex'));

// 解码还原Buffer
const restoredBuffer = Buffer.from(base64String, 'binary');

console.log(Buffer.compare(originalBuffer, restoredBuffer) === 0); // true（完全还原）