const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/', // the endpoint you want to proxy
    createProxyMiddleware({
      target: 'http://43x2uexmfx.eu-central-1.awsapprunner.com:8080', // the address of the server you want to proxy to
      changeOrigin: true,
    })
  );
};