import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import SideMenu from "../components/SideMenu";
import BottomNav from "../components/BottomNav";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function Claims() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useDarkMode();

  useEffect(() => {
    // Fetch claims data
    fetch('http://localhost:5000/api/admin/claims')
      .then(res => res.json())
      .then(data => {
        setClaims(Array.isArray(data) ? data : data.claims || []);
        setLoading(false);
      })
      .catch(() => {
        console.log('Using default claims data');
        setClaims([
          { id: 'CLM-1001', type: '🏥 Medical Claim', date: 'Jan 15, 2024', status: 'Approved', amount: 'RWF 50,000', patient: 'John Doe' },
          { id: 'CLM-1002', type: '💊 Pharmacy Claim', date: 'Jan 12, 2024', status: 'Pending', amount: 'RWF 25,000', patient: 'Jane Smith' },
          { id: 'CLM-1003', type: '🩺 Consultation Claim', date: 'Jan 10, 2024', status: 'Rejected', amount: 'RWF 15,000', patient: 'Bob Johnson' }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <TopBar onMenu={() => setMenuOpen(true)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="p-4 pb-28">
        <h1 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Claims</h1>

        <div className={`rounded-xl p-4 shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Claims</h2>
          {loading ? (
            <div className="text-center py-4">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Loading claims...</span>
            </div>
          ) : (
            <div className="space-y-3">
              {claims.length > 0 ? claims.slice(0, 10).map((claim, i) => (
                <div key={i} className={`flex justify-between items-center border-b pb-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {claim.type || claim.description}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {claim.date || claim.createdAt}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    claim.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {claim.status}
                  </span>
                </div>
              )) : [
                { type: "🏥 Medical Claim", date: "Jan 15, 2024", status: "Approved" },
                { type: "💊 Pharmacy Claim", date: "Jan 12, 2024", status: "Pending" },
                { type: "🩺 Consultation Claim", date: "Jan 10, 2024", status: "Rejected" }
              ].map((claim, i) => (
                <div key={i} className={`flex justify-between items-center border-b pb-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{claim.type}</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{claim.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    claim.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {claim.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}