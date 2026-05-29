import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNewRequest } from "../hooks/useNewRequest";

type Request = {
  id: number;
  name: string;
  molecule: string;
  quantity: number;
  company: string;
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
};

// Template Request Screen
// - Proper modal/backdrop handling so inputs remain interactive
// - Uses KeyboardAvoidingView and keyboardShouldPersistTaps
// - Backdrop dismisses keyboard only when tapping outside modal content

export default function RequestScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requests, setRequests] = useState<Request[]>([]);
  const { form, error, setField, submit, reset } = useNewRequest((payload) => {
    const nextId = requests.length
      ? Math.max(...requests.map((request) => request.id)) + 1
      : 1;
    const newRequest: Request = {
      id: nextId,
      name: payload.name,
      molecule: payload.molecule,
      quantity: payload.quantity,
      company: payload.company,
      status: "pending",
      requestedAt: new Date().toLocaleString(),
    };
    console.log("New Request Payload:", newRequest);

    // Optimistically add to local list and also POST to backend
    setRequests((prev) => [newRequest, ...prev]);

    fetch("http://localhost:3000/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRequest),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to submit request");
        return res.json().catch(() => null);
      })
      .catch((err) => {
        console.error("Error submitting request:", err);
      });
  });

  useEffect(() => {
    fetch("http://localhost:3000/requests")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error("Failed to load requests", err));
  }, []);

  const companies = [
    "PharmaCorp",
    "MediLabs",
    "AetherRx",
    "NovoChem",
    "HelixBiotech",
    "Other",
  ];

  const renderLedgerItem = ({ item }: { item: Request }) => {
    const isApproved = item.status === "approved";
    return (
      <View style={styles.ledgerCard}>
        <View style={styles.ledgerHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.ledgerNameText}>{item.name}</Text>
            <Text style={styles.ledgerMoleculeText}>{item.molecule}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              isApproved ? styles.approvedBadge : styles.pendingBadge,
            ]}
          >
            <Text
              style={[
                styles.statusBadgeText,
                isApproved ? styles.approvedBadgeText : styles.pendingBadgeText,
              ]}
            >
              {isApproved ? "APPROVED" : "PENDING"}
            </Text>
          </View>
        </View>
        <View style={styles.cardDivider} />
        <View style={styles.ledgerMetaFooter}>
          <View style={styles.metaColumn}>
            <Text style={styles.metaLabelText}>COMPANY</Text>
            <Text style={styles.metaValueText}>{item.company}</Text>
          </View>
          <View
            style={[styles.metaColumn, { flex: 1.5, alignItems: "flex-end" }]}
          >
            <Text style={styles.metaLabelText}>REQUESTED AT</Text>
            <View style={styles.deliveryTimeWrapper}>
              <Feather
                name="clock"
                size={11}
                color={isApproved ? "#16a34a" : "#64748b"}
                style={{ marginRight: 4 }}
              />
              <Text
                style={[
                  styles.metaValueText,
                  isApproved
                    ? styles.deliveryActiveText
                    : styles.deliveryPendingText,
                ]}
              >
                {item.requestedAt}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Request Medicines</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderLedgerItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No requests yet. Use the button below to add one.
            </Text>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <TouchableOpacity
        style={styles.floatingActionButton}
        activeOpacity={0.8}
        onPress={() => setIsModalOpen(true)}
      >
        <Feather name="plus" size={22} color="#ffffff" />
      </TouchableOpacity>

      <Modal
        visible={isModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalOpen(false)}
      >
        {/* Overlay container: positions backdrop and modal sheet */}
        <View style={styles.modalOverlay}>
          {/* Backdrop touch area: dismiss keyboard only when tapping outside modal */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalBackdrop} />
          </TouchableWithoutFeedback>

          {/* Modal content sheet */}
          <View style={styles.modalSheet}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>New Request</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  activeOpacity={0.7}
                  onPress={() => setIsModalOpen(false)}
                >
                  <Feather name="x" size={20} color="#64748b" />
                </TouchableOpacity>
              </View>
              <ScrollView
                contentContainerStyle={styles.modalScroll}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Product Name *</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter product name"
                    placeholderTextColor="#94a3b8"
                    value={form.name}
                    onChangeText={(value) => setField("name", value)}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Molecule *</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter active molecule"
                    placeholderTextColor="#94a3b8"
                    value={form.molecule}
                    onChangeText={(value) => setField("molecule", value)}
                  />
                </View>

                <View style={styles.fieldRow}>
                  <View style={[styles.formGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Quantity *</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="0"
                      placeholderTextColor="#94a3b8"
                      keyboardType="numeric"
                      value={form.quantity}
                      onChangeText={(value) => setField("quantity", value)}
                    />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Company *</Text>
                  <View style={styles.tagRow}>
                    {companies.map((option) => {
                      const selected = form.company === option;
                      return (
                        <TouchableOpacity
                          key={option}
                          style={[
                            styles.companyTag,
                            selected && styles.companyTagSelected,
                          ]}
                          activeOpacity={0.85}
                          onPress={() => setField("company", option)}
                        >
                          <Text
                            style={[
                              styles.companyTagText,
                              selected && styles.companyTagTextSelected,
                            ]}
                          >
                            {option}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  {!form.company ? (
                    <Text style={styles.placeholderText}>
                      Select a company from the tags above.
                    </Text>
                  ) : null}
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => {
                    const success = submit();
                    if (success) {
                      setIsModalOpen(false);
                      reset();
                    }
                  }}
                >
                  <Text style={styles.submitText}>Submit Request</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setIsModalOpen(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#eef4ff",
  },
  header: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#dbe7ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#12233e",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 8,
    lineHeight: 20,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  listContent: {
    paddingBottom: 140,
  },
  emptyText: {
    color: "#64748b",
    textAlign: "center",
    marginTop: 20,
  },
  floatingActionButton: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 30,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  ledgerCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  ledgerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  ledgerNameText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#031b4e",
  },
  ledgerMoleculeText: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: "center",
  },
  approvedBadge: {
    backgroundColor: "#e8f5e9",
  },
  pendingBadge: {
    backgroundColor: "#fff7ed",
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  approvedBadgeText: {
    color: "#16a34a",
  },
  pendingBadgeText: {
    color: "#ea580c",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#f1f5f9",
    marginVertical: 12,
  },
  ledgerMetaFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaColumn: {
    justifyContent: "center",
  },
  metaLabelText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94a3b8",
    letterSpacing: 0.3,
  },
  metaValueText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    marginTop: 2,
  },
  deliveryTimeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  deliveryActiveText: {
    color: "#16a34a",
    fontWeight: "700",
  },
  deliveryPendingText: {
    color: "#64748b",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  modalBackdrop: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  modalSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80%",
  },
  modalScroll: {
    padding: 20,
    paddingTop: 0,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  modalTitle: { fontSize: 18, fontWeight: "700", color: "#12233e" },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },

  formGroup: { marginBottom: 16 },
  label: { fontSize: 12, fontWeight: "700", color: "#64748b", marginBottom: 8 },
  textInput: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#12233e",
  },
  textArea: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
  },
  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  horizontalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 4,
    marginHorizontal: -4,
  },
  companyTag: {
    backgroundColor: "#f8fafc",
    borderColor: "#dbe7ff",
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    margin: 4,
    minWidth: 100,
    alignItems: "center",
  },
  companyTagSelected: {
    backgroundColor: "#2563eb",
    borderColor: "#1d4ed8",
  },
  companyTagText: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "700",
  },
  companyTagTextSelected: {
    color: "#ffffff",
  },
  placeholderText: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 8,
  },
  halfWidth: {
    flex: 1,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 12,
    marginBottom: 12,
    textAlign: "center",
  },

  submitButton: {
    backgroundColor: "#16a34a",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  submitText: { color: "#fff", fontWeight: "700" },
  cancelButton: { padding: 12, alignItems: "center", marginTop: 8 },
  cancelText: { color: "#64748b", fontWeight: "700" },
});
