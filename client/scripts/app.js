window.user = {};
var app = {};
app.init = function () {
    //$('#send .submit').unbind('submit').bind('submit');
    $('.username').on('click', function () {
      app.handleUsernameClick();
    });
    $('.submit #send').on('submit', function (event) {
      app.handleSubmit();
    });
};
app.send = function (message) {
  message = message || {
    username: 'Mel Brooks',
    text: 'It\'s good to be the king',
    roomname: 'lobby'
  };
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
app.fetch = function () {
  var obj = $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
  for (var i = 0; i < obj.responseJSON.results.length; i++) {
    $('#chats').append(obj.responseJSON.results[i]);
  }

  //console.log(results);
};
app.clearMessages = function () {
  $('#chats').empty();
};
app.renderMessage = function (message) {
  var name = $('<input type="button" value=' + message.username + ': >').addClass('username');
  var content = $(`<div>${message.text}</div>`);
  name.append(content);
  $('#chats').append(name);
};
app.renderRoom = function (room) {
  $('#roomSelect').append($(`<a href=“#”>${room}</a>`));
};
app.handleUsernameClick = function () {

  return true;
};
app.handleSubmit = function () {
  // take ID message
  // convert message to send
  // use send function to send message

  var obj = {username: 'Nichris',
    text: $('message').val(),
    roomname: 'lobby'};
    
  app.send(obj);
            
  return true;
};