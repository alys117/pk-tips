const XLSX = require("xlsx");
const path = require("path");
console.log(path.resolve(__dirname,'./1.xlsx'));
var workbook = XLSX.readFile(path.resolve(__dirname,'./1.xlsx')) 
var worksheet = workbook.Sheets[workbook.SheetNames['0']]


/* make worksheet */
var ws_data = [
  [ "S", "h", "e", "e", "t", "J", "S" ],
  [  1 ,  2 ,  3 ,  4 ,  5, 6 ]
];
var ws = XLSX.utils.aoa_to_sheet(ws_data);

var wb = XLSX.utils.book_new();
/* Add the worksheet to the workbook */
XLSX.utils.book_append_sheet(wb, worksheet, 'def');
XLSX.utils.book_append_sheet(wb, ws, 'abc');
XLSX.writeFile(workbook, path.resolve(__dirname,'./new.xlsx'));