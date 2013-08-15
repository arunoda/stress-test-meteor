var author = Random.id();
var group;
var latency = {
  values: [],
  count: 0
};

joinGroup = function(_group, callback) {
  group = _group;
  return Meteor.subscribe('join', group, callback);
}

displayMessages = function() {
  return ChatMessages.find().observe({
    added: function(chatMessage) {
      console.log("[" + chatMessage.group + ":" + chatMessage.author + "] " + chatMessage.message);
    }
  });
}

sendMessage = function(message) {
  Meteor.call('message', author, group, message, function(err) {
    if(err) throw err;
  });
}

sendMessageAndUpdate = function(message) {
  Meteor.call('messageAndUpdate', author, group, message, function(err) {
    if(err) throw err;
  });
}

sendMessageAndRemove = function(message) {
  Meteor.call('messageAndRemove', author, group, message, function(err) {
    if(err) throw err;
  });
}

sendMessageAndRemoveSelector = function(message) {
  Meteor.call('messageAndRemoveSelector', author, group, message, function(err) {
    if(err) throw err;
  });
}