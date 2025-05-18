import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LiveEnvEditor() {
  const [envs, setEnvs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("env-override") || "{}");
    } catch {
      return {};
    }
  });

  const keys = [
    "TELEGRAM_TOKEN", "TELEGRAM_CHAT_ID", "EMAIL_FROM", "SMTP_HOST", "BLOCK_THRESHOLD"
  ];

  const update = (key: string, value: string) => {
    const updated = { ...envs, [key]: value };
    localStorage.setItem("env-override", JSON.stringify(updated));
    setEnvs(updated);
  };

  return (
    <div className="p-4 space-y-2">
      {keys.map((k) => (
        <Input key={k} value={envs[k] || ""} onChange={(e) => update(k, e.target.value)} placeholder={k} />
      ))}
      <Button onClick={() => alert("Saved to localStorage")}>Save</Button>
    </div>
  );
}
