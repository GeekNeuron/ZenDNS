# Save as: dns_changer.ps1

$dns = "192.168.1.100"  # ← IP سرور ZenDNS
$interface = Get-NetAdapter | ? { $_.Status -eq "Up" } | Select-Object -First 1

Set-DnsClientServerAddress -InterfaceIndex $interface.ifIndex -ServerAddresses $dns
Write-Host "[+] DNS set to $dns on $($interface.Name)"
