const JSZip = require('jszip');
const fs = require('fs');
const zip = new JSZip();
fs.readFile("c:/users/drunk/desktop/3.xlsx", (err, data) => {
  if (err) throw err;
  zip.loadAsync(data).then(zipData => {
    console.log(Object.keys(zipData.files))
    const imageFiles = Object.keys(zipData.files).filter(path => path.startsWith('xl/media/'));
    imageFiles.forEach(async path => {
      const base64 = await zip.file(path).async('base64');
      console.log(`Image Path: ${path}`);
    });

    const a = Object.keys(zipData.files).filter(path => path.endsWith('xml'));
    a.forEach(async path => {
      const xml = await zip.file(path).async('text');
      console.log(`text Path: ${path}`);
      console.log(xml);
      console.log('==========================');
      // const xmlDoc = parser.parseFromString(drawingXml, "text/xml");
      // const anchors = xmlDoc.getElementsByTagName("xdr:from");

      // // 示例：获取第一个图片的起始单元格（行、列）
      // const col = anchors[0].getElementsByTagName("xdr:col")[0].textContent;
      // const row = anchors[0].getElementsByTagName("xdr:row")[0].textContent;
      // console.log(`图片位于单元格: 行 ${row}, 列 ${col}`);
    });
  });
})
