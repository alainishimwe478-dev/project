// AI Fraud Detection for RSSB HealthPay
// Simple but effective rules-based AI for detecting fake/suspicious payments

export function detectFakePayment(payment) {
  // Basic validation checks
  if (!payment.transactionId || payment.transactionId.length < 8) {
    return {
      status: "FAKE",
      reason: "Invalid or missing transaction ID",
      confidence: 95
    };
  }

  if (!payment.amount || payment.amount < 3000) {
    return {
      status: "FAKE",
      reason: "Amount too low for health insurance payment",
      confidence: 90
    };
  }

  if (payment.amount > 50000) {
    return {
      status: "SUSPICIOUS",
      reason: "Unusually high payment amount",
      confidence: 75
    };
  }

  // Check for duplicate transactions (same amount, same phone within 5 minutes)
  if (payment.duplicate === true) {
    return {
      status: "FAKE",
      reason: "Duplicate transaction detected",
      confidence: 85
    };
  }

  // Check for rapid successive payments (potential fraud)
  if (payment.timeSinceLastPayment && payment.timeSinceLastPayment < 300000) { // 5 minutes
    return {
      status: "SUSPICIOUS",
      reason: "Multiple rapid payments detected",
      confidence: 70
    };
  }

  // Check mobile money reference format
  if (payment.method === 'MTN Mobile Money' || payment.method === 'Airtel Money') {
    const referencePattern = /^[A-Z0-9]{8,12}$/;
    if (!referencePattern.test(payment.reference || '')) {
      return {
        status: "FAKE",
        reason: "Invalid mobile money reference format",
        confidence: 80
      };
    }
  }

  // Check for suspicious keywords in notes
  const suspiciousKeywords = ['test', 'fake', 'demo', 'hack', 'admin'];
  if (payment.notes) {
    const lowerNotes = payment.notes.toLowerCase();
    for (const keyword of suspiciousKeywords) {
      if (lowerNotes.includes(keyword)) {
        return {
          status: "FAKE",
          reason: "Suspicious keywords detected in payment notes",
          confidence: 60
        };
      }
    }
  }

  // All checks passed
  return {
    status: "REAL",
    reason: "Payment appears legitimate",
    confidence: 95
  };
}

// Get payment statistics for dashboard
export function getPaymentStats(payments) {
  const stats = {
    total: payments.length,
    real: 0,
    fake: 0,
    suspicious: 0,
    totalAmount: 0,
    realAmount: 0,
    fakeAmount: 0
  };

  payments.forEach(payment => {
    const result = detectFakePayment(payment);
    stats.totalAmount += payment.amount || 0;

    if (result.status === 'REAL') {
      stats.real++;
      stats.realAmount += payment.amount || 0;
    } else if (result.status === 'FAKE') {
      stats.fake++;
      stats.fakeAmount += payment.amount || 0;
    } else if (result.status === 'SUSPICIOUS') {
      stats.suspicious++;
    }
  });

  return stats;
}

// AI Alert system for admins
export function generateAIAlert(payment, result) {
  if (result.status === 'FAKE' || result.status === 'SUSPICIOUS') {
    return {
      type: 'PAYMENT_ALERT',
      severity: result.status === 'FAKE' ? 'HIGH' : 'MEDIUM',
      title: `🚨 ${result.status} Payment Detected`,
      message: `${result.reason} - Confidence: ${result.confidence}%`,
      paymentId: payment.transactionId,
      amount: payment.amount,
      citizenId: payment.nationalId,
      timestamp: new Date().toISOString(),
      actionRequired: result.status === 'FAKE' ? 'IMMEDIATE_REVIEW' : 'REVIEW'
    };
  }
  return null;
}

// Mock payment data for testing
export const mockPayments = [
  {
    transactionId: "TXN12345678",
    amount: 3000,
    method: "MTN Mobile Money",
    reference: "REF123456",
    nationalId: "1199000000000001",
    notes: "Monthly health insurance",
    timestamp: "2024-12-01T10:00:00Z"
  },
  {
    transactionId: "FAKE001",
    amount: 500,
    method: "MTN Mobile Money",
    reference: "INVALID",
    nationalId: "1199000000000002",
    notes: "test payment",
    timestamp: "2024-12-01T10:05:00Z"
  },
  {
    transactionId: "TXN87654321",
    amount: 3000,
    method: "Airtel Money",
    reference: "AIR123456",
    nationalId: "1199000000000003",
    notes: "",
    timestamp: "2024-12-01T10:10:00Z"
  },
  {
    transactionId: "TXN99999999",
    amount: 60000,
    method: "Bank Transfer",
    reference: "BANK001",
    nationalId: "1199000000000004",
    notes: "Annual payment",
    timestamp: "2024-12-01T10:15:00Z"
  }
];
