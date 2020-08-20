#!/usr/bin/env node
var WebSocketClient = require('websocket').client;
const readline = require('readline');

var client = new WebSocketClient();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
 
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection) {
    console.log('Client Connected');

    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });

    connection.on('close', function() {
        console.log('Connection Closed');
    });
    
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log(">: '" + message.utf8Data + "'");
        }
    });

    rl.addListener('line', line => {
        connection.sendUTF(line)
    }) 
});
 
client.connect('ws://localhost:3000', 'echo-protocol');