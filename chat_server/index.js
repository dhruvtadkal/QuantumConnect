const express = require('express');
const app = express();
http = require('http');
const cors = require('cors');
const { Server } = require('socket.io'); // Add this

app.use(cors()); // Add cors middleware

let messages = []; 
const server = http.createServer(app); // Add this

// Add this
// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Add this
// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);
  socket.emit('load_messages', messages);
  // We can write our socket event listeners in here...
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // Send the entire message history to the newly connected client
    socket.emit('load_messages', messages);

    // Listen for incoming messages and broadcast them
    socket.on('send_message', (message) => {
      console.log('New message:', message);

      // Add new message to the server's message history
      messages.push(message);
      console.log(messages);

      // Broadcast the new message to all clients
      io.emit('receive_message', message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });


server.listen(4000, () => 'Server is running on port 4000');