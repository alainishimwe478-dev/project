import React from "react";

const data = [
  { name: "Hospitals", value: 400000 },
  { name: "Clinics", value: 250000 },
  { name: "Pharmacies", value: 150000 },
  { name: "Emergency Services", value: 200000 },
  { name: "Specialists", value: 180000 },
  { name: "Diagnostics", value: 100000 },
];

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#FBBF24", "#6366F1"];

function PieChartCard({ title }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border h-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                <span className="text-sm font-medium text-gray-700">{percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PieChartCard;