const fs = require('fs');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;

// 1. 读取 XML 文件
const xmlStr = fs.readFileSync('cases/解析xml/1.xml', 'utf8');

const doc = new dom().parseFromString(xmlStr);

// XPath: 选择所有 <title> 元素的文本内容
const titles = xpath.select('//book/title/text()', doc);
console.log('所有书籍标题：', titles.map(node => node.data));

// xpath使用的一个例子