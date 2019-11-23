const http = require('http');
const hostname = '10.140.0.2';
const port = 3000;
const server = http.createServer((req, res) => {
res.statusCode = 200;
res.setHeader('Content-Type', 'text/plain');
console.log(req.connection.remoteAddress);
res.end(req.connection.remoteAddress);
});
server.listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${port}/`);
});
