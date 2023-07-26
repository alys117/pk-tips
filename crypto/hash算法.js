function sha256(message) {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256');
    hash.update(message);
    return hash.digest();
  }
  
  const message = 'Hello World';
  const hashedMessage = sha256(message);
  console.log(hashedMessage.toString('hex')); // 输出：a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e
  // echo -n "Hello World"| sha256sum # 输出：a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e