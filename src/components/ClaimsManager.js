import React, { useState } from 'react';

function ClaimsManager({ isOpen, onClose }) {
  const [claims, setClaims] = useState(() => {
    // Try to load from localStorage, fallback to default data
    const savedClaims = localStorage.getItem('userClaims');
    if (savedClaims) {
      return JSON.parse(savedClaims);
    }
    return [
      {
        id: 1,
        type: 'Medical Consultation',
        amount: 150,
        date: '2024-01-15',
        status: 'Approved',
        description: 'General practitioner visit'
      },
      {
        id: 2,
        type: 'Prescription',
        amount: 75,
        date: '2024-01-10',
        status: 'Processing',
        description: 'Blood pressure medication'
      },
      {
        id: 3,
        type: 'Hospital Stay',
        amount: 500,
        date: '2024-01-05',
        status: 'Pending',
        description: 'Emergency room visit'
      }
    ];
  });

  const [newClaim, setNewClaim] = useState({
    type: '',
    amount: '',
    description: '',
    date: '',
    documents: []
  });

  const [showNewClaimForm, setShowNewClaimForm] = useState(false);

  const handleCancelClaim = (claimId) => {
    console.log('Cancelling claim:', claimId);
    const confirmCancel = window.confirm('Are you sure you want to cancel this claim? This action cannot be undone.');
    if (confirmCancel) {
      const updatedClaims = claims.map(claim =>
        claim.id === claimId
          ? { ...claim, status: 'Cancelled' }
          : claim
      );
      setClaims(updatedClaims);
      // Save to localStorage to persist the change
      localStorage.setItem('userClaims', JSON.stringify(updatedClaims));
      console.log('Claim cancelled successfully');
      alert('Claim has been cancelled successfully.');
    }
  };

  const handleNewClaimSubmit = (e) => {
    e.preventDefault();
    const claim = {
      id: claims.length + 1,
      ...newClaim,
      status: 'Submitted',
      date: new Date().toISOString().split('T')[0]
    };
    setClaims([claim, ...claims]);
    setNewClaim({ type: '', amount: '', description: '', date: '', documents: [] });
    setShowNewClaimForm(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Claims Management</h3>
            <button onClick={onClose} className="text-white hover:text-gray-200 text-xl">
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{claims.length}</div>
              <div className="text-sm text-blue-800">Total Claims</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {claims.filter(c => c.status === 'Approved').length}
              </div>
              <div className="text-sm text-green-800">Approved</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {claims.filter(c => c.status === 'Processing').length}
              </div>
              <div className="text-sm text-yellow-800">Processing</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                ${claims.filter(c => c.status === 'Approved').reduce((sum, c) => sum + c.amount, 0)}
              </div>
              <div className="text-sm text-purple-800">Total Paid</div>
            </div>
          </div>

          {/* New Claim Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowNewClaimForm(!showNewClaimForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {showNewClaimForm ? 'Cancel' : '+ Submit New Claim'}
            </button>
          </div>

          {/* New Claim Form */}
          {showNewClaimForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Submit New Claim</h4>
              <form onSubmit={handleNewClaimSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Claim Type
                    </label>
                    <select
                      value={newClaim.type}
                      onChange={(e) => setNewClaim({...newClaim, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="Medical Consultation">Medical Consultation</option>
                      <option value="Prescription">Prescription</option>
                      <option value="Hospital Stay">Hospital Stay</option>
                      <option value="Dental">Dental</option>
                      <option value="Optical">Optical</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount ($)
                    </label>
                    <input
                      type="number"
                      value={newClaim.amount}
                      onChange={(e) => setNewClaim({...newClaim, amount: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newClaim.description}
                    onChange={(e) => setNewClaim({...newClaim, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Describe the medical service or treatment"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Date
                  </label>
                  <input
                    type="date"
                    value={newClaim.date}
                    onChange={(e) => setNewClaim({...newClaim, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Submit Claim
                  </button>
                  <button
                    type="button"
                    className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Claims List */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h4 className="text-lg font-medium text-gray-900">Your Claims</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {claims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {claim.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${claim.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {claim.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(claim.status)}`}>
                          {claim.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {claim.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {console.log('Claim status:', claim.id, claim.status, typeof claim.status)}
                        {(claim.status === 'Pending' || claim.status === 'Processing') && (
                          <button
                            onClick={() => {
                              console.log('Cancel button clicked for claim:', claim.id);
                              handleCancelClaim(claim.id);
                            }}
                            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-xs font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                        {claim.status === 'Cancelled' && (
                          <span className="text-gray-500 text-xs">Cancelled</span>
                        )}
                        {claim.status !== 'Pending' && claim.status !== 'Processing' && claim.status !== 'Cancelled' && (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClaimsManager;
