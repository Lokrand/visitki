const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "https://visitki.practicum-team.ru/api",
      changeOrigin: true,
    })
  );
};