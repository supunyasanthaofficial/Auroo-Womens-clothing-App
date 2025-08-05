import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const DELIVERY_FEE = 500;

const CODPaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cartItems = [], checkoutDetails } = route.params;

  const grandTotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const totalWithDelivery = grandTotal + DELIVERY_FEE;

  const handleConfirmOrder = () => {
    if (
      !checkoutDetails?.fullName ||
      !checkoutDetails?.phone ||
      !checkoutDetails?.address
    ) {
      Alert.alert("Missing Info", "Checkout details are incomplete.", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("CheckOut", {
              cartItems,
              userEmail: checkoutDetails?.email,
            }),
        },
      ]);
      return;
    }
    Alert.alert("Order Confirmed", "COD Payment Successful", [
      {
        text: "OK",
        onPress: () => navigation.navigate("MyOrders"),
      },
    ]);
  };

  const handleEditCheckoutDetails = () => {
    navigation.navigate("CheckOut", {
      cartItems,
      userEmail: checkoutDetails?.email,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIcon}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cash on Delivery</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {cartItems.map((product, index) => {
          const subtotal = product.price * (product.quantity || 1);
          return (
            <View key={index} style={styles.card}>
              <Text style={styles.sectionTitle}>Item {index + 1}</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{product.name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Size:</Text>
                <Text style={styles.value}>{product.size}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Color:</Text>
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: product.color || "#ccc" },
                  ]}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Qty:</Text>
                <Text style={styles.value}>{product.quantity}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Subtotal:</Text>
                <Text style={styles.value}>Rs {subtotal.toFixed(2)}</Text>
              </View>
            </View>
          );
        })}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>Rs {grandTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Delivery Fee</Text>
            <Text style={styles.value}>Rs {DELIVERY_FEE.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.total}>Rs {totalWithDelivery.toFixed(2)}</Text>
          </View>
        </View>

        {checkoutDetails && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Shipping Details</Text>
            <Text style={styles.codDetail}>
              <Text style={{ fontWeight: "600" }}>Name:</Text>{" "}
              {checkoutDetails.fullName}
            </Text>
            <Text style={styles.codDetail}>
              <Text style={{ fontWeight: "600" }}>Phone:</Text>{" "}
              {checkoutDetails.phone}
            </Text>
            <Text style={styles.codDetail}>
              <Text style={{ fontWeight: "600" }}>Address:</Text>{" "}
              {checkoutDetails.address}
            </Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditCheckoutDetails}
              activeOpacity={0.7}
            >
              <Text style={styles.editButtonText}>Edit Delivery Details</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmOrder}
          activeOpacity={0.7}
        >
          <Text style={styles.confirmButtonText}>Confirm Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CODPaymentScreen;

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
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  content: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
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
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  label: { fontSize: 16, color: "#4b5563" },
  value: { fontSize: 16, fontWeight: "500", color: "#1f2937" },
  total: { fontSize: 20, fontWeight: "700", color: "#8b5cf6" },
  codDetail: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 6,
  },
  editButton: {
    backgroundColor: "#6b7280",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  editButtonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: "#8e44ad",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    marginTop: 10,
  },
  confirmButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
