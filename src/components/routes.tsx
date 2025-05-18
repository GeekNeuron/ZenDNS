import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@/components/Dashboard";
import LiveTable from "@/components/LiveTable";
import SecuritySettings from "@/components/SecuritySettings";
import SettingsImportExport from "@/components/SettingsImportExport";
import ZendnsWizard from "@/components/ZendnsWizard";
import StaticSetupPage from "@/components/StaticSetupPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/live" element={<LiveTable />} />
        <Route path="/security" element={<SecuritySettings />} />
        <Route path="/import" element={<SettingsImportExport />} />
        <Route path="/wizard" element={<ZendnsWizard />} />
        <Route path="/setup" element={<StaticSetupPage />} />
      </Routes>
    </BrowserRouter>
  );
}
