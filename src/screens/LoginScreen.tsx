import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// Core icon directories for crisp medical/security UI
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    if (email === "abc@gmail.com" && password === "password123") {
      // Simulate successful login
      router.push("/doctor");
      alert("Login successful!");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.innerContainer}>
          {/* 1. APP HEADER & LOGO */}
          <View style={styles.logoSection}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="clinic-medical" size={34} color="#0066cc" />
            </View>
            <Text style={styles.brandText}>PharmaCRM</Text>
          </View>

          {/* 2. CENTRAL CREDENTIALS CARD */}
          <View style={styles.cardContainer}>
            <Text style={styles.welcomeHeading}>Welcome back, Doctor</Text>
            {/* <Text style={styles.subHeading}>Sign in to access your inventory dashboard.</Text> */}

            {/* Email Input Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
              <View style={styles.inputWrapper}>
                <Feather
                  name="mail"
                  size={18}
                  color="#94a3b8"
                  style={styles.fieldIcon}
                />
                <TextInput
                  style={styles.textInputField}
                  placeholder="doctor@gmail.com"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password Input Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              <View style={styles.inputWrapper}>
                <Feather
                  name="lock"
                  size={18}
                  color="#94a3b8"
                  style={styles.fieldIcon}
                />
                <TextInput
                  style={styles.textInputField}
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIconContainer}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Feather
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={18}
                    color="#94a3b8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Checkbox and Forgot Password Link Wrapper */}
            <View style={styles.utilitiesRow}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                activeOpacity={0.7}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <MaterialIcons
                  name={rememberMe ? "check-box" : "check-box-outline-blank"}
                  size={22}
                  color={rememberMe ? "#0066cc" : "#94a3b8"}
                />
                <Text style={styles.checkboxLabel}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Main Blueprint Action Button */}
            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={0.9}
              onPress={handleLogin}
            >
              <Text style={styles.submitButtonText}>Sign in</Text>
              <Feather
                name="arrow-right"
                size={18}
                color="#ffffff"
                style={styles.btnArrow}
              />
            </TouchableOpacity>
          </View>

          {/* 3. ENCRYPTED SECURITY DATA COMPLIANCE NOTICE FOOTER */}
          <View style={styles.securityFooter}>
            <MaterialIcons name="security" size={14} color="#0066cc" />
            <Text style={styles.securityText}>
              Secure 256-bit encrypted connection
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- High-Fidelity UI Design System Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f8fd", // Matching the pale medical blue gradient base layer from image_bbfa8d.png
  },
  keyboardView: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    paddingVertical: 30,
  },
  logoSection: {
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 40 : 20,
  },
  iconContainer: {
    backgroundColor: "#e6f0fa",
    width: 68,
    height: 68,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  brandText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#031b4e", // Deep corporate navy text styling
    letterSpacing: -0.5,
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    width: "100%",
    shadowColor: "#031b4e",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3, // Safe shadow implementation on Android devices
  },
  welcomeHeading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#031b4e",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 28,
  },
  subHeading: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0044cc",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 54,
  },
  fieldIcon: {
    marginRight: 12,
  },
  textInputField: {
    flex: 1,
    color: "#031b4e",
    fontSize: 15,
    fontWeight: "500",
    borderWidth: 0,
    borderColor: "transparent",
    outlineWidth: 0,
    outlineColor: "transparent",
    backgroundColor: "transparent",
  },
  eyeIconContainer: {
    padding: 6,
  },
  utilitiesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 28,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
    marginLeft: 6,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#0066cc",
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#005edb", // Exactly matching the vivid blue accent from the design button
    height: 54,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#005edb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  btnArrow: {
    marginLeft: 6,
  },
  registerPromptRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  promptNormalText: {
    fontSize: 14,
    color: "#64748b",
  },
  promptActionText: {
    fontSize: 14,
    color: "#0066cc",
    fontWeight: "600",
  },
  securityFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 20,
  },
  securityText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
});
