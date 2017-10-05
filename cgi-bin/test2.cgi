#!/usr/pkg/bin/bash
printf "\n\n"
echo ------------------------------------
TZ=Asia/Yerevan date
echo ------------------------------------
cat /proc/cpuinfo
echo ------------------------------------
cat /proc/meminfo
echo ------------------------------------
who
echo ------------------------------------
pstree -au


