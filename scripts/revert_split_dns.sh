WG_INTERFACE="wg0"

if [ ! -f /etc/resolv.conf.backup ]; then
  echo "[!] No backup resolv.conf found."
  exit 1
fi

# Restore DNS settings
echo "[*] Restoring original /etc/resolv.conf"
sudo cp /etc/resolv.conf.backup /etc/resolv.conf

# Shutdown WireGuard
echo "[*] Shutting down $WG_INTERFACE"
sudo wg-quick down $WG_INTERFACE

echo "[✓] Split DNS tunnel disabled, DNS restored."
