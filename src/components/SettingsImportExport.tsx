import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function SettingsImportExport() {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const settings = localStorage.getItem("dns-security-settings");
    const blob = new Blob([settings || "{}"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dns-security-settings.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        localStorage.setItem("dns-security-settings", JSON.stringify(data));
        alert("Settings imported.");
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex gap-4">
      <Button onClick={handleExport}>Export</Button>
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        onChange={handleImport}
        accept="application/json"
      />
      <Button variant="outline" onClick={() => fileRef.current?.click()}>
        Import
      </Button>
    </div>
  );
}
