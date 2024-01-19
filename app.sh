#!/bin/bash

    # bash app.sh status | start | stop

start() {
  status
  if [ "$isWorking" = "" ]; then
    setsid node index.js 3044 &                 # setsid ===> run a program in a new session
    echo "(_-¯λ¯-_TRIGGER STARTED_-¯λ¯-_)"
    exit 0;
  fi
}

getStatus() {
    npm run status
    echo $1
}

status() {
  isWorking=$(pidof "simpleExpress");
  echo "$isWorking"
  if [ "$isWorking" = "" ]; then
    echo "NOT RUNNING";
  else
    echo "RUNNING";
  fi
}

stop() {
  status
  if [ "$isWorking" != "" ]; then
    npm run --silent stop &&
    echo "_TRIGGER STOPPED_";
  fi
}


case $1 in
  "start") start;;  
  "status") status;;  
  "getStatus") getStatus;;
  "stop") stop;;
  *) echo " Please use below options as args \n status (or) start (or) stop (or) logs"
esac
