var usage = Meteor.require('usage');

Meteor.startup(function() {
  showSysteUsage(2000);
  showGroupStat(2000);
});

function showSysteUsage(interval) {
  return setInterval(function() {
    usage.lookup(process.pid, function(err, result) {
      if(err) {
        console.log(err);
        return;
      }

      console.log(Date.now() + ':usage:', result);
    });
  }, interval)  
}

function showGroupStat(interval) {
  return setInterval(function() {
    var totalUsers = 0;
    var totalGroups = 0;
    for(var key in groupStat) {
      totalGroups++;
      totalUsers += groupStat[key];
    }

    var result = {user: totalUsers, groups: totalGroups, messages: messageCount};
    console.log(Date.now() + ':stat: ' + JSON.stringify(result));
    messageCount = 0;
  }, interval);
}