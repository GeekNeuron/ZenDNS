# dist/

پوشه build شده‌ی frontend (React PWA UI) که با `npm run build` یا `vite build` ایجاد می‌شود.

- محتویات آن شامل `index.html`, فایل‌های `assets/`, `manifest`, `service-worker.js` است.
- این مسیر در `docker-compose.prod.yml` mount شده و توسط API یا Nginx سرو می‌شود.

> اگر این پوشه را در Git ثبت می‌کنید اما هنوز خروجی build ندارید، می‌توانید این فایل README را نگه دارید.
