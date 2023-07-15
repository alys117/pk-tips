//excel.js
const XLSXS = require("xlsx-js-style");
const path = require("path");
console.log(path.resolve(__dirname,'./1.xlsx'));
var workbook = XLSXS.readFile(path.resolve(__dirname,'./1.xlsx')) 
var worksheet = workbook.Sheets[workbook.SheetNames['0']]
function aa(worksheet) {
  let workbook = XLSXS.utils.book_new(); // 工作簿

  //以下是样式设置，样式设置放在组织完数据之后，xlsx-js-style的核心API就是SheetJS的

  Object.keys(worksheet).forEach((key, i) => {
    //表头设置
    worksheet[key].s = {
      font: {
        bold: true,
        sz: 11,
        name: "宋体",
      },
      // alignment 对齐方式
      alignment: {
        vertical: "center", // 垂直居中
        horizontal: "center",
      },
      // border 边框属性
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
      // fill 颜色填充属性
      fill: {
        fgColor: { rgb: "FFFFFF" },
      },
    };
  });
  XLSXS.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSXS.writeFile(workbook, path.resolve(__dirname, "./222.xlsx"));
};
aa(worksheet)