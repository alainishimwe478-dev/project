const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Admin Overview Stats
router.get("/stats", async (req, res) => {
  try {
    const stats = {
      totalUsers: await prisma.user.count(),
      totalHospitals: await prisma.user.count({
        where: { role: "HOSPITAL" }
      }),
      totalClaims: await prisma.claim.count(),
      totalPayments: await prisma.payment.count(),
      totalPaidAmount: await prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: "SUCCESS" }
      })
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// High-risk claims
router.get("/fraud-claims", async (req, res) => {
  try {
    const claims = await prisma.claim.findMany({
      where: { aiRisk: "HIGH" },
      include: {
        user: {
          select: { name: true, nationalId: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    res.json(claims);
  } catch (error) {
    console.error("Error fetching fraud claims:", error);
    res.status(500).json({ error: "Failed to fetch fraud claims" });
  }
});

// Recent claims
router.get("/recent-claims", async (req, res) => {
  try {
    const claims = await prisma.claim.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { user: true }
    });
    res.json(claims);
  } catch (error) {
    console.error("Error fetching recent claims:", error);
    res.status(500).json({ error: "Failed to fetch recent claims" });
  }
});

// Recent payments
router.get("/recent-payments", async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { user: true }
    });
    res.json(payments);
  } catch (error) {
    console.error("Error fetching recent payments:", error);
    res.status(500).json({ error: "Failed to fetch recent payments" });
  }
});

module.exports = router;
