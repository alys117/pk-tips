/* https://github.com/Leonidas-from-XIV/node-xml2js */
const xml2js = require('xml2js')

const xml = `<aaa:bbb xmlns:soap="http://schemas.xmlsoap.org/soap/envelope"><root attr1="1123" attr2="456">Hello xml2js!</root></aaa:bbb>`
xml2js.parseString(xml, (err, result) => {
  console.dir(result)
})

var obj = { name: 'Super', Surname: 'Man', age: 23 }
var obj2 = {
  'aaa:bbb': {
    '$': { 'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope' },
    root: { name: 'Super', Surname: 'Man', age: 23 }
  }
}
var builder = new xml2js.Builder()
var xml2 = builder.buildObject(obj2)
console.log(xml2)
