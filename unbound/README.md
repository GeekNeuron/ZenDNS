# unbound/

تنظیمات DNS resolver مبتنی بر Unbound در این مسیر قرار دارد.

محتویات:

- `unbound.conf`: پیکربندی اصلی شامل:
  - DNSSEC
  - QNAME minimization
  - Forwarding به DNSهای امن (DoT)
  - Cache و rate-limit

اختیاری:
- `root.hints`: لیست root serverها
