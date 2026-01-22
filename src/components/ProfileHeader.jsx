import React from "react";

export default function ProfileHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 
      p-6 text-white rounded-b-3xl">

      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center text-3xl">
          👤
        </div>

        <div>
          <h2 className="text-xl font-semibold">Jean Claude</h2>
          <p className="text-sm opacity-90">RSSB Member</p>

          <span className="inline-block mt-2 bg-green-400 
            text-blue-900 text-xs px-3 py-1 rounded-full font-semibold">
            ACTIVE COVERAGE
          </span>
        </div>
      </div>
    </div>
  );
}