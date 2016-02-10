var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var httpProxy = require('http-proxy');

var app = connect();
var proxy = httpProxy.createProxyServer();

// Routes: Should you put in modules
app.use('/api', function fooMiddleware(req, res) {
    proxy.web(req, res, { target: 'https://api.stockfighter.io/ob/api', secure: false });
});

// Not useful: It redirects for some reason?
app.use('/ui', function barMiddleware(req, res) {
    proxy.web(req, res, { target: 'https://www.stockfighter.io/ui', secure: false });
});

// What about permissions
app.use(serveStatic(__dirname));

http.createServer(app)
    .listen(process.env.PORT, process.env.IP);