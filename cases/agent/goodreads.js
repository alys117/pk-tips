const https = require('https')
const parseString = require('xml2js').parseString
const apiKey = process.env['GOODREADS_API_KEY']

// const getRating = (title) => {
//   return new Promise((resolve, reject) => {
//     const url = `https://www.goodreads.com/book/title.xml?key=${apiKey}&title=${title}`
//     https.get(url, (res) => {
//       let xml = ''
//       res.on('data', (data) => {
//         xml += data
//       })
//       res.on('end', () => {
//         parseString(xml, (err, result) => {
//           if (err) {
//             reject(err)
//           } else {
//             const rating = result.GoodreadsResponse.book[0].average_rating[0]
//             resolve(rating)
//           }
//         })
//       })
//     })
//   })
// }
// getRating('The Great Gatsby').then(rating => {
//   console.log(rating)
// })
// const getGithubUser = (title) => {
//   const options = {
//     hostname: 'api.github.com',
//     port: 443,
//     path: '/users/panke/',
//     method: 'GET',
//     headers: {
//       'User-Agent': 'panke'
//     }
//   }
//   return new Promise((resolve, reject) => {
//     const url = `https://api.github.com/users/panke`
//     https.request(options, (res) => {
//       let xml = ''
//       res.on('data', (data) => {
//         xml += data
//       })
//       res.on('end', () => {
//         console.log(xml)
//       })
//     })
//   })
// }

// getGithubUser('The Great Gatsby').then((res) => { console.log(res)  }).catch((err) => { console.log(err)  })

const url = `https://api.github.com/users/panke`
const request = require('request');
const httpAgent = require('socks5-http-client/lib/Agent');
const httpsAgent = require('socks5-https-client/lib/Agent');
var Agent = /^https/.test(url) ? httpsAgent : httpAgent;
request({
  url: url,
  strictSSL: false,
  // headers: { 'User-Agent': 'panke' },
  agentClass: httpsAgent,
  agentOptions: {
    socksHost: '127.0.0.1',
    socksPort: 7890
  }
}, function(err, res) {
  // console.log(err||res.body,res.statusCode,res.headers);
  console.log(res,err);
});
