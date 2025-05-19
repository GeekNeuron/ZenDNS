import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import QRCode from "react-qr-code";

export default function AutoLinkWizard() {
  const [server, setServer] = useState("https://yourdomain.com/dns-query");

  const rethinkLink = `https://rethinkdns.com/configure?name=ZenDNS&url=${encodeURIComponent(server)}`;
  const dnsStamp = `dns://${btoa(server)}`;

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-xl font-bold">ZenDNS Auto Config</h2>
      <CardContent className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          value={server}
          onChange={(e) => setServer(e.target.value)}
        />

        <div className="text-sm">
          <p><strong>RethinkDNS:</strong> <a className="text-blue-600 underline" href={rethinkLink}>{rethinkLink}</a></p>
          <p><strong>DNS Stamp:</strong> {dnsStamp}</p>
        </div>

        <div className="self-center">
          <QRCode value={rethinkLink} size={180} />
        </div>
      </CardContent>
    </Card>
  );
}
