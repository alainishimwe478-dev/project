import React, { useState } from "react";
import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import QuickActions from "../components/QuickActions";
import SpendingInsights from "../components/SpendingInsights";
import CoveragePrediction from "../components/CoveragePrediction";
import SmartAlerts from "../components/SmartAlerts";
import FraudWarning from "../components/FraudWarning";
import RecentPayments from "../components/RecentPayments";
import AIChat from "../components/AIChat";
import BottomNav from "../components/BottomNav";
import TopBar from "../components/TopBar";
import SideMenu from "../components/SideMenu";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark } = useDarkMode();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <TopBar onMenu={() => setMenuOpen(true)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      
      <div className="pb-28">
        <Header />
        <div className="px-4 space-y-6 mt-4">
          <SmartAlerts />
          <BalanceCard />
          <CoveragePrediction />
          <QuickActions />
          <SpendingInsights />
          <FraudWarning />
          <RecentPayments />
        </div>

        <AIChat />
      </div>
      
      <BottomNav />
    </div>
  );
}