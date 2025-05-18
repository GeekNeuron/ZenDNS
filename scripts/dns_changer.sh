#!/bin/bash
# ZenDNS DNS Changer (Linux/macOS)

ZENDNS_IP="192.168.1.100"  # ← IP سرور ZenDNS شما

if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit
fi

INTERFACE=$(ip route | grep default | awk '{print $5}' | head -n 1)
echo "[+] Applying ZenDNS to interface: $INTERFACE"

nmcli device modify $INTERFACE ipv4.dns "$ZENDNS_IP"
nmcli connection modify $INTERFACE ipv4.ignore-auto-dns yes
nmcli connection up $INTERFACE

echo "[+] DNS updated to ZenDNS ($ZENDNS_IP)"
