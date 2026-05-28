import { StyleSheet } from "react-native";

export const colors = {
  background: "white",
  header: "#242444",
  surface: "#2a2a4a",
  primary: "#4fc3f7",
  text: "#ffffff",
  textSecondary: "#a0a0b0",
  alert: "#ff5252",
  primary_light: "#0D47A1",
  primary_accent: "#1565C0",
  light_blue: "#BBDEFB",
  light_green: "#B5FCB9",
  light_red: "#F2C1C1",
  light_yellow: "#FCF1B4",
  summary_blue: "#90CAF9",
  doctor_bg: "#F0F6FF",
  light_border: "#E6EEFC",
  secondary_blue: "#3B6FB5",
};

export const globalStyles = StyleSheet.create({
  // Common container
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 24,
  },

  // Titles and text
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary_light,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 14,
    color: colors.primary_light,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary_light,
    marginBottom: 10,
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  // Doctor Screen Styles
  doctorDetail: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.doctor_bg,
    borderRadius: 14,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary_light,
    marginBottom: 6,
  },
  doctorMeta: {
    fontSize: 14,
    color: colors.primary_accent,
    lineHeight: 20,
  },

  // Card Styles
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
    color: colors.primary_light,
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary_accent,
  },

  // Summary Styles
  summaryContainer: {
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary_light,
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryBox: {
    backgroundColor: colors.summary_blue,
    padding: 10,
    borderRadius: 10,
    color: colors.primary_light,
    fontWeight: "600",
    width: "32%",
    textAlign: "center",
  },

  // Product Styles
  productsContainer: {
    marginBottom: 16,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productBox: {
    backgroundColor: colors.light_blue,
    padding: 12,
    borderRadius: 12,
    width: "48%",
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary_light,
    marginBottom: 6,
  },
  productItem: {
    fontSize: 13,
    color: colors.primary_accent,
  },

  // Client Styles
  clientList: {
    marginBottom: 24,
  },
  clientCard: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.light_border,
  },
  clientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clientName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary_light,
  },
  clientAmount: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary_accent,
  },
  clientInfo: {
    fontSize: 12,
    color: colors.secondary_blue,
    marginTop: 8,
  },
});
