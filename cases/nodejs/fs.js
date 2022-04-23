const fs = require('fs');
const path = require('path');
const axios = require('axios');

(async () => {
  const res = await axios({
    method: 'get',
    // url: 'http://192.168.0.249/suiseiseki.jpg',
    url: 'http://192.168.0.113:8086/video',
    responseType: 'arraybuffer'
  })
  console.log(res.headers);
  const filename = res.headers['content-disposition']?.split('=')[1] || 'noname';
  fs.writeFile(path.resolve(__dirname, filename), res.data, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('写入成功');
    }
  });
})();