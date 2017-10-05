#!/usr/bin/env bash
read key &&
[[ $key == "f925c297-7d91-4c17-8678-e2c9d160a8eb" ]] &&
sqlite3 -batch ~/data/iplist.db
echo -e -n "Content-type: text/plain\n\nOK"

