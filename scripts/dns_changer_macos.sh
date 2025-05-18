#!/bin/bash
# ZenDNS DNS Changer for macOS

ZENDNS_IP="192.168.1.100"
SERVICE="Wi-Fi"
BACKUP_FILE="$HOME/.zendns_prev_dns"

if [ "$1" == "revert" ]; then
  if [ -f "$BACKUP_FILE" ]; then
    PREV=$(cat "$BACKUP_FILE")
    sudo networksetup -setdnsservers "$SERVICE" $PREV
    echo "[✓] Restored previous DNS: $PREV"
  else
    echo "[!] No backup DNS found."
  fi
  exit 0
fi

EXISTING=$(networksetup -getdnsservers "$SERVICE" | grep -v "There are no DNS")
echo "$EXISTING" > "$BACKUP_FILE"
echo "[*] Backup current DNS to $BACKUP_FILE"

sudo networksetup -setdnsservers "$SERVICE" $ZENDNS_IP
echo "[✓] DNS set to ZenDNS ($ZENDNS_IP)"
