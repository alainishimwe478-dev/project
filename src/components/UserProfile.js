import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile({ user, onProfileUpdate }) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const res = await fetch("/api/admin/upload-avatar", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        onProfileUpdate(data.avatarUrl);
        setOpen(false);
      } else {
        alert("Failed to upload image");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const defaultUser = {
    name: "Admin User",
    email: "admin@rssb.rw",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const currentUser = user || defaultUser;

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
      >
        <img
          src={currentUser.avatar}
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <span className="hidden md:inline text-gray-900 font-medium">{currentUser.name}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50 p-3">
          <p className="font-medium text-gray-900">{currentUser.name}</p>
          <p className="text-xs text-gray-500 mb-3">{currentUser.email}</p>

          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <span className="text-sm">Change Profile Picture:</span>
              <input type="file" onChange={handleFileChange} className="text-xs" />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-3 py-1 bg-[#003A8F] text-white rounded hover:bg-[#002F73]"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>

          <hr className="my-3" />
          <ul className="flex flex-col">
            <li>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                Profile
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                Settings
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 text-sm font-medium">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
