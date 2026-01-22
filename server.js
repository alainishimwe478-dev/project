
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

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
app.get("/history", async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" }
    });
    res.json(payments);
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({ error: "Failed to fetch payment history" });
  }
});

// Admin routes
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
