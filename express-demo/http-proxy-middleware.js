// include dependencies
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// proxy middleware options
/** @type {import('http-proxy-middleware/dist/types').Options} */
const options = {
  target: 'http://localhost:8084', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    '^/api/old-path': '/api/new-path', // rewrite path
    '^/api/remove/path': '/path' // remove base path
  },
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    'dev.localhost:3000': 'http://localhost:8000',
  },
};

// create the proxy (without context)
const exampleProxy = createProxyMiddleware(options);

// mount `exampleProxy` in web server
const app = express();
app.use('/', exampleProxy, (req, res) => {
  console.log(req.headers);
});
app.listen(3000);

/* 
https://www.npmjs.com/package/http-proxy-middleware
express代理软件，可以通过设置代理来让你的服务器接受请求，并将请求转发到另一个服务器。
比如：你开发了一个http接口，可以设置代理为fiddler，则可以通过fiddler抓包获取数据，方便查看第三方调用的request，以及你服务的response。
*/