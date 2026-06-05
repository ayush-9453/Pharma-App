import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  searchHeaderContainer: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#e2e8f0",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 14,
  },
  searchBoxContainer: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    color: "#0f172a",
    fontSize: 15,
    fontWeight: "500",
  },
  sectionContainer: {
    marginTop: 20,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
  },
  seeAllLink: {
    fontSize: 12,
    color: "#2563eb",
    fontWeight: "600",
  },
  promoCarousel: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  promoBannerCard: {
    backgroundColor: "#eff6ff",
    borderColor: "#bfdbfe",
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    marginRight: 14,
    width: 200,
  },
  promoIconCircle: {
    backgroundColor: "#ffffff",
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    boxShadow: "0px 1px 3px rgba(15, 23, 42, 0.08)",
  },
  promoItemName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e3a8a",
  },
  promoItemMolecule: {
    fontSize: 12,
    color: "#3b82f6",
    marginTop: 2,
    fontWeight: "500",
  },
  companyPillText: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 12,
  },
  companyPillLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#1e3a8a",
  },
  companyStickyBar: {
    marginTop: 24,
    backgroundColor: "#f8fafc",
  },
  filterChipWrapper: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  chipButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  activeChip: {
    backgroundColor: "#0f172a",
    borderColor: "#0f172a",
  },
  inactiveChip: {
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
  },
  activeChipText: {
    color: "#ffffff",
  },
  inactiveChipText: {
    color: "#64748b",
  },
  listSection: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  catalogCountCount: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  moleculeText: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },
  promoBadge: {
    flexDirection: "row",
    backgroundColor: "#dc2626",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: "center",
  },
  promoBadgeText: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#f1f5f9",
    verticalAlign: "middle",
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaGroup: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 11,
    color: "#94a3b8",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  metaValue: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "600",
    marginTop: 2,
  },
  goodStock: {
    color: "#16a34a",
  },
  lowStock: {
    color: "#dc2626",
    fontWeight: "700",
  },
  emptyStateContainer: {
    alignItems: "center",
    paddingTop: 40,
  },
  emptyStateText: {
    marginTop: 12,
    color: "#64748b",
    fontSize: 14,
  },
  loadingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: "center",
  },
  loadingText: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "600",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default styles;
