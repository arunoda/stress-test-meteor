groupStat = {};
messageCount = 0;

ChatMessages.allow({
  insert: function() {
    return true;
  }
});

Meteor.publish('join', function(group) {
  if(!groupStat[group]) {
    groupStat[group] = 1;
  } else {
    groupStat[group]++;
  }

  this.onStop(function() {
    groupStat[group]--;
    if(groupStat[group] == 0) {
      delete groupStat[group];
    }
  });

  var cursor =  ChatMessages.find({group: group}, {
    sort: {timestamp: -1},
    limit: 30
  });
  return cursor;
});

Meteor.methods({
  message: function(author, group, message) {
    ChatMessages.insert({
      group: group,
      author: author,
      message: message,
      timestamp: Date.now()
    });
    messageCount++;
  },

  messageAndUpdate: function(author, group, message) {
    var id = ChatMessages.insert({
      group: group,
      author: author,
      message: message,
      timestamp: Date.now()
    });
    Meteor.setTimeout(function() {
      ChatMessages.update(id, {$set: {message: message + ': edited'}});
      messageCount++;
    }, 50);
    messageCount++;
  },

  messageAndRemove: function(author, group, message) {
    var id = ChatMessages.insert({
      group: group,
      author: author,
      message: message,
      timestamp: Date.now()
    });
    Meteor.setTimeout(function() {
      ChatMessages.remove(id);
      messageCount++;
    }, 50);
    messageCount++;
  },

  messageAndRemoveSelector: function(author, group, message) {
    var uuid = Meteor.uuid();
    var id = ChatMessages.insert({
      group: group,
      author: author,
      message: message,
      timestamp: Date.now(),
      uuid: uuid
    });

    Meteor.setTimeout(function() {
      ChatMessages.remove({uuid: uuid});
      messageCount++;
    }, 50);
    messageCount++;
  }
});

Meteor.startup(function() {
  ChatMessages._ensureIndex({group: 1, timestamp: -1});
  ChatMessages._ensureIndex({uuid: 1});
});