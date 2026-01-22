import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#FBBF24", "#6366F1"];

const data = [
  { name: "Hospitals", value: 400000 },
  { name: "Clinics", value: 250000 },
  { name: "Pharmacies", value: 150000 },
  { name: "Emergency Services", value: 200000 },
  { name: "Specialists", value: 180000 },
  { name: "Diagnostics", value: 100000 },
];

function PieChartCard({ title }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border h-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={(entry) => entry.name}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `RWF ${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartCard;