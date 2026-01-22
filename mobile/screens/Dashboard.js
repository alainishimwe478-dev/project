import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>RSSB HealthPay</Text>
        <View style={styles.headerRight}>
          <Ionicons name="notifications-outline" size={22} />
          <Image
            source={{ uri: "https://i.pravatar.cc/40" }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* Welcome */}
      <Text style={styles.welcome}>Welcome, Jean Claude</Text>
      <Text style={styles.subText}>Your RSSB Health Insurance</Text>

      {/* Balance Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Coverage Balance</Text>
        <Text style={styles.amount}>RWF 150,000</Text>
        <Text style={styles.valid}>Active • Valid Until: 30/12/2024</Text>
      </View>

      {/* Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.payBtn}>
          <Ionicons name="medical" size={18} color="white" />
          <Text style={styles.btnText}>Pay Medical Bill</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoBtn}>
          <Ionicons name="shield-checkmark" size={18} color="white" />
          <Text style={styles.btnText}>My Insurance Info</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Payments */}
      <Text style={styles.section}>Recent Payments</Text>

      <PaymentItem title="King Faisal Hospital" date="12 Jan 2024" amount="RWF 35,000" />
      <PaymentItem title="Pharmacy Purchase" date="08 Jan 2024" amount="RWF 5,000" />
      <PaymentItem title="Clinic Consultation" date="02 Jan 2024" amount="RWF 12,000" />

    </ScrollView>
  );
}

function PaymentItem({ title, date, amount }) {
  return (
    <View style={styles.payment}>
      <View>
        <Text style={styles.paymentTitle}>{title}</Text>
        <Text style={styles.paymentDate}>{date}</Text>
      </View>
      <Text style={styles.paymentAmount}>Paid: {amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F3F4F6", padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  logo: { fontSize: 18, fontWeight: "bold", color: "#2563EB" },
  headerRight: { flexDirection: "row", gap: 12 },
  avatar: { width: 32, height: 32, borderRadius: 16 },

  welcome: { fontSize: 16, fontWeight: "600", marginTop: 12 },
  subText: { color: "#6B7280", fontSize: 12 },

  card: {
    backgroundColor: "#2563EB",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  cardTitle: { color: "white", fontSize: 12 },
  amount: { color: "white", fontSize: 28, fontWeight: "bold" },
  valid: { color: "#E5E7EB", fontSize: 11, marginTop: 6 },

  actions: { flexDirection: "row", gap: 10, marginTop: 16 },
  payBtn: {
    backgroundColor: "#22C55E",
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  infoBtn: {
    backgroundColor: "#3B82F6",
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  btnText: { color: "white", fontSize: 12, fontWeight: "600" },

  section: { marginTop: 20, fontWeight: "600" },

  payment: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentTitle: { fontWeight: "600" },
  paymentDate: { fontSize: 11, color: "#6B7280" },
  paymentAmount: { fontWeight: "600", fontSize: 12 },
});

export { Dashboard };
