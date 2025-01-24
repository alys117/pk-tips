const XlsxPopulate = require('xlsx-populate');
XlsxPopulate.fromFileAsync("C:/users/drunk/desktop/1.xlsx")
  .then(workbook => {
    const images = workbook.images(); // ### 报错：TypeError: workbook.images is not a function，太味了
    images.forEach(image => {
      const buffer = image.buffer();
      const base64 = buffer.toString('base64');
      console.log(`Image Type: ${image.type}`);
    });
  });