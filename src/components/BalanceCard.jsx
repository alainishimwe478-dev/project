export default function BalanceCard() {
  return (
    <div className="mt-6 bg-gradient-to-r from-blue-600 to-blue-500 
      rounded-2xl p-6 text-white shadow-lg">

      <p className="text-sm">Coverage Balance</p>

      <h2 className="text-3xl font-bold mt-2">
        RWF 150,000
      </h2>

      <p className="text-sm mt-4 opacity-90">
        Active • Valid Until: 30/12/2024
      </p>
    </div>
  );
}