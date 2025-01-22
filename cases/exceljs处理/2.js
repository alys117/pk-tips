const ExcelJS = require('exceljs');
const fs = require('fs');
(async function(){
  const workbook = new ExcelJS.Workbook();
const data = await workbook.xlsx.readFile('c:/users/drunk/desktop/1.xlsx');

const worksheet = workbook.worksheets[0];
const workbook = new ExcelJS.Workbook();

})()