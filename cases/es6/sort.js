const a = require('./1.json')
const a2 = require('./2.json')
function sortAsc(jsonObj) {
  const sortObj = {};
   Object.keys(jsonObj).sort().forEach(function(key) {
   sortObj[key] = jsonObj[key];
  });
  return sortObj
 }
console.log('1:>> ', JSON.stringify(sortAsc(a.devDependencies),null,2) );
console.log('2:>> ', JSON.stringify(sortAsc(a2.devDependencies),null,2) );