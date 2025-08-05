import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useProducts } from "../context/ProductContext";

const { width } = Dimensions.get("window");

const CartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params || {};
  const { placeOrder } = useProducts();

  const [quantity, setQuantity] = useState(product?.quantity || 1);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handlePlaceOrder = () => {
    if (product) {
      const productWithQuantity = {
        ...product,
        quantity,
        totalPrice: (product.price * quantity).toFixed(2),
      };
      placeOrder(productWithQuantity);

      navigation.navigate("Login", {
        cartItems: [productWithQuantity], //  Pass as array
      });
    }
  };

  if (!product) {
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
        <Text style={styles.headerTitle}>Your Cart</Text>
      </LinearGradient>

      <View style={styles.card}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.detail}>Size: {product.size}</Text>

          <View style={styles.colorRow}>
            <Text style={styles.detail}>Color:</Text>
            <View
              style={[
                styles.colorCircle,
                { backgroundColor: product.color || "#ccc" },
              ]}
            />
          </View>

          <View style={styles.quantityRow}>
            <Text style={styles.detail}>Quantity:</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                onPress={decrementQuantity}
                style={styles.quantityButton}
              >
                <Ionicons
                  name="remove-circle-outline"
                  size={28}
                  color="#8e44ad"
                />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={incrementQuantity}
                style={styles.quantityButton}
              >
                <Ionicons name="add-circle-outline" size={28} color="#8e44ad" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.price}>
            Rs {(product.price * quantity).toFixed(2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
        <Ionicons name="checkmark-circle" size={20} color="#fff" />
        <Text style={styles.orderText}>Proceed to Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f6ff" },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#c6a1cf",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  headerIcon: { position: "absolute", left: 16, top: 50 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#fff" },
  emptyText: {
    marginTop: 40,
    fontSize: 16,
    textAlign: "center",
    color: "#777",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 16,
    elevation: 3,
    padding: 12,
  },
  image: {
    width: width * 0.3,
    height: width * 0.4,
    borderRadius: 10,
  },
  info: { flex: 1, marginLeft: 12, justifyContent: "space-between" },
  name: { fontSize: 16, fontWeight: "700", color: "#333" },
  detail: { fontSize: 14, color: "#555", marginTop: 4 },
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  colorCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#999",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  quantityButton: {
    paddingHorizontal: 6,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 12,
    fontWeight: "600",
    color: "#333",
    minWidth: 25,
    textAlign: "center",
  },
  price: { fontSize: 16, fontWeight: "700", color: "#008080", marginTop: 6 },
  orderButton: {
    backgroundColor: "#8e44ad",
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  orderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
