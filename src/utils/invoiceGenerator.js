import jsPDF from "jspdf";

export function generateInvoice(user, amount, service, date) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("RSSB HealthPay Invoice", 20, 20);
  doc.setFontSize(12);
  doc.text(`User: ${user}`, 20, 40);
  doc.text(`Service: ${service}`, 20, 50);
  doc.text(`Amount Paid: RWF ${amount.toLocaleString()}`, 20, 60);
  doc.text(`Date: ${date}`, 20, 70);
  doc.save(`Invoice-${user}-${Date.now()}.pdf`);
}