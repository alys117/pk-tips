const fs = require('fs');
const xpath = require('xpath');
const ExcelJS = require('exceljs');
const { log } = require('console');
const dom = require('xmldom').DOMParser;


function dealCpt(cpt) {
  // 1. 读取 XML 文件
  const xmlStr = fs.readFileSync('c:/users/drunk/desktop/' + cpt, 'utf8');

  // 2. 解析 XML
  const doc = new dom().parseFromString(xmlStr);

  // 3. 使用 XPath 定位所有参数节点
  const parameters = xpath.select(
    '//WorkBook/ReportParameterAttr/ParameterUI/Layout/Widget/InnerWidget[@class="com.fr.form.ui.Label"]/widgetValue/O/text()',
    doc
  );
  // console.log('所有：', parameters.map(node => node.data));
  const result = parameters.reduce((acc, node) => {
    if (node.data !== '\n') {
      acc.push(node.data);
    }
    return acc;
  }, []).join('，');
  return result;
}
async function main() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('c:/users/drunk/desktop/1.xlsx'); // 假设现有文件名为 existing-demo.xlsx

  // 获取第一个工作表
  const worksheet = workbook.getWorksheet(1);
  // 遍历所有行（包含空行需配置）
  for (const row of worksheet.getRows(1, worksheet.rowCount)) {
    if (row.number === 1) continue;

    const cellC = row.getCell(3);
    if (cellC.value && cellC.value.startsWith('bass')) {
      const cpt = cellC.value.split('&').shift();
      const cellG = row.getCell(4);
      try {
        const rs = await dealCpt(cpt);
        cellG.value = rs
        console.log(rs);
      }catch (error) {
        console.log(error);
      }
    }
  }
  await workbook.xlsx.writeFile('c:/users/drunk/desktop/11.xlsx');
  console.log('Excel文件已保存');
}
main();

// 这个是归纳所有报表的参数模板的使用到的条件