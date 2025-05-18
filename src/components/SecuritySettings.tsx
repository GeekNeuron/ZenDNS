import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SecuritySettings() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Security Settings</h2>
      <Input placeholder="Telegram Bot Token" />
      <Input placeholder="Chat ID" />
      <Input placeholder="Regex Pattern" />
      <Button>Save Settings</Button>
    </div>
  );
}
