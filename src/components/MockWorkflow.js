// MockWorkflow.js - Enhanced Chat-Style AI Assistant for RSSB HealthPay
import React, { useState, useEffect, useRef } from "react";

function MockWorkflow() {
  const [household, setHousehold] = useState(["Self"]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your RSSB HealthPay AI assistant. I'll help you pay for Mutuelle health insurance. Let's start by setting up your household. How many family members need coverage?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'greeting'
    }
  ]);
  const [currentStep, setCurrentStep] = useState('household');
  const [receipt, setReceipt] = useState(null);
  const [history, setHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch Payment History
  const fetchHistory = async () => {
    const res = await fetch("http://localhost:5000/history");
    const data = await res.json();
    setHistory(data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const addMessage = (text, sender, type = 'text') => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 1000 + Math.random() * 1500);
  };

  const handleAddMember = () => {
    const newMember = `Member ${household.length}`;
    setHousehold([...household, newMember]);
    addMessage(`Added ${newMember} to household`, 'user', 'action');

    simulateTyping(() => {
      if (household.length >= 2) {
        addMessage(`Great! Now you have ${household.length + 1} family members. Ready to calculate the payment?`, 'bot', 'question');
        setCurrentStep('calculate');
      } else {
        addMessage("Would you like to add more family members or proceed with payment calculation?", 'bot', 'question');
      }
    });
  };

  const handleCalculatePayment = async () => {
    addMessage("Please calculate my Mutuelle payment", 'user', 'action');

    simulateTyping(async () => {
      const res = await fetch("http://localhost:5000/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ household }),
      });
      const data = await res.json();

      addMessage(data.reply, 'bot', 'info');
      setCurrentStep('payment');
    });
  };

  const handlePayment = async () => {
    addMessage("Pay Now (Simulate)", 'user', 'action');

    simulateTyping(async () => {
      addMessage("Processing your payment...", 'bot', 'processing');

      setTimeout(async () => {
        const res = await fetch("http://localhost:5000/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ household }),
        });
        const data = await res.json();

        if (data.success) {
          setReceipt(data.receipt);
          fetchHistory();
          addMessage("Payment successful! Here's your receipt:", 'bot', 'success');
          addMessage(`Receipt ID: ${data.receipt.id}\nHousehold: ${data.receipt.household.join(", ")}\nAmount: RWF ${data.receipt.amount}\nDate: ${data.receipt.date}`, 'bot', 'receipt');
          setCurrentStep('complete');
        }
      }, 2000);
    });
  };

  const handleRestart = () => {
    setHousehold(["Self"]);
    setReceipt(null);
    setCurrentStep('household');
    addMessage("Let's start over. How many family members need coverage?", 'bot', 'question');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-2xl font-bold">RSSB HealthPay AI Assistant</h1>
            <p className="text-blue-100 mt-1">Your intelligent health insurance payment guide</p>
          </div>

          <div className="flex">
            {/* Chat Interface */}
            <div className="flex-1 flex flex-col h-96">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : message.type === 'success'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : message.type === 'receipt'
                          ? 'bg-gray-100 text-gray-800 border border-gray-200'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.type === 'receipt' ? (
                        <div className="space-y-1 text-sm">
                          {message.text.split('\n').map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        </div>
                      ) : (
                        message.text
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Action Buttons */}
              <div className="border-t p-4 bg-gray-50">
                <div className="flex flex-wrap gap-2">
                  {currentStep === 'household' && (
                    <button
                      onClick={handleAddMember}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Add Family Member
                    </button>
                  )}

                  {currentStep === 'household' && household.length > 1 && (
                    <button
                      onClick={handleCalculatePayment}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Calculate Payment
                    </button>
                  )}

                  {currentStep === 'calculate' && (
                    <button
                      onClick={handleCalculatePayment}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Calculate Payment
                    </button>
                  )}

                  {currentStep === 'payment' && (
                    <button
                      onClick={handlePayment}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Pay Now (Simulate)
                    </button>
                  )}

                  {currentStep === 'complete' && (
                    <button
                      onClick={handleRestart}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Start New Payment
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-80 border-l bg-gray-50 p-4">
              {/* Household Summary */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Household Members</h3>
                <div className="space-y-2">
                  {household.map((member, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-sm font-medium">{i + 1}</span>
                      </div>
                      <span className="text-gray-700">{member}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  Total members: {household.length} | Estimated cost: RWF {household.length * 5000}
                </div>
              </div>

              {/* Payment History */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Payments</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {history.slice(-3).map((r) => (
                    <div key={r.id} className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="text-sm font-medium text-gray-900">ID: {r.id}</div>
                      <div className="text-sm text-gray-600">RWF {r.amount}</div>
                      <div className="text-xs text-gray-500">{r.date}</div>
                    </div>
                  ))}
                  {history.length === 0 && (
                    <div className="text-sm text-gray-500 text-center py-4">
                      No payments yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockWorkflow;
