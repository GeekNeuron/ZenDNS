import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";

export default function ZendnsWizard() {
  const [server, setServer] = useState("https://yourdomain.com/dns-query");
  const [platform, setPlatform] = useState("android");

  const rethinkLink = `https://rethinkdns.com/configure?name=ZenDNS&url=${encodeURIComponent(server)}`;
  const iosConfig = `sdns://AgcAAAAAAAAADjE5Mi4xNjguMS4xMDAgZG5zLmNsb2FrIGh0dHBzOi8veW91cmRvbWFpbi5jb20vZG5zLXF1ZXJ5`;

  const getGuide = () => {
    if (platform === "android")
      return `Install RethinkDNS → Settings → DNS → Custom DoH → ${server}`;
    if (platform === "ios")
      return `Install DNSCloak → Add Custom Resolver → ${server}`;
    if (platform === "windows")
      return `Settings > Network > DNS → Add custom DoH → ${server}`;
    if (platform === "mac")
      return `Settings > Network > DNS → Add secure resolver: ${server}`;
    if (platform === "linux")
      return `Use systemd-resolved or dnscrypt-proxy config with: ${server}`;
  };

  const saveFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    if (platform === "ios") {
      saveFile(iosConfig, "dnscloak.txt");
    } else {
      const json = JSON.stringify({ name: "ZenDNS", url: server }, null, 2);
      saveFile(json, "zendns-config.json");
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-xl font-bold">ZenDNS Setup Wizard</h2>
      <CardContent className="flex flex-col gap-4">
        <Input value={server} onChange={(e) => setServer(e.target.value)} />
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="android">Android</option>
          <option value="ios">iOS</option>
          <option value="windows">Windows</option>
          <option value="mac">macOS</option>
          <option value="linux">Linux</option>
        </select>

        <QRCode
          value={platform === "ios" ? iosConfig : server}
          className="w-full max-w-xs self-center"
        />

        {platform === "android" && (
          <a
            href={rethinkLink}
            className="text-blue-600 underline text-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Auto-import into RethinkDNS
          </a>
        )}

        <div className="flex gap-4 justify-center">
          <Button onClick={() => alert(getGuide())}>Show Instructions</Button>
          <Button onClick={handleExport} variant="outline">Export Config</Button>
        </div>
      </CardContent>
    </Card>
  );
}
