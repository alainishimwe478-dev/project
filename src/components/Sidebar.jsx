export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 shadow-md min-h-screen p-4">
      <h1 className="text-xl font-bold text-blue-600 mb-6">RSSB HealthPay</h1>

      <ul className="space-y-3 text-gray-600 dark:text-gray-300">
        {[
          "Dashboard",
          "Users",
          "Payments",
          "Reports",
          "Notifications",
          "Settings",
          "Logout",
        ].map((item) => (
          <li key={item} className="hover:text-blue-600 cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
