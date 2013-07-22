var usage = require('usage');
var PID = process.argv[2];
var TIMEOUT = process.argv[3] || 2000;

console.log('timestamp,cpu,memory');
setInterval(function() {
  usage.lookup(PID, function(err, result) {
    if(err) throw err;
    console.log(Date.now() + ',' + result.cpu +  ',' + result.memory);
  });
}, TIMEOUT);