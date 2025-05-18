#!/bin/bash
# ZenDNS DNS Changer (Linux/macOS)

ZENDNS_IP="192.168.1.100"  # ← IP سرور ZenDNS خود را اینجا وارد کنید
BACKUP_FILE="/tmp/zendns_prev_dns.bak"

if [ "$EUID" -ne 0 ]; then
  echo "[!] Please run as root"
  exit 1
fi

INTERFACE=$(ip route | grep default | awk '{print $5}' | head -n 1)
echo "[+] Active interface detected: $INTERFACE"

if [ "$1" == "revert" ]; then
  if [ -f "$BACKUP_FILE" ]; then
    OLD_DNS=$(cat "$BACKUP_FILE")
    echo "[*] Restoring previous DNS: $OLD_DNS"
    nmcli device modify $INTERFACE ipv4.dns "$OLD_DNS"
    nmcli connection modify $INTERFACE ipv4.ignore-auto-dns no
    nmcli connection up $INTERFACE
    echo "[✓] DNS reverted successfully"
  else
    echo "[!] No backup DNS found!"
  fi
  exit 0
fi

# Backup current DNS
nmcli device show "$INTERFACE" | grep IP4.DNS | awk '{print $2}' > "$BACKUP_FILE"
echo "[*] Backed up previous DNS to $BACKUP_FILE"

# Apply ZenDNS
nmcli device modify $INTERFACE ipv4.dns "$ZENDNS_IP"
nmcli connection modify $INTERFACE ipv4.ignore-auto-dns yes
nmcli connection up $INTERFACE

echo "[✓] DNS updated to ZenDNS ($ZENDNS_IP)"
