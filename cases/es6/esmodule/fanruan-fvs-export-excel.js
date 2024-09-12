import fetch from 'node-fetch';
import fs from 'fs';
import { dirname } from 'path'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
// header中带上sessionid就可以导出了 const sessionid = duchamp.SessionMgr.getSessionID();
const sessionid = '66d6b2e2-d749-4381-8626-4ad1690a5554'
const widgetName = '表格' // 这里必须是模板里定义的widgetName
fetch("http://localhost:8075/webroot/decision/view/duchamp/widget/export", {
  headers: {
    ["content-type"]: "application/x-www-form-urlencoded",
    sessionid
  },
  body: "format=excel&type=simple&widgetName=" + encodeURIComponent(cjkEncode(widgetName)) + "&storyIndex=0&isExcel2003=false",
  method: "POST"
}).then(async response => {
  const name = decodeURIComponent(escape(response.headers.get('content-disposition')))
  console.log(name);
  return response.blob()
}).then(blob => {
  //nodejs 将blob转换为文件
  const path1 = path.resolve(__dirname, new Date().getTime()+'.xlsx');
  const writeStream = fs.createWriteStream(path1);
  const reader = blob.stream().getReader();
  readStream(reader);
  function readStream(reader) {
    return reader.read().then(({ done, value }) => {
      if (done) {
        console.log('done');
        return;
      }
      writeStream.write(value);
      return readStream(reader);
    })
  }
})

function cjkEncode(text) {
  if (text == null) {
    return "";
  }
  var newText = "";
  for (var i = 0; i < text.length; i++) {
    var code = text.charCodeAt(i);
    if (code >= 128 || code == 91 || code == 93) {
      //91 is "[", 93 is "]".
      newText += "[" + code.toString(16) + "]";
    }
    else {
      newText += text.charAt(i);
    }
  }
  return newText;
}

var cjkDecode = function (text) {
  if (text == null) {
    return ""
  }
  if (!isNaN(text) || text.indexOf("[") == -1) {
    return text
  }
  var newText = "";
  for (var i = 0; i < text.length; i++) {
    var ch = text.charAt(i);
    if (ch == "[") {
      var rightIdx = text.indexOf("]", i + 1);
      if (rightIdx > i + 1) {
        var subText = text.substring(i + 1, rightIdx);
        if (subText.length > 0) {
          ch = String.fromCharCode(eval("0x" + subText))
        }
        i = rightIdx
      }
    }
    newText += ch
  }
  return newText
}