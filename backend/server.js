const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());

// Basic health endpoint
app.get('/', (req, res) => {
  res.send('Messaging backend running');
});

// Socket.IO handlers
io.on('connection', (socket) => {
  // Join a chat room
  socket.on('join', (room) => {
    socket.join(room);
  });

  // Handle incoming messages
  socket.on('message', ({ room, user, text }) => {
    if (!room) return;
    io.to(room).emit('message', { user, text });
  });

  // Example miniapp: shared counter
  socket.on('miniapp:counter', ({ room, value }) => {
    if (!room) return;
    io.to(room).emit('miniapp:counter', { value });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
