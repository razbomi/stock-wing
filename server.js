var connect = require('connect');
var http = require('http');

var app = connect();

// Not workie: http://www.senchalabs.org/connect/proto.html
app.use('/api', function fooMiddleware(req, res, next) {
    // res.write("req.url: " + req.url + "\n\n");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('api call ' + req.url + '\n');
    next();
});
app.use('/ui', function barMiddleware(req, res, next) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('index.html\n');
    next();
});

http.createServer(app)
    .listen(process.env.PORT, process.env.IP);