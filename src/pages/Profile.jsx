import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import SideMenu from "../components/SideMenu";
import ProfileHeader from "../components/ProfileHeader";
import ProfileInfo from "../components/ProfileInfo";
import InsuranceInfo from "../components/InsuranceInfo";
import ProfileActions from "../components/ProfileActions";
import BottomNav from "../components/BottomNav";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function Profile() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({
    id: 1,
    name: "Admin User",
    email: "admin@rssb.rw",
    role: "admin"
  });
  const { isDark } = useDarkMode();

  useEffect(() => {
    // Fetch user profile data
    fetch(`http://localhost:5000/api/profile/${user.id}`)
      .then(res => res.json())
      .then(data => setUser(prev => ({ ...prev, ...data })))
      .catch(() => console.log('Using default user data'));
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <TopBar onMenu={() => setMenuOpen(true)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="pb-28">
        <ProfileHeader />

        <div className="px-4 space-y-6 mt-4">
          <ProfileInfo />
          <InsuranceInfo />

          <h3 className={`font-semibold mt-6 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Settings</h3>
          <ProfileActions />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}