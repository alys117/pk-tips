const axios = require('axios');
const { Buffer } = require('buffer');
const fs = require('fs');

// 推荐方案 1：直接转换 Buffer
async function fetchBinaryData() {
  try {
    const response = await axios.get('http://localhost:8075/webroot/decision/view/report?viewlet=2.cpt&op=export&format=csv', {
      responseType: 'arraybuffer', // 关键参数
      headers: {
        Accept: 'application/octet-stream'
      }
    });
    fs.writeFileSync('c:/users/drunk/desktop/test.txt', JSON.stringify({content: response.data.toString('utf8')}), {encoding: 'utf-8'} , err=>{
      if(err) {
        console.log(err);
      } else {
        console.log('文件写入成功');
      }
    });

    // 方案1：直接转换 Buffer -> String
    const textData = response.data.toString('utf8'); // 根据实际编码调整
    
    // 方案2：通过 TextDecoder（推荐处理编码不确定的情况）
    // const decoder = new TextDecoder('utf-8');
    // const decodedText = decoder.decode(new Uint8Array(response.data));

    console.log(textData);
    console.log(response.data);
    // return decodedText;
    
  } catch (error) {
    console.error('请求失败:', error);
  }
}

// 测试调用
fetchBinaryData();