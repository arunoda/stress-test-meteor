#!/bin/bash

while [[ true ]]; do
  echo "starting new user"
  phantomjs stress.js &
  sleep 1
done

#killing all phantom process
pkill phantomjs