const XLSX = require("xlsx");
const path = require("path");
console.log(path.resolve(__dirname,'./1.xlsx'));
var workbook = XLSX.readFile(path.resolve(__dirname,'./1.xlsx')) 

XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames['0']]).forEach((item) => {   console.log(item); })

