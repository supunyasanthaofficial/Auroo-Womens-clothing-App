import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { cartItems = [], userEmail } = route.params || {};

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (value.trim()) {
      setErrors({ ...errors, [field]: false });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      if (!form[field].trim()) {
        newErrors[field] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    // if (!validateForm()) {
    //   Alert.alert("Missing Information", "Please fill all fields.");
    //   return;
    // }

    const checkoutDetails = {
      fullName: `${form.firstName} ${form.lastName}`,
      phone: form.phone,
      address: `${form.street}, ${form.city}, ${form.state}, ${form.country}`,
    };

    navigation.navigate("Payment", {
      cartItems,
      userEmail,
      checkoutDetails,
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerIcon}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {cartItems.map((item, index) => (
            <View key={index} style={styles.productContainer}>
              <Text style={styles.productTitle}>{item.name}</Text>
              <View style={styles.productDetailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Price:</Text>
                  <Text style={styles.detailValue}>
                    Rs {item.price?.toFixed(2) || "N/A"}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Size:</Text>
                  <Text style={styles.detailValue}>{item.size || "N/A"}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Color:</Text>
                  <View
                    style={[
                      styles.colorCircle,
                      { backgroundColor: item.color || "#ccc" },
                    ]}
                  />
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Quantity:</Text>
                  <Text style={styles.detailValue}>{item.quantity}</Text>
                </View>
              </View>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Delivery Information</Text>

          <View style={styles.row}>
            <TextInput
              style={[styles.input, errors.firstName && styles.inputError]}
              placeholder="First Name"
              value={form.firstName}
              onChangeText={(val) => handleInputChange("firstName", val)}
            />
            <TextInput
              style={[styles.input, errors.lastName && styles.inputError]}
              placeholder="Last Name"
              value={form.lastName}
              onChangeText={(val) => handleInputChange("lastName", val)}
            />
          </View>

          <TextInput
            style={[styles.input, errors.country && styles.inputError]}
            placeholder="Country"
            value={form.country}
            onChangeText={(val) => handleInputChange("country", val)}
          />
          <TextInput
            style={[styles.input, errors.street && styles.inputError]}
            placeholder="Street Address"
            value={form.street}
            onChangeText={(val) => handleInputChange("street", val)}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, errors.city && styles.inputError]}
              placeholder="City"
              value={form.city}
              onChangeText={(val) => handleInputChange("city", val)}
            />
            <TextInput
              style={[styles.input, errors.state && styles.inputError]}
              placeholder="State / Province"
              value={form.state}
              onChangeText={(val) => handleInputChange("state", val)}
            />
          </View>
          <TextInput
            style={[styles.input, errors.zip && styles.inputError]}
            placeholder="Zip / Postal Code"
            keyboardType="numeric"
            value={form.zip}
            onChangeText={(val) => handleInputChange("zip", val)}
          />
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(val) => handleInputChange("phone", val)}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Continue to Payment</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  headerIcon: {
    position: "absolute",
    left: 16,
    top: 50,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  productContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
    textAlign: "center",
  },
  productDetailsContainer: {
    paddingHorizontal: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4b5563",
    width: 100,
  },
  detailValue: {
    fontSize: 16,
    color: "#1f2937",
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: "#1f2937",
  },
  input: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderColor: "#d1d5db",
    borderWidth: 1,
    fontSize: 16,
    marginRight: 8,
  },
  inputError: {
    borderColor: "#ef4444",
    borderWidth: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: "#8e44ad",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#999",
  },
});
