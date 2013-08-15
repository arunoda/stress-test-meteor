# Stress Test Meteor

This test suite is developed to see the performance [improvements given by Smart Collections](http://meteorhacks.com/making-meteor-500-faster-with-smart-collections.html).

This suite has two parts

* app on `chat_app`
* stress testing scripts on `stress_test`

## About the App

Our test app is a simple group chat application. Where people can join into groups as their wish and start sending messages. by default following configuration has been assigned.

* ~25 Groups
* 50 Users (for all groups)
* Every user sends a message per 2 seconds

> You can change these with editing `stress_test/stress.js`

## Test Suite

* I used set of PhantomJS processes to emulate real users. I used a forked version of Nick's [stress testing script](http://goo.gl/R4wHn).
* CPU and Memory usage were captured using [node-usage](https://github.com/arunoda/node-usage)
* MongoDB CPU and Memory usage were also captured using node-usage
* Test ran for 15 min in both cases (With Smart Collections and Without)

## Lets do a test

* First you need to select which collection implementation you want
* For that see `chat_app/lib/collections.js`
* Our app will be printing logs as `csv`

Let's start the app

    cd chat_app
    mrt install
    meteor | tee ../app.csv

Let's configure mongo with indexes (In another tab)

    meteor mongo
    db.chatMessages.ensureIndex({group:1, timestamp: -1})
    ^C

Let's monitor mongo usage (In another tab)

    //assume you have the PID of mongo process
    cd stress_tests
    node mongo_usage.js <PID> | tee ../mongo.csv

Let's start the phantomJS farm (In another tab)

    cd stress_test
    ./start.sh

Let the test run for few minutes. If you want to stop it do following steps

* kill above script and stop generating phantomjs processes
* apply `pkill phantomjs` to kill all phantomjs processes

Now you've `mongo.csv` and `app.csv`. Analyze them as you want.
