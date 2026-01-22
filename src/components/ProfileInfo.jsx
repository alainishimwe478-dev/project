import React from "react";

export default function ProfileInfo() {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-4">Personal Information</h3>

      {[
        ["Full Name", "Jean Claude"],
        ["National ID", "1199********23"],
        ["Phone Number", "+250 7** *** ***"],
        ["Email", "jean.claude@email.com"]
      ].map(([label, value]) => (
        <div key={label} className="flex justify-between py-2 border-b last:border-none">
          <span className="text-gray-500 text-sm">{label}</span>
          <span className="font-medium text-sm">{value}</span>
        </div>
      ))}
    </div>
  );
}