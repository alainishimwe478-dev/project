import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', payments: 4000 },
  { name: 'Feb', payments: 3000 },
  { name: 'Mar', payments: 5000 },
  { name: 'Apr', payments: 4500 },
  { name: 'May', payments: 6000 },
  { name: 'Jun', payments: 5500 },
];

export default function PaymentsChart() {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Payments Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="payments" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
