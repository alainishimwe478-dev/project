import React from "react";

export default function InsuranceInfo() {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-4">Insurance Details</h3>

      {[
        ["Insurance Type", "RSSB – Community Based"],
        ["Coverage Balance", "RWF 150,000"],
        ["Status", "Active"],
        ["Valid Until", "30 Dec 2024"]
      ].map(([label, value]) => (
        <div key={label} className="flex justify-between py-2 border-b last:border-none">
          <span className="text-gray-500 text-sm">{label}</span>
          <span className="font-medium text-sm">{value}</span>
        </div>
      ))}
    </div>
  );
}