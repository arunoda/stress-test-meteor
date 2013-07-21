groupStat = {};

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

  return ChatMessages.find({group: group}, {
    sort: {timestamp: -1},
    limit: 30
  });
});