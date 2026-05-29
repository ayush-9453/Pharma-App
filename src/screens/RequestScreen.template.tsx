import { useState } from "react";
import {
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

// Template Request Screen
// - Proper modal/backdrop handling so inputs remain interactive
// - Uses KeyboardAvoidingView and keyboardShouldPersistTaps
// - Backdrop dismisses keyboard only when tapping outside modal content

export default function RequestScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState("");

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Request Screen (Template)</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.openButton}
          onPress={() => setIsModalOpen(true)}
        >
          <Text style={styles.openButtonText}>Open Request Modal</Text>
        </TouchableOpacity>
      </View>

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
              <ScrollView
                contentContainerStyle={styles.modalScroll}
                keyboardShouldPersistTaps="handled"
              >
                <Text style={styles.modalTitle}>New Request</Text>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Notes</Text>
                  <TextInput
                    style={styles.textArea}
                    multiline
                    numberOfLines={4}
                    placeholder="Enter details..."
                    value={notes}
                    onChangeText={setNotes}
                  />
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => {
                    // submit logic here
                    setIsModalOpen(false);
                  }}
                >
                  <Text style={styles.submitText}>Submit</Text>
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
  safeContainer: { flex: 1, backgroundColor: "#f8fafc" },
  header: { padding: 16, borderBottomWidth: 1, borderColor: "#e6eefc" },
  title: { fontSize: 20, fontWeight: "700", color: "#031b4e" },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  openButton: { backgroundColor: "#005edb", padding: 12, borderRadius: 10 },
  openButtonText: { color: "#fff", fontWeight: "700" },

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
  modalScroll: { padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },

  formGroup: { marginBottom: 16 },
  label: { fontSize: 12, fontWeight: "700", color: "#64748b", marginBottom: 8 },
  textArea: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
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
