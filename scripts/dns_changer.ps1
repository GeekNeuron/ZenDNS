# ZenDNSChanger - تغییر DNS به ZenDNS
$dns = "192.168.1.100"
$interface = Get-NetAdapter | Where-Object { $_.Status -eq "Up" } | Select-Object -First 1
Set-DnsClientServerAddress -InterfaceIndex $interface.ifIndex -ServerAddresses $dns
Write-Host "[✓] DNS set to $dns on $($interface.Name)"

# Backup برای revert
$prevDns = (Get-DnsClientServerAddress -InterfaceIndex $interface.ifIndex).ServerAddresses
$prevDns -join "`n" | Set-Content -Path "$env:ProgramData\zendns_prev.txt"
