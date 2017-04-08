

var app = {};
app.init = function () {
  $(document).ready(function () {
    $('#send .submit').unbind('submit').bind('submit');
    $('.username').on('click', function () {
      app.handleUsernameClick();
    });
    $('#send .submit').on('submit', function () {
      app.handleSubmit();
    });
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
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    // url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    // success: function (data) {
    //   console.log('chatterbox: Message rece');
    // },
    // error: function (data) {
    //   // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    //   console.error('chatterbox: Failed to send message', data);
    // }
  });
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
  return true;
};