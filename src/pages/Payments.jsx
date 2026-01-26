import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import SideMenu from "../components/SideMenu";
import BottomNav from "../components/BottomNav";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function Payments() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useDarkMode();

  useEffect(() => {
    // Fetch payments data
    fetch('http://localhost:5000/api/payments')
      .then(res => res.json())
      .then(data => {
        setPayments(data);
        setLoading(false);
      })
      .catch(() => {
        console.log('Using default payments data');
        setLoading(false);
      });
    
    // Fetch payment methods
    fetch('http://localhost:5000/api/payment-methods')
      .then(res => res.json())
      .then(data => setPaymentMethods(data))
      .catch(() => console.log('Using default payment methods'));
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <TopBar onMenu={() => setMenuOpen(true)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="p-4 pb-28">
        <h1 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Payments</h1>

        <div className={`rounded-xl p-4 shadow mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Payment Methods</h2>
          <div className="space-y-2">
            {paymentMethods.length > 0 ? paymentMethods.map((method, i) => (
              <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <span>{method.icon}</span>
                <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>{method.name}</span>
              </div>
            )) : [
              { icon: "📱", name: "MTN Mobile Money" },
              { icon: "🏦", name: "Bank of Kigali" }
            ].map((method, i) => (
              <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <span>{method.icon}</span>
                <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>{method.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-xl p-4 shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Transactions</h2>
          {loading ? (
            <div className="text-center py-4">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Loading transactions...</span>
            </div>
          ) : (
            <div className="space-y-3">
              {payments.length > 0 ? payments.slice(0, 10).map((payment, i) => (
                <div key={i} className={`flex justify-between items-center border-b pb-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {payment.type || payment.description}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {payment.date || payment.createdAt}
                    </p>
                  </div>
                  <span className={`font-semibold ${
                    payment.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {payment.amount > 0 ? '+' : '-'}RWF {Math.abs(payment.amount).toLocaleString()}
                  </span>
                </div>
              )) : [
                { type: "🏥 Hospital Visit", date: "Jan 15, 2024", amount: -5000 },
                { type: "💊 Pharmacy", date: "Jan 12, 2024", amount: -2000 },
                { type: "🩺 Clinic Visit", date: "Jan 10, 2024", amount: -3500 }
              ].map((payment, i) => (
                <div key={i} className={`flex justify-between items-center border-b pb-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{payment.type}</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{payment.date}</p>
                  </div>
                  <span className="font-semibold text-red-600">-RWF {Math.abs(payment.amount).toLocaleString()}</span>
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