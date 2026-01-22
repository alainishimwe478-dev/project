// HealthPay AI Prediction System
// Advanced AI for predicting payment defaults in RSSB HealthPay

/**
 * Predicts payment risk for a citizen based on multiple factors
 * @param {Object} citizen - Citizen data object
 * @param {number} citizen.missedPayments - Number of missed payments
 * @param {number} citizen.averageDelay - Average delay in days for payments
 * @param {string} citizen.income - Income category ('LOW', 'MEDIUM', 'HIGH')
 * @param {boolean} citizen.reminderIgnored - Whether reminders have been ignored
 * @returns {string} Risk level: 'HIGH_RISK', 'MEDIUM_RISK', or 'LOW_RISK'
 */
export function predictPaymentRisk(citizen) {
  let score = 0;

  // Factor 1: Missed payments (0-40 points)
  if (citizen.missedPayments > 2) score += 40;
  else if (citizen.missedPayments > 1) score += 25;
  else if (citizen.missedPayments > 0) score += 15;

  // Factor 2: Average delay behavior (0-25 points)
  if (citizen.averageDelay > 7) score += 25;
  else if (citizen.averageDelay > 3) score += 15;
  else if (citizen.averageDelay > 0) score += 10;

  // Factor 3: Income category (0-15 points)
  if (citizen.income === "LOW") score += 15;
  else if (citizen.income === "MEDIUM") score += 5;

  // Factor 4: Reminder ignored (0-20 points)
  if (citizen.reminderIgnored) score += 20;

  // Determine risk level based on total score
  if (score >= 60) return "HIGH_RISK";
  if (score >= 30) return "MEDIUM_RISK";
  return "LOW_RISK";
}

/**
 * Gets AI-recommended actions based on risk level
 * @param {string} riskLevel - The predicted risk level
 * @param {Object} citizen - Citizen data for personalized actions
 * @returns {Array} Array of recommended actions
 */
export function getAIRecommendedActions(riskLevel, citizen) {
  const actions = [];

  switch (riskLevel) {
    case 'HIGH_RISK':
      actions.push({
        type: 'AUTO_SMS',
        message: `RSSB HealthPay: ${citizen.name}, your insurance payment is overdue. Please pay immediately to avoid service interruption.`,
        priority: 'HIGH'
      });
      actions.push({
        type: 'OFFICER_ALERT',
        message: `High-risk citizen ${citizen.name} (${citizen.nationalId}) requires immediate follow-up.`,
        priority: 'HIGH'
      });
      break;

    case 'MEDIUM_RISK':
      actions.push({
        type: 'REMINDER_SMS',
        message: `RSSB HealthPay: ${citizen.name}, your insurance payment is due soon. Please pay before expiry date.`,
        priority: 'MEDIUM'
      });
      break;

    case 'LOW_RISK':
      actions.push({
        type: 'MONITOR',
        message: `Low-risk citizen ${citizen.name} is on track for timely payments.`,
        priority: 'LOW'
      });
      break;

    default:
      break;
  }

  return actions;
}

/**
 * Calculates payment prediction statistics for a group of citizens
 * @param {Array} citizens - Array of citizen objects
 * @returns {Object} Statistics object
 */
export function calculatePredictionStats(citizens) {
  const stats = {
    totalCitizens: citizens.length,
    highRiskCount: 0,
    mediumRiskCount: 0,
    lowRiskCount: 0,
    totalRevenueAtRisk: 0,
    predictedDefaulters: 0
  };

  citizens.forEach(citizen => {
    const risk = predictPaymentRisk(citizen);
    switch (risk) {
      case 'HIGH_RISK':
        stats.highRiskCount++;
        stats.predictedDefaulters++;
        stats.totalRevenueAtRisk += citizen.amountDue || 0;
        break;
      case 'MEDIUM_RISK':
        stats.mediumRiskCount++;
        break;
      case 'LOW_RISK':
        stats.lowRiskCount++;
        break;
    }
  });

  return stats;
}

// Default case for switch statement (satisfies ESLint)
export const DEFAULT_RISK_LEVEL = 'LOW_RISK';
