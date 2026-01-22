import React, { useState, useRef, useEffect } from 'react';

function AIChatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Muraho! I'm your RSSB HealthPay AI assistant. How can I help you with your health insurance today? (Hello! I'm your RSSB HealthPay AI assistant. How can I help you with your health insurance today?)",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState({
    topic: null,
    userData: null,
    language: 'en' // 'en', 'fr', 'rw'
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock user data - in real app this would come from authentication/context
  const mockUserData = {
    name: "Jean Baptiste",
    nationalId: "1199000000000003",
    balance: 2500,
    nextPaymentDue: "2024-12-01",
    insuranceStatus: "ACTIVE",
    claimsThisYear: 2,
    totalClaims: 15000,
    dependents: 3
  };

  // Enhanced AI responses with context awareness
  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Language detection
    if (lowerMessage.includes('muraho') || lowerMessage.includes('amahoro') || lowerMessage.includes('kinyarwanda')) {
      setConversationContext(prev => ({ ...prev, language: 'rw' }));
      return {
        text: "Muraho! Ndashobora kukuvuganira mu Kinyarwanda. Ni iki nagufasha kuri ubwishingizi bwawe bwa RSSB? (Hello! I can speak to you in Kinyarwanda. What can I help you with regarding your RSSB insurance?)",
        actions: ['payments', 'claims', 'coverage']
      };
    }

    if (lowerMessage.includes('bonjour') || lowerMessage.includes('français') || lowerMessage.includes('francais')) {
      setConversationContext(prev => ({ ...prev, language: 'fr' }));
      return {
        text: "Bonjour! Je peux vous aider en français. Comment puis-je vous assister avec votre assurance santé RSSB?",
        actions: ['payments', 'claims', 'coverage']
      };
    }

    // Payment-related queries
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('kwishyura') || lowerMessage.includes('payer')) {
      setConversationContext(prev => ({ ...prev, topic: 'payment' }));
      return {
        text: `Your next payment of ${mockUserData.balance} RWF is due on ${mockUserData.nextPaymentDue}. Would you like to make a payment now or set up automatic payments?`,
        actions: ['pay_now', 'setup_auto', 'payment_history']
      };
    }

    // Claims-related queries
    if (lowerMessage.includes('claim') || lowerMessage.includes('hospital') || lowerMessage.includes('doctor') || lowerMessage.includes('ubuvuzi')) {
      setConversationContext(prev => ({ ...prev, topic: 'claims' }));
      return {
        text: `You've made ${mockUserData.claimsThisYear} claims this year totaling ${mockUserData.totalClaims} RWF. Your insurance covers consultations, hospital stays, and medications. Need help submitting a new claim?`,
        actions: ['new_claim', 'track_claims', 'coverage_details']
      };
    }

    // Coverage and benefits
    if (lowerMessage.includes('coverage') || lowerMessage.includes('insurance') || lowerMessage.includes('benefit') || lowerMessage.includes('ubwishingizi')) {
      setConversationContext(prev => ({ ...prev, topic: 'coverage' }));
      return {
        text: `Your RSSB HealthPay coverage includes: Medical consultations, Hospital stays up to 500,000 RWF/year, Prescription medications, and ${mockUserData.dependents} family dependents. Your status is ${mockUserData.insuranceStatus}.`,
        actions: ['view_details', 'family_coverage', 'premium_info']
      };
    }

    // Status and account info
    if (lowerMessage.includes('status') || lowerMessage.includes('account') || lowerMessage.includes('balance') || lowerMessage.includes('imyigaragaro')) {
      return {
        text: `Your insurance status: ${mockUserData.insuranceStatus}. Current balance: ${mockUserData.balance} RWF due ${mockUserData.nextPaymentDue}. Family coverage: ${mockUserData.dependents} dependents.`,
        actions: ['pay_now', 'view_history', 'update_info']
      };
    }

    // Help and general queries
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('ubufasha')) {
      return {
        text: "I'm here to help with payments, claims, coverage questions, account status, and general support. What would you like to know?",
        actions: ['payments', 'claims', 'coverage', 'account', 'contact_human']
      };
    }

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('muraho')) {
      return {
        text: "Hello! Welcome to RSSB HealthPay. I'm here to help you manage your health insurance. What can I assist you with today?",
        actions: ['payments', 'claims', 'coverage', 'help']
      };
    }

    // Default response with smart suggestions
    return {
      text: "I understand you're asking about health insurance. Let me help you with the most common topics. What would you like to know about?",
      actions: ['payments', 'claims', 'coverage', 'status', 'help']
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: getAIResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action) => {
    let simulatedMessage = '';

    switch (action) {
      case 'pay_now':
        simulatedMessage = 'I want to make a payment now';
        break;
      case 'setup_auto':
        simulatedMessage = 'How do I set up automatic payments?';
        break;
      case 'payment_history':
        simulatedMessage = 'Show me my payment history';
        break;
      case 'new_claim':
        simulatedMessage = 'I want to submit a new claim';
        break;
      case 'track_claims':
        simulatedMessage = 'Track my existing claims';
        break;
      case 'coverage_details':
        simulatedMessage = 'Tell me about my coverage details';
        break;
      case 'view_details':
        simulatedMessage = 'View my coverage details';
        break;
      case 'family_coverage':
        simulatedMessage = 'Tell me about family coverage';
        break;
      case 'premium_info':
        simulatedMessage = 'Premium information';
        break;
      case 'view_history':
        simulatedMessage = 'View my account history';
        break;
      case 'update_info':
        simulatedMessage = 'Update my information';
        break;
      case 'contact_human':
        simulatedMessage = 'I need to speak to a human representative';
        break;
      case 'payments':
        simulatedMessage = 'Tell me about payments';
        break;
      case 'claims':
        simulatedMessage = 'Tell me about claims';
        break;
      case 'coverage':
        simulatedMessage = 'Tell me about coverage';
        break;
      case 'account':
        simulatedMessage = 'Account status';
        break;
      case 'help':
        simulatedMessage = 'I need help';
        break;
      default:
        simulatedMessage = action;
    }

    // Simulate user clicking the action button
    setInputMessage(simulatedMessage);
    handleSendMessage();
  };

  const getActionLabel = (action) => {
    const labels = {
      pay_now: '💳 Pay Now',
      setup_auto: '🔄 Auto Pay',
      payment_history: '📋 History',
      new_claim: '📝 New Claim',
      track_claims: '🔍 Track Claims',
      coverage_details: '📋 Coverage',
      view_details: '👁️ View Details',
      family_coverage: '👨‍👩‍👧‍👦 Family',
      premium_info: '💰 Premium',
      view_history: '📈 History',
      update_info: '✏️ Update Info',
      contact_human: '👤 Human Help',
      payments: '💳 Payments',
      claims: '🏥 Claims',
      coverage: '🛡️ Coverage',
      account: '👤 Account',
      help: '❓ Help'
    };
    return labels[action] || action;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">AI</span>
            </div>
            <div>
              <h3 className="font-semibold">RSSB AI Assistant</h3>
              <p className="text-xs opacity-90">Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-xs">
                <div
                  className={`px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {typeof message.text === 'object' ? message.text.text : message.text}
                </div>
                {/* Quick Action Buttons */}
                {message.sender === 'bot' && typeof message.text === 'object' && message.text.actions && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {message.text.actions.slice(0, 3).map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action)}
                        className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        {getActionLabel(action)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-3 py-2 rounded-lg">
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

        {/* Input */}
        <div className="border-t p-3">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIChatbot;
