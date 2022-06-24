/* https://github.com/voronianski/xml2obj-stream */
var xml2obj = require('xml2obj-stream');
var fs = require('fs');

var readStream = fs.createReadStream(__dirname+'/resource.xml');
var parseStream = new xml2obj.Parser(readStream);

var results = [];
parseStream.each('column', function (item) {
    // do something with item
    results.push(item);
});

parseStream.on('end', function () {
    console.dir(results);
    // outputs ->
    // [ 
    //   { name: 'dodo', value: 'bird', 'value-type': 'string' },
    //   { name: 'mighty', value: 'boosh', 'value-type': 'string' },
    //   { name: 'crack', value: 'fox', 'value-type': 'string' },
    //   { name: 'foo', value: true, 'value-type': 'boolean' },
    //   { name: 'uid', value: 12345, 'value-type': 'number' } 
    // ]
});