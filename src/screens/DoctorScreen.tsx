import { ScrollView, StyleSheet, Text, View } from "react-native";

const DoctorScreen = () => {
  const doctor = {
    name: "Dr. Aarav Mehta",
    specialty: "Cardiologist",
    rating: 4.8,
    experience: "10 yrs",
    location: "Mumbai, IN",
  };

  const clients = [
    {
      id: "c1",
      name: "Rahul Sharma",
      lastVisit: "2026-05-10",
      amount: "₹1,200",
    },
    {
      id: "c2",
      name: "Priya Singh",
      lastVisit: "2026-04-21",
      amount: "₹850",
    },
    {
      id: "c3",
      name: "Sunil Kumar",
      lastVisit: "2026-03-15",
      amount: "₹2,400",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Doctors Dashboard</Text>
      <View style={styles.doctorDetail}>
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorMeta}>
          {doctor.specialty} · {doctor.experience} · {doctor.location}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={[styles.card, { backgroundColor: "#BBDEFB" }]}> 
          <Text style={styles.cardTitle}>Advance Amount</Text>
          <Text style={styles.cardValue}>₹150,000</Text>
        </View>
        <View style={[styles.card, { backgroundColor: "#B5FCB9" }]}> 
          <Text style={styles.cardTitle}>Target Achieved</Text>
          <Text style={styles.cardValue}>₹350,000</Text>
        </View>
        <View style={[styles.card, { backgroundColor: "#F2C1C1" }]}> 
          <Text style={styles.cardTitle}>Target Remaining</Text>
          <Text style={styles.cardValue}>₹100,000</Text>
        </View>
        <View style={[styles.card, { backgroundColor: "#FCF1B4" }]}> 
          <Text style={styles.cardTitle}>Overall Earnings</Text>
          <Text style={styles.cardValue}>₹500,000</Text>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Achievement Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryBox}>75% Target Completed</Text>
          <Text style={styles.summaryBox}>80% Collection Rate</Text>
          <Text style={styles.summaryBox}>15+ clients</Text>
        </View>
      </View>

      <View style={styles.productsContainer}>
        <Text style={styles.sectionTitle}>Prescribed Products</Text>
        <View style={styles.productRow}>
          <View style={styles.productBox}>
            <Text style={styles.productTitle}>Currently Prescribing</Text>
            <Text style={styles.productItem}>Medixol, CardioPlus</Text>
          </View>
          <View style={styles.productBox}>
            <Text style={styles.productTitle}>Frequently Written</Text>
            <Text style={styles.productItem}>PainRelief, Glucotab</Text>
          </View>
        </View>
        <View style={styles.productRow}>
          <View style={styles.productBox}>
            <Text style={styles.productTitle}>On Demand</Text>
            <Text style={styles.productItem}>NeuroFlex, RespiraCap</Text>
          </View>
          <View style={styles.productBox}>
            <Text style={styles.productTitle}>Requested Products</Text>
            <Text style={styles.productItem}>OsteoHeal, AllergyFree</Text>
          </View>
        </View>
      </View>

      <View style={styles.clientList}>
        <Text style={styles.sectionTitle}>Associated Clients</Text>
        {clients.map((c) => (
          <View key={c.id} style={styles.clientCard}>
            <View style={styles.clientRow}>
              <Text style={styles.clientName}>{c.name}</Text>
              <Text style={styles.clientAmount}>{c.amount}</Text>
            </View>
            <Text style={styles.clientInfo}>Last visit: {c.lastVisit}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 14,
    color: "#0D47A1",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    borderRadius: 12,
    marginBottom: 10,
    padding: 14,
  },
  cardTitle: {
    fontSize: 14,
    color: "#0D47A1",
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1565C0",
  },
  summaryContainer: {
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0D47A1",
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryBox: {
    backgroundColor: "#90CAF9",
    padding: 10,
    borderRadius: 10,
    color: "#0D47A1",
    fontWeight: "600",
    width: "32%",
    textAlign: "center",
  },
  productsContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0D47A1",
    marginBottom: 10,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productBox: {
    backgroundColor: "#BBDEFB",
    padding: 12,
    borderRadius: 12,
    width: "48%",
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0D47A1",
    marginBottom: 6,
  },
  productItem: {
    fontSize: 13,
    color: "#1565C0",
  },
  doctorDetail: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F0F6FF",
    borderRadius: 14,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0D47A1",
    marginBottom: 6,
  },
  doctorMeta: {
    fontSize: 14,
    color: "#1565C0",
    lineHeight: 20,
  },
  clientList: {
    marginBottom: 24,
  },
  clientCard: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E6EEFC",
  },
  clientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clientName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0D47A1",
  },
  clientAmount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1565C0",
  },
  clientInfo: {
    fontSize: 12,
    color: "#3B6FB5",
    marginTop: 8,
  },
});

export default DoctorScreen;