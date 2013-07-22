var usage = Meteor.require('usage');

Meteor.startup(function() {
  showStats(2000);
});

function showStats(interval) {
  console.log('timestamp,cpu,memory,groups,users,messages');
  return setInterval(function() {
    usage.lookup(process.pid, function(err, result) {
      if(err) {
        console.log(err);
        return;
      }

      var groupStats = getGroupStat();
      var toPrint = [
        Date.now(),
        result.cpu, 
        result.memory, 
        groupStats.groups,
        groupStats.users,
        groupStats.messages
      ];
      console.log(toPrint.join(','));
    });
  }, interval)  
}

function getGroupStat() {
  var totalUsers = 0;
  var totalGroups = 0;
  for(var key in groupStat) {
    totalGroups++;
    totalUsers += groupStat[key];
  }

  var result = {users: totalUsers, groups: totalGroups, messages: messageCount};
  messageCount = 0;
  return result;
}