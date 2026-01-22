import { useState } from "react";

export default function AIChat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 w-14 h-14 
        bg-blue-600 text-white rounded-full shadow-lg"
      >
        🤖
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 w-80 
          bg-white rounded-xl shadow-lg p-4">
          <div className="flex justify-between">
            <h4 className="font-semibold">HealthPay AI</h4>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="mt-3 text-sm bg-gray-100 p-2 rounded">
            Can I afford a 50,000 RWF hospital visit?
          </div>

          <div className="mt-2 text-sm bg-blue-100 p-2 rounded">
            ✅ Yes. You will still have sufficient coverage.
          </div>

          <input
            className="mt-3 w-full border rounded px-3 py-2 text-sm"
            placeholder="Ask HealthPay AI..."
          />
        </div>
      )}
    </>
  );
}