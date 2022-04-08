var url = require('url');
var https = require('https');
var { SocksProxyAgent } = require('socks-proxy-agent');

// SOCKS proxy to connect to
var proxy = process.env.socks_proxy || 'socks://127.0.0.1:7890';
console.log('using proxy server %j', proxy);

// HTTP endpoint for the proxy to connect to
var endpoint = process.argv[2] || 'https://www.google.com/';
console.log('attempting to GET %j', endpoint);
var opts = url.parse(endpoint);

// create an instance of the `SocksProxyAgent` class with the proxy server information
var agent = new SocksProxyAgent(proxy);
opts.agent = agent;

https.get(opts, function (res) {
	console.log('"response" event!', res.headers);
	res.pipe(process.stdout);
});