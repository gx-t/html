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
sqlite3 -batch ~/data/iplist.db << EOT
.mode html
.header on
select type, descr, datetime(time, '+4 hours') as 'date/time' from event_log order by time desc;
EOT

cat << EOT
</table>
</body>
</html>
<hr>
EOT
