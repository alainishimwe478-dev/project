import React, { useState } from 'react';
import { detectFakePayment } from '../utils/fraudDetection';

function PaymentProcessor({ isOpen, onClose, onPaymentSuccess }) {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    method: 'mobile',
    phoneNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiVerification, setAiVerification] = useState(null);

  const handleInputChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleAmountSelect = (amount) => {
    setPaymentData({ ...paymentData, amount });
    setStep(2);
  };

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    setStep(4);
    setAiVerification(null);

    // Simulate AI verification delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Run AI fraud detection
    const mockPayment = {
      amount: parseFloat(paymentData.amount),
      method: paymentData.method,
      timeSinceLastPayment: Math.random() * 3600000, // Random time in last hour
    };
    const verificationResult = detectFakePayment(mockPayment);
    setAiVerification(verificationResult);

    // If verified, proceed to processing
    if (verificationResult.status === 'REAL') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(3);
      await new Promise(resolve => setTimeout(resolve, 2000));
      onPaymentSuccess(paymentData.amount);
      onClose();
    } else {
      setIsProcessing(false);
    }
  };

  const quickAmounts = [25, 45, 75, 100, 150];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="bg-blue-600 text-white p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Make Payment</h3>
            <button onClick={onClose} className="text-white hover:text-gray-200 text-xl">×</button>
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Select Payment Amount</h4>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className="p-3 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">${amount}</div>
                        <div className="text-sm text-gray-500">USD</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <input
                    type="number"
                    name="amount"
                    value={paymentData.amount}
                    onChange={handleInputChange}
                    placeholder="Enter custom amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-3 top-2 text-gray-500">$</span>
                </div>
                {paymentData.amount && (
                  <button
                    onClick={() => setStep(2)}
                    className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h4>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                    <input
                      type="radio"
                      name="method"
                      value="mobile"
                      checked={paymentData.method === 'mobile'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">📱</span>
                      </div>
                      <div>
                        <div className="font-medium">Mobile Money</div>
                        <div className="text-sm text-gray-500">MTN, Airtel, Tigo</div>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                    <input
                      type="radio"
                      name="method"
                      value="card"
                      checked={paymentData.method === 'card'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">💳</span>
                      </div>
                      <div>
                        <div className="font-medium">Credit/Debit Card</div>
                        <div className="text-sm text-gray-500">Visa, Mastercard</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {paymentData.method === 'mobile' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={paymentData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+250 XXX XXX XXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {paymentData.method === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handlePaymentSubmit}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Pay ${paymentData.amount}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <h4 className="text-lg font-medium text-gray-900">Processing Payment...</h4>
              <p className="text-gray-600">Please wait while we process your payment securely.</p>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-lg font-medium text-gray-900">🤖 AI Verification</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Analyzing payment for security...</p>
                <div className="flex justify-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Checking Amount</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Validating Method</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Risk Assessment</span>
                </div>
              </div>
              {aiVerification && (
                <div className={`rounded-lg p-4 ${aiVerification.status === 'REAL' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center justify-center space-x-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      aiVerification.status === 'REAL' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {aiVerification.status === 'REAL' ? '✅ Verified' : '❌ Flagged'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{aiVerification.reason}</p>
                  <p className="text-xs text-gray-500">Confidence: {aiVerification.confidence}%</p>
                  {aiVerification.status === 'FAKE' && (
                    <button
                      onClick={() => setStep(2)}
                      className="mt-4 w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-medium shadow-lg"
                    >
                      Try Different Payment Method
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentProcessor;
