;(async function () {
  const axios = require('axios')
  const xml2js = require('xml2js')
  console.log(11)
  console.log(11)
  const res = await axios.get('https://www.w3schools.com/xml/cd_catalog.xml')
  const xml = res.data
  xml2js.parseString(xml, (err, result) => {
    console.dir(result)
    console.log(11)
  })
})()
let a = 'haha'
console.log(1)
console.log(2)
a = 'heihei'
console.log(4)
const b = a + ' wow'
