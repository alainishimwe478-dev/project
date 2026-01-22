import { useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "John", role: "User" },
    { id: 2, name: "Alice", role: "Guest" }
  ]);

  const deleteUser = (id) =>
    setUsers(users.filter(u => u.id !== id));

  return (
    <div className="card">
      <h2>Users</h2>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
