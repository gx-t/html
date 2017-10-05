#!/usr/bin/env bash
cat << EOT
Content-type: text/plain

EOT
sqlite3 ~/data/iplist.db << EOT
.mode column
.header on
select name, ip, port, datetime(time, '+4 hours') as 'date/time' from iplist order by time desc;
EOT

cat << EOT

Register IP for <name>:
http://shah32768.sdf.org/cgi-bin/regip?<name>
EOT
