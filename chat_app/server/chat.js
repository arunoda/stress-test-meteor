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
  chat: function(author, group, message) {
    console.log({
      group: group,
      author: author,
      message: message,
      timestamp: Date.now()
    });

    ChatMessages.insert({
      group: group,
      author: author,
      message: message,
      timestamp: Date.now()
    });
    messageCount++;
  }
});