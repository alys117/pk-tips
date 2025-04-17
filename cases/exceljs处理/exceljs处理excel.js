const { log } = require('async');
const ExcelJS = require('exceljs');
(async function () {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('cases/exceljs处理/1.xlsx');
  // await workbook.xlsx.load(file);
  const worksheet = workbook.getWorksheet(1);
  console.log(worksheet.getCell('C2').value); // 图片是 #VALUE!
  console.log('=========');
  const images = worksheet.getImages();
  // console.log(images);

  for (const image of images) {
    console.log(image.imageId);
    const img = workbook.getImage(+image.imageId);
    console.log(img);
  }
})()
