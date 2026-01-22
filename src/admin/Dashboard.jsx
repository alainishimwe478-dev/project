import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis, Tooltip, Legend
} from "recharts";

const pieData = [
  { name: "Admins", value: 1 },
  { name: "Users", value: 24 },
  { name: "Guests", value: 10 }
];

const barData = [
  { name: "Jan", users: 10 },
  { name: "Feb", users: 18 },
  { name: "Mar", users: 30 }
];

export default function Dashboard() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Pie */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={pieData}
            cx={150}
            cy={150}
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      {/* Bar */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Monthly Users</h3>
        <BarChart width={300} height={300} data={barData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}
