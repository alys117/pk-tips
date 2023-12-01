const path = require('path')
const fs = require('fs');

const files = []
function traverseFolder(folderPath) {
  const items = fs.readdirSync(folderPath);
  items.forEach(item => {
    const itemPath = path.join(folderPath, item);
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
      traverseFolder(itemPath);
    } else if (stats.isFile()) {
      files.push(path.join(folderPath, item));
    }
  });
}
traverseFolder('D:/fun/diting/')
const units = []
files.forEach((item, index) => {
  const data = fs.readFileSync(item, 'utf-8')
  // const rs = data.match(/(dim_pub_unit)([\s\S]*)(is_active)/ig)
  const rs = data.match(/(dim_pub_unit)/ig)
  if (rs instanceof Array && rs.length > 0) {
    a = fs.statSync(item)
    // console.log(item, rs[0]);
    units.push({path: item, ...a})
  } else {
    // console.log(item, 'no match');
  }
})

console.log(JSON.stringify(units));

console.log(units.length);
console.log(files.length);