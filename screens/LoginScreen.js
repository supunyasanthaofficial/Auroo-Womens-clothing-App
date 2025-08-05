import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Get cartItems passed from previous screen, or empty array
  const { cartItems = [] } = route.params || {};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Optional validation function
  const validateForm = () => {
    const newErrors = {};
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = true;
    }
    if (!password.trim() || password.length < 6) {
      newErrors.password = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    // Uncomment to enable validation
    // if (!validateForm()) {
    //   Alert.alert("Invalid Input", "Please enter a valid email and password (min 6 chars).");
    //   return;
    // }

    Alert.alert("Login Successful", "Redirecting to checkout...", [
      {
        text: "OK",
        onPress: () =>
          navigation.navigate("CheckOut", {
            cartItems, // pass all cart items
            userEmail: email,
          }),
      },
    ]);
  };

  const handleGoogleLogin = () => {
    Alert.alert("Google Login", "Mock Google login success!", [
      {
        text: "OK",
        onPress: () =>
          navigation.navigate("CheckOut", {
            cartItems,
            userEmail: email || "guest@gmail.com",
          }),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("../assets/Auro o fashion PNG 2.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Login to continue shopping</Text>

        <View style={styles.form}>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
          >
            <Ionicons
              name="logo-google"
              size={22}
              color="#8032adff"
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 32,
  },
  form: {
    width: "100%",
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  primaryButton: {
    backgroundColor: "#8e44ad",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 14,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  orText: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 14,
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#d1d5db",
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  googleButtonText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  googleIcon: {
    marginRight: 10,
  },
});
