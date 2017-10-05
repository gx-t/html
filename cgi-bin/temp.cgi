#!/usr/bin/env bash
printf "Content-type: text/plain\n"
printf "Connection: close\n\n"


if [ $1 == "raw" ]
then
  cat ~/data/temp.log
  exit 0
fi

if [ $1 == "raw-gzip" ]
then
  gzip -9 -c ~/data/temp.log
  exit 0
fi

if [ $1 == "upload-temp" ]
then
  cat >> ~/data/temp.log
  exit 0
fi

if [ $1 == "upload-png" ]
then
  cat > ~/html/img/temp.png
  exit 0
fi

cat ~/data/temp.log | tail -n 1
