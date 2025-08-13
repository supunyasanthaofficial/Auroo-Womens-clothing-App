import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const DELIVERY_FEE = 500;

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const cartItems = route.params?.cartItems || [];
  const checkoutDetails = route.params?.checkoutDetails || {};
  const [selectedMethod, setSelectedMethod] = useState("card");

  console.log("Received cartItems:", cartItems);
  console.log("Received checkoutDetails:", checkoutDetails);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );
  const total = subtotal + DELIVERY_FEE;

  const handlePayment = () => {
    const targetScreen =
      selectedMethod === "card" ? "CardPayment" : "CODPayment";

    if (!checkoutDetails || Object.keys(checkoutDetails).length === 0) {
      console.warn(
        "Warning: checkoutDetails is empty or missing. Proceeding with navigation."
      );
    }

    console.log("Navigating to:", targetScreen, {
      cartItems,
      checkoutDetails,
      total,
    });

    try {
      navigation.navigate(targetScreen, {
        cartItems: cartItems || [],
        checkoutDetails: checkoutDetails || {},
        total: total || 0,
      });
    } catch (error) {
      alert(
        `Error: Unable to navigate to ${targetScreen}. Please ensure the screen is registered in the navigation stack.`
      );
      console.error("Navigation Error:", error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIcon}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartItems.map((product, index) => (
            <View
              key={`${product.id || `item-${index}`}-${
                product.size || "no-size"
              }-${product.color || "no-color"}-${index}`}
              style={styles.summaryItem}
            >
              <Text style={styles.summaryName}>
                {product.name || "Unknown Product"}
              </Text>
              <View style={styles.summaryDetailContainer}>
                <View style={styles.summaryDetailRow}>
                  <Text style={styles.summaryDetailLabel}>Price:</Text>
                  <Text style={styles.summaryDetailValue}>
                    Rs{" "}
                    {((product.price || 0) * (product.quantity || 1)).toFixed(
                      2
                    )}
                  </Text>
                </View>
                <View style={styles.summaryDetailRow}>
                  <Text style={styles.summaryDetailLabel}>Size:</Text>
                  <Text style={styles.summaryDetailValue}>
                    {product.size || "N/A"}
                  </Text>
                </View>
                <View style={styles.summaryDetailRow}>
                  <Text style={styles.summaryDetailLabel}>Color:</Text>
                  <View
                    style={[
                      styles.summaryColorCircle,
                      { backgroundColor: product.color || "#ccc" },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>Rs {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Delivery Fee</Text>
            <Text style={styles.value}>Rs {DELIVERY_FEE.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.total}>Rs {total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity
            style={[
              styles.methodOption,
              selectedMethod === "card" && styles.selectedOption,
            ]}
            onPress={() => setSelectedMethod("card")}
          >
            <Ionicons name="card-outline" size={24} color="#1f2937" />
            <Text style={styles.optionText}>Credit / Debit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.methodOption,
              selectedMethod === "cod" && styles.selectedOption,
            ]}
            onPress={() => setSelectedMethod("cod")}
          >
            <Ionicons name="cash-outline" size={24} color="#1f2937" />
            <Text style={styles.optionText}>Cash on Delivery</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  headerIcon: { position: "absolute", left: 16, top: 50 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#fff" },
  scrollContainer: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    minHeight: "100%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    width: "100%",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 16,
  },
  summaryItem: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 8,
  },
  summaryName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 6,
  },
  summaryDetailContainer: { width: "100%", paddingHorizontal: 8 },
  summaryDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  summaryDetailLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#4b5563",
    width: 60,
  },
  summaryDetailValue: {
    fontSize: 13,
    color: "#1f2937",
  },
  summaryColorCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#999",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: { fontSize: 16, color: "#4b5563" },
  value: { fontSize: 16, fontWeight: "500", color: "#1f2937" },
  total: { fontSize: 20, fontWeight: "700", color: "#8b5cf6" },
  methodOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginBottom: 15,
  },
  selectedOption: {
    borderColor: "#8b5cf6",
    backgroundColor: "#f6edfa",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 14,
    color: "#1f2937",
  },
  payButton: {
    backgroundColor: "#8e44ad",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
    width: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  payButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    marginTop: 40,
  },
});
