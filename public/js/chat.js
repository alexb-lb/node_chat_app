/** Created by alex on 25.09.2017 **/
'use strict';
const socket = io();

function scrollToBottom(){
  // selectors
  let $messages = $('#messages');
  let $newMessage = $messages.children('li:last-child');

  // heights
  let clientHeight = $messages.prop('clientHeight');
  let scrollTop = $messages.prop('scrollTop');
  let scrollHeight = $messages.prop('scrollHeight');
  let newMessageHeight = $newMessage.height();
  let lastMessageHeight = $newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    $messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  let params = $.deparam(window.location.search);

  socket.emit('join', params, function (err){
    if (err) {
      alert(err);
      window.location.href = '/'
    } else {
      console.log('No error');
    }
  });
});

socket.on('newMessage', function (message) {
  let $template = $('#message-template').html();
  let formattedTime = moment(message.createdAt).format('H:mm');
  let html = Mustache.render($template, {
    from: message.from,
    time: formattedTime,
    text: message.text
  });

  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  let $template = $('#location-message-template').html();
  let formattedTime = moment(message.createdAt).format('H:mm');
  let html = Mustache.render($template, {
    from: message.from,
    time: formattedTime,
    text: message.text,
    url: message.url
  });

  $('#messages').append(html);
  scrollToBottom();
});

$('#message-from').on('submit', function (e) {
  e.preventDefault();

  let $messageTextBox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: $messageTextBox.val()
  }, function (data) {
    $messageTextBox.val('');
  });
});

let $location = $('#geolocation');
$location.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }

  // prevent spam location
  $location.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    $location.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function (error) {
    $location.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  })
})