# ZenDNSChanger - بازگردانی DNS به حالت قبل
$interface = Get-NetAdapter | Where-Object { $_.Status -eq "Up" } | Select-Object -First 1
$prevDns = Get-Content "$env:ProgramData\zendns_prev.txt"
if ($prevDns) {
  Set-DnsClientServerAddress -InterfaceIndex $interface.ifIndex -ServerAddresses $prevDns
  Write-Host "[✓] DNS reverted to: $prevDns"
} else {
  Write-Host "[!] No backup DNS found"
}
