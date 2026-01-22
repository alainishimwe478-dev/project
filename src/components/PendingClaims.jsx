export default function PendingClaims() {
  const claims = [
    { id: 1, user: "Alice Brown", amount: 2000, status: "Pending" },
    { id: 2, user: "Charlie Wilson", amount: 1500, status: "Pending" },
    { id: 3, user: "Diana Prince", amount: 3500, status: "Pending" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Pending Claims</h3>
      <ul className="space-y-3">
        {claims.map((claim) => (
          <li key={claim.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{claim.user}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {claim.status}
              </p>
            </div>
            <span className="font-semibold">RWF {claim.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
