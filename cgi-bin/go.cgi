#!/usr/bin/env bash
printf "Location: http://%s:8000/index.html\n\n" `echo "select ip from iplist where name='Home';" | sqlite3 ~/data/iplist.db`
