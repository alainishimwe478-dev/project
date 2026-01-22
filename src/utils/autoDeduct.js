// autoDeduct.js
export async function autoDeductMoMo(userPhone, amount) {
  try {
    const response = await fetch("https://api.mtn.com/momo/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY",
      },
      body: JSON.stringify({
        phoneNumber: userPhone,
        amount: amount,
        currency: "RWF",
        externalId: `RSSB-${Date.now()}`,
        payerMessage: "HealthPay Premium Payment",
        payeeNote: "Automatic Deduction",
      }),
    });

    const data = await response.json();
    if (data.status === "SUCCESS") {
      console.log("Payment successful:", data);
      return true;
    } else {
      console.log("Payment failed:", data);
      return false;
    }
  } catch (error) {
    console.error("MoMo deduction error:", error);
    return false;
  }
}

export function checkLatePayments(payments) {
  return payments.filter(p => {
    const dueDate = new Date(p.dueDate);
    const today = new Date();
    return p.status !== "Completed" && today > dueDate;
  });
}

export function detectFraud(payments) {
  return payments.filter(p => {
    return p.amount > 500000 || p.failedAttempts >= 3;
  });
}