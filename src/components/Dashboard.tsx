import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <Card className="p-4">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">ZenDNS Dashboard</h2>
        <p>Status, stats, and charts will appear here.</p>
      </CardContent>
    </Card>
  );
}
