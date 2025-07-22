const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));
io.on('connection', client => {
    client.on('message', message => {
        console.log('Received message:', message);
        client.emit('Message received: ' + message);
    });
    client.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


server.listen(5500, () => {
  console.log('Server is running on http://localhost:5500');
})