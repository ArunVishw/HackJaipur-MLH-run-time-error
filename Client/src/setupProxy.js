const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://recruitify-mlh-hackjaipur.herokuapp.com',
            changeOrigin: true,
        })
    );
};