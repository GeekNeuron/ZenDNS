# ZenDNS

Secure, fast, multi-platform DNS stack built with **AdGuard Home**, **Unbound**, and **RethinkDNS**, plus a real-time dashboard, DoH/DoT support, and alerting.

---

## Features

- **AdGuard Home**: Ad/Tracker blocking, parental control, web dashboard
- **Unbound**: DNSSEC-validating resolver with rate-limiting
- **RethinkDNS**: Filter sync + client support (Android/iOS)
- **Web Dashboard**: Realtime logs, stats, filter manager (React + Tailwind)
- **DoH/DoT endpoint**: Technitium with watchdog
- **Security**: Alert via Telegram/Email on suspicious queries
- **Offline Setup Wizard**: PWA + QR export for Android, iOS, Windows, Linux, macOS

---

## Folder Structure

```bash
ZenDNS/
├── backend/              # Python API + log store + websocket + env
├── scripts/              # CLI installer, firewall, watchdog
├── public/               # setup.html + manifest + config exports
├── src/components/       # React TSX UI: dashboard, wizard, logs
├── dist/                 # React build output
├── adguard/              # Config, certs, work for AdGuard Home
├── unbound/              # unbound.conf (resolver config)
├── .github/workflows/    # CI for Docker + frontend + lint
```

---

## Getting Started
```bash
# 1. Clone and configure
cp .env.example .env

# 2. Build and run
npm install && npm run build
python backend/store_logs.py  # first time init

docker compose -f docker-compose.prod.yml up -d
```
> Access dashboard: http://localhost




---

## Setup Clients

- **Android: RethinkDNS, import** zendns-config.json

- **iOS: DNSCloak, use stamp from** dnscloak.txt

- **Windows/macOS/Linux: system DNS +** https://yourdomain.com/dns-query



---

## CI/CD

- docker-publish.yml: **build + push image to Docker Hub**

- react-build.yml: **build UI on push**

- test-lint.yml: **run flake8 + pytest**



---

## Deployment Options

- **Fully Dockerized**: docker-compose.prod.yml

- **Optional DoH server**: docker-compose.doh.yml

- zen_minimal_dist.sh: **make snapshot-only deployment**



---

## License

MIT 2025


---

> Made by GeekNeuron | v1.0
