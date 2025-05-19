#!/bin/bash
# File: scripts/setup_split_dns.sh

set -e

WG_CONF="/etc/wireguard/wg0.conf"
DNS_SERVER="10.10.0.1"
WG_INTERFACE="wg0"

if ! command -v wg &>/dev/null; then
  echo "[!] WireGuard is not installed."
  exit 1
fi

# Enable split tunnel: only DNS over VPN
echo "[*] Enabling split DNS tunnel..."

# Backup DNS
echo "[*] Backing up current resolv.conf"
sudo cp /etc/resolv.conf /etc/resolv.conf.backup

# Set DNS to tunnel server
sudo bash -c "echo 'nameserver $DNS_SERVER' > /etc/resolv.conf"

# Bring up WireGuard
echo "[*] Starting $WG_INTERFACE..."
sudo wg-quick up $WG_INTERFACE

echo "[✓] Split DNS tunnel enabled via WireGuard ($WG_INTERFACE)"
