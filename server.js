var http = require('http');
var connect = require('connect');
var morgan = require('morgan');
var serveStatic = require('serve-static');
var httpProxy = require('http-proxy');

// https://github.com/nodejitsu/node-http-proxy
var proxy = httpProxy.createProxyServer();
proxy.on('error', function (err, req, res) {
  res.writeHead(500, {'Content-Type': 'text/plain'});
  res.end('Error');
});

// Middleware: https://github.com/senchalabs/connect#readme
var app = connect();

// Logger: https://www.npmjs.com/package/morgan
app.use( morgan('dev') );

// Routes: Should you put in modules
app.use('/ob', function fooMiddleware(req, res, next) {
    proxy.web(req, res, { target: 'https://api.stockfighter.io/ob', secure: false, changeOrigin: true });
});

// Doddgy: Level information
app.use('/gm', function barMiddleware(req, res, next) {
    proxy.web(req, res, { target: 'https://www.stockfighter.io/gm', secure: false, changeOrigin: true, headers: { Origin: 'www.stockfighter.io' } });
});

// What about permissions
app.use(serveStatic(__dirname));

http.createServer(app)
    .listen(process.env.PORT, process.env.IP);