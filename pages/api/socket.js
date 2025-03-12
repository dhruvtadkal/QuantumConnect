import { Server } from 'socket.io';

let messages = []; // In-memory message storage

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log('Socket.io already running');
    res.end();
    return;
  }

  const io = new Server(res.socket.server);

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

  res.socket.server.io = io;
  res.end();
}
