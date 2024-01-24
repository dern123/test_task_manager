const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/', // the endpoint you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:5000', // the address of the server you want to proxy to
      changeOrigin: true,
    })
  );
};