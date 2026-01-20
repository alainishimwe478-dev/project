const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let paymentHistory = []; // store mock payment records

// Mock AI endpoint
app.post("/ai/ask", (req, res) => {
  const { prompt, household } = req.body;

  // Simple mock response
  const reply = `Hello! To pay Mutuelle for ${household.length} member(s), the total is RWF ${household.length * 5000}. Click 'Pay Now' to simulate payment.`;
  res.json({ reply });
});

// Mock Payment Endpoint
app.post("/payment", (req, res) => {
  const { household } = req.body;
  const amount = household.length * 5000;

  // Save payment history
  const receipt = {
    id: paymentHistory.length + 1,
    household,
    amount,
    date: new Date().toLocaleString(),
  };
  paymentHistory.push(receipt);

  res.json({ success: true, receipt });
});

// Get Payment History
app.get("/history", (req, res) => {
  res.json(paymentHistory);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
