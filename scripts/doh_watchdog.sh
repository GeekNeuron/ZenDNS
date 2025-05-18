#!/bin/bash
# Health-check برای DNS-over-HTTPS endpoint

URL="https://localhost/dns-query"
LOG="/var/log/doh_watchdog.log"

while true; do
  TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
  STATUS=$(curl -k -s -o /dev/null -w "%{http_code}" "$URL")

  if [ "$STATUS" != "200" ]; then
    echo "$TIMESTAMP [DOWN] DoH returned $STATUS. Restarting..." >> "$LOG"
    docker restart zendns-doh
  else
    echo "$TIMESTAMP [OK] DoH running with $STATUS" >> "$LOG"
  fi

  sleep 60
done
