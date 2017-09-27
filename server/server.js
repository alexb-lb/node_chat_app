/** Created by alex on 24.09.2017 **/
'use strict';
// node-modules
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

// models

// variables
const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

// middleware
app.use(express.static(publicPath));

// insert new elem. Get user obj from DB by it token from client (in a authenticate), then save it
app.get('/', (req, res) => {
  res.send(publicPath + '/index.html');
});

// Websockets
io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', generateMessage('Admin','Welcome to chat'));

  // send event to all sockets except this socket
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  })
});

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});