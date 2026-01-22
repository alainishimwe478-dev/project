import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Hospital", value: 65 },
  { name: "Pharmacy", value: 20 },
  { name: "Clinic", value: 15 }
];

const COLORS = ["#2563eb", "#22c55e", "#facc15"];

export default function SpendingInsights() {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-3">AI Spending Insights</h3>

      <PieChart width={220} height={220}>
        <Pie
          data={data}
          cx={110}
          cy={110}
          outerRadius={80}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
      </PieChart>

      <p className="text-sm text-gray-600 mt-2">
        📈 Hospital spending increased by <b>28%</b>
      </p>
    </div>
  );
}