#!/usr/pkg/bin/bash
printf "\n\n"

(for ((i=0; i<10; i++))
do
	echo "OK $i"
done) &
echo "OK1"


