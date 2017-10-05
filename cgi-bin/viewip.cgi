#!/usr/bin/env bash
read name &&
echo "Content-type: text/plain
" &&
echo "select ip, datetime(time, 'unixepoch') from ip where name=\"$name\";" | sqlite3 /arpa/ns/s/shah32768/data/client.db

