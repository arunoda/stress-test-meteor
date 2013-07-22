var URL = 'http://localhost:3000';
var MESSAGE_INTERVAL = 2000;
var NO_OF_GROUPS = 50;
var TTL = 50;

var groups = generateGroups(NO_OF_GROUPS);
var myGroup = pickGroup();

var page = require('webpage').create();
page.open(URL, function(status) {
  console.log('connected with:' + status);
  page.evaluate(function(group, interval) {
    groupHandler = joinGroup(group);
    // displayHandler = displayMessages();
    setInterval(function() {
      sendMessage('hello');
    }, interval);
  }, myGroup, MESSAGE_INTERVAL);
});

window.setTimeout(function () {
  console.log('closing phantom');
  page.evaluate(function() {
    groupHandler.stop();
  });
  window.setTimeout(function() {
    phantom.exit();
  }, 1000);
}, TTL*1000);

function pickGroup() {
  var index = Math.floor(Math.random() * groups.length);
  return groups[index];
}

function generateGroups(count) {
  var result = [];
  for(var lc=0; lc<count; lc++) {
    result.push('group:' + (lc+1));
  }
  return result;
}