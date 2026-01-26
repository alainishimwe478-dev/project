import React from 'react';

const data = [
  { name: "Hospitals", value: 680, color: "#003A8F" },
  { name: "Clinics", value: 240, color: "#002F73" },
  { name: "Pharmacies", value: 180, color: "#F5C400" },
  { name: "Emergency", value: 290, color: "#003A8F" },
  { name: "Specialists", value: 220, color: "#002F73" },
  { name: "Diagnostics", value: 160, color: "#F5C400" },
];

export default function PaymentChart() {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="w-full h-72">
      <div className="h-full flex items-end justify-center space-x-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center group">
            <div className="flex flex-col justify-end h-48">
              <div 
                className="rounded-t-lg transition-all duration-1000 ease-out flex items-end justify-center text-white text-xs font-medium hover:opacity-80 cursor-pointer"
                style={{ 
                  height: `${(item.value / maxValue) * 180}px`, 
                  width: '50px',
                  backgroundColor: item.color
                }}
                title={`${item.name}: RWF ${item.value}M`}
              >
                <span className="mb-1">{item.value}M</span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">RWF {item.value}M</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}