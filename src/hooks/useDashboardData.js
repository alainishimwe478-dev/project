import { useEffect, useState } from "react";

export default function useDashboardData() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData({
        balance: 150000,
        risk: "HIGH",
        coverageRemaining: 1.3,
        spendingIncrease: 28,
        fraudDetected: true,
        lastActivity: "Jan 12"
      });
      setLoading(false);
    }, 1500);
  }, []);

  return { loading, data };
}