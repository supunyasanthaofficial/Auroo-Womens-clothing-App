import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useProducts } from "../context/ProductContext";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const { width } = Dimensions.get("window");

const CartScreen = () => {
  const { cartItems, placeOrder, updateCartQuantity, removeFromCart } =
    useProducts();
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.id + item.size + item.color] = true; // Initially select all items
      return acc;
    }, {})
  );

  const handlePlaceOrder = () => {
    const selectedOrderItems = cartItems
      .filter((item) => selectedItems[item.id + item.size + item.color])
      .map((item) => ({
        ...item,
        totalPrice: (item.price * item.quantity).toFixed(2),
      }));

    if (selectedOrderItems.length === 0) {
      alert("Please select at least one item to place an order.");
      return;
    }

    placeOrder(selectedOrderItems);
    navigation.navigate("Login", {
      cartItems: selectedOrderItems,
    });
  };

  const handleSelectItem = (itemKey) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  const handleIncreaseQuantity = (item) => {
    updateCartQuantity(item.id, item.size, item.color, item.quantity + 1);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateCartQuantity(item.id, item.size, item.color, item.quantity - 1);
    } else {
      removeFromCart(item.id, item.size, item.color);
    }
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.size, item.color);
    setSelectedItems((prev) => {
      const newSelected = { ...prev };
      delete newSelected[item.id + item.size + item.color];
      return newSelected;
    });
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        if (selectedItems[item.id + item.size + item.color]) {
          return total + item.price * item.quantity;
        }
        return total;
      }, 0)
      .toFixed(2);
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
      <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
      </LinearGradient>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id + item.size + item.color}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => handleSelectItem(item.id + item.size + item.color)}
            >
              <Ionicons
                name={
                  selectedItems[item.id + item.size + item.color]
                    ? "checkbox"
                    : "square-outline"
                }
                size={24}
                color="#8e44ad"
              />
            </TouchableOpacity>
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
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleDecreaseQuantity(item)}
                >
                  <Text style={styles.quantityButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleIncreaseQuantity(item)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.price}>
                Rs {(item.price * item.quantity).toFixed(2)}
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveItem(item)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: Rs {calculateTotalPrice()}</Text>
        <TouchableOpacity style={styles.buyButton} onPress={handlePlaceOrder}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    paddingTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
    width: 42,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    fontFamily: "Helvetica",
    textAlign: "center",
    flex: 1,
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
    alignItems: "center",
  },
  checkbox: {
    padding: 8,
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
  quantityButton: {
    backgroundColor: "#8e44ad",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 14,
    marginHorizontal: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: "#b10808ff",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  totalContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: -9,
    textAlign: "center",
  },
  buyButton: {
    backgroundColor: "#8e44ad",
    padding: 15,
    marginHorizontal: "5%",
    marginVertical: 30,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
