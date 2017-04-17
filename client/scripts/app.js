var app = {
  server: "http://parse.sfm8.hackreactor.com/chatterbox/classes/messages",
  username: 'Chris',
  roomname: 'lobby',
  messages: [],
  lastMessageId: 0,
  friends: {},

  init: function () {
    app.username = window.location.search.substr(10);
    app.$message = $('#message');
    app.$chats = $('#chats');
    app.$roomSelect = $('#roomSelect');
    app.$send = $('#send');

    app.$send.on('submit', app.handleSubmit);
    app.$roomSelect.on('change', app.handleRoomChange);
    app.$chats.on('click', '.username', app.handleUsernameClick);

    app.fetch();

    // setInterval(function () {
    //   console.log('hey')
    //   app.fetch();
    // }, 3000)
  },

  fetch: function (){
    $.ajax ({
      url: app.server,
      type: 'GET',
      data: {order: '-createdAt'},
      success: function (data) {
        if (!data.results || !data.results.length) { return; }
        app.messages = data.results; 
        var mostRecentMessage = app.messages[app.messages.length - 1];
        app.renderRoomList(app.messages);
        app.renderMessages(app.messages);
      },
      error: function (error) {
        console.log(error)
      }
    })
  }, 

  renderMessages: function (messages) {
    app.clearMessages();
    for (var i = 0; i < messages.length; i++) {
      app.renderMessage(messages[i])
    }
  },

  clearMessages: function () {
    app.$chats.html('');
  },

  renderMessage: function (message) {
    var $chat = $('<div class="chat"/>')
    var $username = $('<span class="username"/>')
    $username.text(message.username + ': ').appendTo($chat);
    if (app.friends[message.username] === true) {
      $username.addClass('friend')
    }
    var $message = $('<br><span>/');
    $message.text(message.text).appendTo($chat);
    app.$chats.append($chat)
  },

  escapeHTML: function (string) {
    if (!string) {return;}
    return string.replace(/[&<>"'\/]/g, '')
  }, 

  handleSubmit: function (event) {
    $.ajax ({
      url: app.server,
      type: 'POST',
      data: {
        username: app.username,
        text: app.$message.val(),
        roomname: app.roomname || 'lobby'
      },
      success: function (data) {
        app.$message.val('');
        app.fetch();
      },
      error: function (error) {
        console.log('FAILED: ' + error)
      }
    })
    console.log('handleSubmit is happening')
    event.preventDefault();
  },

  renderRoomList: function (messages) {
    app.$roomSelect.html('<option value="_newRoom">New room...</option></select>')

    if (messages) {
      messages.forEach(function (message) {
        var roomname = message.roomname;
        if (roomname) {
          app.renderRoom(roomname)
        }
      })
    }
  },

  renderRoom: function (roomname) {
    var $option = $('<option/>').val(roomname).text(roomname);
    app.$roomSelect.append($option);
  },

  handleUsernameClick: function (event) {
    var username = event.target.innerText;
    $('.username').each(function () {
      if (this.innerText === username) {
        $(this).toggleClass('friend')
      } 
    })
  }
}