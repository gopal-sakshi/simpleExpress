#!/bin/bash
# display () {
#   case $1 in
#     "red") echo "\e[39m\e[21m $2 \e[1m\e[91m $3"
#     echo "\e[39m\e[21m";
#     ;;
#     "green") echo "\e[39m\e[21m $2 \e[1m\e[92m $3"
#     echo "\e[39m\e[21m";
#     ;;
#     "blue") echo "\e[39m\e[21m $2 \e[36m $3"
#     echo "\e[39m\e[21m";
#     ;;
#   esac
# }

start() {
  status
  if [ "$isWorking" = "" ]; then
    setsid node index.js 3044 &
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
