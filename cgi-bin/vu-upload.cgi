#!/usr/bin/env bash

echo "Content-type: text/plain
Connection: close

"
[[ $1 == "33462e45-2031-4dab-a821-1e7cac6a7d3d" ]] && cd ~/html && gzip -d > vu-downloaded.html && echo "OK"

