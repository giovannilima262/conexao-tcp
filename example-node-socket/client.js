const net = require('net')
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const client = net.connect(80, 'localhost', () => {
    console.log('conectou');
    rl.addListener('line', line => {
        client.write(line)
    }) 
})

client.on('data', data => {
    console.log(data.toString());
})
