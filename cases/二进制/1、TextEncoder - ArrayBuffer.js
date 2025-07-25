let encoder = new TextEncoder();

// 字符 转 Uint8Array
let uint8Array = encoder.encode("你好啊");

console.log(uint8Array)

// Uint8Array 转 ArrayBuffer
let arrayBuffer = uint8Array.buffer
console.log(arrayBuffer)
