import React, { useState, useEffect } from "react";

function AdminReports() {
  // --- Payments Data ---
  const [payments] = useState([
    {
      id: "PAY-001",
      user: "Jean Claude",
      service: "King Faisal Hospital",
      method: "MoMo",
      amount: 35000,
      status: "Completed",
      date: "2024-01-12",
      risk: "Low",
      aiNote: "Pays on time consistently",
    },
    {
      id: "PAY-002",
      user: "Eric Mugisha",
      service: "Pharmacy BCM",
      method: "Bank",
      amount: 8000,
      status: "Completed",
      date: "2024-01-10",
      risk: "Low",
      aiNote: "Stable income pattern",
    },
    {
      id: "PAY-003",
      user: "Alice Uwizera",
      service: "Polyclinic Gikondo",
      method: "MoMo",
      amount: 12000,
      status: "Pending",
      date: "2024-01-09",
      risk: "Medium",
      aiNote: "Delayed payment last month",
    },
    {
      id: "PAY-004",
      user: "Amahle Hluphi",
      service: "Pharmacy",
      method: "MoMo",
      amount: 13000,
      status: "Failed",
      date: "2024-01-06",
      risk: "High",
      aiNote: "Multiple failed attempts",
    },
  ]);

  // --- Pending Claims Data ---
  const [claims] = useState([
    { hospital: "King Faisal Hospital", amount: "RWF 390,000", claim: "390,000" },
    { hospital: "City Med Hospital", amount: "RWF 130,000", claim: "460,000" },
    { hospital: "Hope Pharmacy", amount: "RWF 48,000", claim: "240,000" },
  ]);

  // --- Filters ---
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // --- Filtered Payments ---
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.user.toLowerCase().includes(search.toLowerCase()) ||
      payment.service.toLowerCase().includes(search.toLowerCase()) ||
      payment.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || payment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Reports</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search user, service, payment ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm w-full md:w-60"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm w-full md:w-40"
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>

        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          Export CSV
        </button>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500 text-left">
              <th className="pb-3">Payment ID</th>
              <th className="pb-3">User</th>
              <th className="pb-3">Service</th>
              <th className="pb-3">Method</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">AI Risk</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 font-medium">{payment.id}</td>
                <td className="py-3">{payment.user}</td>
                <td className="py-3">{payment.service}</td>
                <td className="py-3">{payment.method}</td>
                <td className="py-3 font-medium">
                  RWF {payment.amount.toLocaleString()}
                </td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      payment.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : payment.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      payment.risk === "Low"
                        ? "bg-green-100 text-green-700"
                        : payment.risk === "Medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payment.risk} Risk
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {payment.aiNote}
                  </p>
                </td>
                <td className="py-3">{payment.date}</td>
                <td className="py-3">
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pending Claims Summary */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Pending Claims
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {claims.map((claim, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg flex flex-col justify-between"
            >
              <p className="font-medium text-gray-900">{claim.hospital}</p>
              <p className="text-sm text-gray-500">Claim Amount: {claim.claim}</p>
              <p className="text-sm font-medium text-gray-900">{claim.amount}</p>
              <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminReports;