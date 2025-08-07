import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useProducts } from "../context/ProductContext"; // make sure this path is correct

const CartScreen = () => {
  const { cartItems, placeOrder } = useProducts();
  const navigation = useNavigation();

  const handlePlaceOrder = () => {
    const orderWithTotals = cartItems.map((item) => ({
      ...item,
      totalPrice: (item.price * item.quantity).toFixed(2),
    }));

    placeOrder(orderWithTotals);
    navigation.navigate("Login", {
      cartItems: orderWithTotals,
    });
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id + item.size + item.color}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detail}>Size: {item.size}</Text>

              <View style={styles.colorRow}>
                <Text style={styles.detail}>Color:</Text>
                <View
                  style={[
                    styles.colorCircle,
                    { backgroundColor: item.color || "#ccc" },
                  ]}
                />
              </View>

              <View style={styles.quantityRow}>
                <Text style={styles.detail}>Quantity:</Text>
                <Text style={styles.quantityText}>{item.quantity}</Text>
              </View>

              <Text style={styles.price}>
                Rs {(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.buyButton} onPress={handlePlaceOrder}>
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detail: {
    fontSize: 14,
    marginTop: 5,
  },
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  colorCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityText: {
    fontSize: 14,
    marginLeft: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  buyButton: {
    backgroundColor: "#8e44ad",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
