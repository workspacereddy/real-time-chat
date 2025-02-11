const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Listen for incoming chat messages
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // broadcast message to all clients
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Set the port dynamically for Vercel
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
