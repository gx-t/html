#!/usr/bin/env bash
sqlite3 ~/data/iplist.db << EOT
insert into iplist values("$1", "$REMOTE_ADDR", "$REMOTE_PORT", CURRENT_TIMESTAMP);
EOT
echo -e -n "Content-type: text/plain\n\nOK"

