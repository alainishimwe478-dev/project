import React, { useState } from "react";
import BottomNav from "../components/BottomNav";

export default function ProfileSettings() {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "Jean Claude",
    email: "jean.claude@email.com",
    phone: "+250 788 123 456",
    nationalId: "1199880012345623",
    address: "Kigali, Rwanda"
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-28">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-white/20 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Profile Settings</h1>
        </div>
      </div>

      <div className="px-4 space-y-6 mt-6">
        {/* Profile Image Section */}
        <div className="bg-white rounded-xl p-6 shadow text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl">👤</span>
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-3">Tap camera icon to change photo</p>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="font-semibold mb-4">Personal Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">National ID</label>
              <input
                type="text"
                value={formData.nationalId}
                onChange={(e) => handleInputChange('nationalId', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="font-semibold mb-4">Security</h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="flex items-center gap-3">
                <span>🔒</span>
                <span>Change Password</span>
              </span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="flex items-center gap-3">
                <span>📱</span>
                <span>Two-Factor Authentication</span>
              </span>
              <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
            Save Changes
          </button>
          
          <button className="w-full py-4 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100">
            Delete Account
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}