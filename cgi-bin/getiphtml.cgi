#!/usr/bin/env bash
cat << EOT
Content-type: text/html

<html>
<hader>
<style>
tr:nth-child(even) {
	background: #CCC
}
</style>
</header>
<body>
<table border=1>
EOT
sqlite3 ~/data/iplist.db << EOT
.mode html
.header on
select name, ip, port, datetime(time, '+4 hours') as 'date/time' from iplist order by time desc;
EOT

cat << EOT
</table>
</body>
</html>
<hr>
curl http://shah32768.sdf.org/cgi-bin/regip?name
EOT
