/** Created by alex on 25.09.2017 **/
'use strict';
const socket = io();

socket.on('connect', function(){
  console.log('Socket connected to server');

  socket.emit('createMessage', {
    from: 'Andrew',
    text: 'Hey. This is Carrigan'
  });
});

socket.on('newMessage', function(message){
  console.log(message)
});