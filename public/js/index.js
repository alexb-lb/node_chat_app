/** Created by alex on 25.09.2017 **/
'use strict';
const socket = io();

socket.on('connect', function(){
  console.log('Socket connected to server');
});

socket.on('newMessage', function(message){
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});


$('#message-from').on('submit', function (e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function (data){
    console.log(data);
  });
});