const Agent = require('socks5-https-client/lib/Agent');
const request = require('request');

request({
	url: 'https://www.google.com/',
	strictSSL: false,
	agentClass: Agent,
	agentOptions: {
		socksHost: '127.0.0.1', // Defaults to 'localhost'.
		socksPort: 7890, // Defaults to 1080.

		// Optional credentials
		// socksUsername: 'proxyuser',
		// socksPassword: 'p@ssw0rd',
	}
}, function(err, res) {
	console.log(err || res.body);
});