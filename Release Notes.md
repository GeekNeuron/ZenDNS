# ZenDNS v1.0 Release Notes

ZenDNS is a secure, open-source DNS stack combining the power of Unbound, AdGuard Home, and RethinkDNS with a modern UI and DoH/DoT support.

---

## Key Features

- Recursive DNS with Unbound (DNSSEC, TLS, cache, rate-limit)
- AdGuard Home with parental control, safe browsing, filter manager
- RethinkDNS blocklists with auto-sync + client config support
- SQLite log backend with REST API + WebSocket stream
- Custom React Dashboard (PWA) with stats, filters, live logs
- Alerts via Telegram, Email with regex rules
- Built-in DoH endpoint with watchdog monitoring

---

## Setup Tools

- `/setup.html` static config page
- `/wizard` UI wizard with QR, export, multi-platform setup
- CLI installer (`install-cli.ts`)
- Full Docker + systemd support

---

## Assets

- [ZenDNS-setup.zip](https://github.com/GeekNeuron/ZenDNS/releases/download/v1.0/ZenDNS-setup.zip): Offline setup package

---

## License

MIT — free to use, fork, and modify.

---

Happy DNS-ing!
