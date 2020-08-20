var WebSocketServer = require('websocket').server;
var http = require('http');
 
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(process.env.PORT || 3000, function() {
    console.log((new Date()) + ' Server is listening on port 80');
});
 
wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});
 
 
wsServer.on('request', function(request) {
    var connection = request.accept('echo-protocol', request.origin);
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            wsServer.broadcast(message.utf8Data);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});