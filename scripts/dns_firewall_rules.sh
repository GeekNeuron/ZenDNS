#!/bin/bash
# Block all external DNS except ZenDNS

ZENDNS_IP="192.168.1.100"  # change this

iptables -F
iptables -X

iptables -A OUTPUT -p udp --dport 53 -d $ZENDNS_IP -j ACCEPT
iptables -A OUTPUT -p tcp --dport 53 -d $ZENDNS_IP -j ACCEPT
iptables -A OUTPUT -p udp --dport 53 -j DROP
iptables -A OUTPUT -p tcp --dport 53 -j DROP

iptables-save > /etc/iptables/rules.v4

echo "[+] Only ZenDNS allowed for DNS outbound."
