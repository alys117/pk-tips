const ExcelJS = require('exceljs');

async function main() {
  // 读取现有的Excel文件
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('D:/fun/diting/demo.xlsx'); // 假设现有文件名为 existing-demo.xlsx
  
  // 获取第一个工作表
  const worksheet = workbook.getWorksheet(1);
  const targetValue = '123';
  // 遍历每一行（跳过可能的表头）
  worksheet.eachRow((row, rowNumber) => {
    // 跳过标题行（如果第一行是标题）
    if (rowNumber === 1) return;

    // 获取 A 列单元格（第 1 列）
    const cellA = row.getCell(1);
    
    // 检查值是否匹配
    if (cellA.value == targetValue) {
      // 在 G 列（第 7 列）写入值
      const cellG = row.getCell(7);
      cellG.value = 'success';
      
      // 可选：设置样式
      cellG.font = {
        color: { argb: 'FF00FF00' }, // 绿色文字
        bold: true
      };
    }
  });

  // 读取单元格数据（B1）
  // const cellValue = worksheet.getCell('B1').value;
  // console.log('B1 Value:', cellValue);

  // 保存文件
  await workbook.xlsx.writeFile('D:/fun/diting/demo.xlsx')
  console.log('Excel文件已保存');
}

main().catch(console.error);
