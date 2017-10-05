#!/bin/ksh
loop=0                             # set the while counter.
while [ -f .lck ]                  # while the lock file exists,
do
 sleep 1                           # sleep 1.
 loop=$((${loop} + 1))             # then increment the counter.
 if [ "$loop" -gt "10" ]           # if it increments beyond 10,
  then rm -f .lck                  # clear the lock file.
 fi
done
touch -f .lck                      # create a new lock file.
count=`cat .cnt`                   # get the current count.
if [ "$count" = "" ]               # if its empty,
 then count=1                      # start the counter over.
 else count=$((${count} + 1))      # otherwise just increment
fi
echo $count > .cnt                 # write out the new count.
rm .lck                            # clear the lock
echo "Content-type: text/html"     # make some html noise.
echo
echo "[$count]"

