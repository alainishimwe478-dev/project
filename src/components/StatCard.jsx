import React from "react";

export default function StatCard({
  title,
  value,
  icon,
  color = "blue",
  children,
}) {
  const colorClasses = {
    red: "bg-red-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
  };

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div
              className={`w-8 h-8 ${colorClasses[color]} rounded-md flex items-center justify-center`}
            >
              {icon}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {title}
              </dt>
              <dd className="text-lg font-medium text-gray-900 dark:text-white">
                {value}
              </dd>
            </dl>
          </div>
        </div>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
}
