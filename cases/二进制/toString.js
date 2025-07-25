const str = 'abc中文'
const buf = Buffer.from(str, 'utf-8');
console.log(1, buf);
let encoder = new TextEncoder();

// 字符 转 Uint8Array
let uint8Array = encoder.encode(str);
console.log(2, uint8Array);
console.log(3, uint8Array.buffer);

const str2 = buf.toString('latin1')
console.log(4, str2);
const buf2 = Buffer.from(str2, 'latin1');
// 字符 转 Uint8Array
let uint8Array2 = encoder.encode(str2);
console.log(4.1, uint8Array);
console.log(4.2, uint8Array.buffer);

console.log(5, buf2);
console.log(buf.equals(buf2));
const str3 = buf.toString('utf-8')
console.log(6, str3);


