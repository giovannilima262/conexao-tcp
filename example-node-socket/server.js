const net = require('net')

var clients = []

const handleConnection = socket => {
    socket.name = "usuario: " + socket.remoteAddress
    socket.setNoDelay(true);
    socket.write('servidor respondeu ok')
    clients.push(socket);
    socket.on('data', data => {
        broadcast(socket.name + "> " + data, socket);
    })
}

broadcast = (message, sender) => {
    clients.forEach((client) => {
      if (client === sender) return;
      client.write(message);
    });
  }

const server = net.createServer(handleConnection)
server.listen(process.env.PORT || 80)