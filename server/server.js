/** Created by alex on 24.09.2017 **/
'use strict';
// node-modules
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

// variables
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

// middleware
app.use(express.static(publicPath));

// insert new elem. Get user obj from DB by it token from client (in a authenticate), then save it
app.get('/', (req, res) => {
  res.send(publicPath + '/index.html');
});

// Websockets
io.on('connection', (socket) => {
  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Пожалуйста, введите ваше имя и название комнаты');
    }

    // built-in socket features to join rooms
    socket.join(params.room);

    // first remove user from any previous rooms
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    // send message to all users in this room
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin',`Добро пожаловать в чат "${params.room}"`));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} присоединился`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);

    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);

    if(user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
    callback();
  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} вышел из комнаты`))
    }
  })
});

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});