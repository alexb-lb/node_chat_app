/** Created by alex on 24.09.2017 **/
'use strict';
// node-modules
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

// models

// variables
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

  socket.on('createMessage', (message) => {
    io.emit('newMessage', {from: 'mike.com', text: 'Heil', createdAt: new Date().getTime()});
  });

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  })
});

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});