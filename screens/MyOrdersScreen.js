import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useProducts } from "../context/ProductContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const MyOrdersScreen = () => {
  const { orders, setOrders } = useProducts(); // Make sure setOrders is exposed in context
  const [selected, setSelected] = useState([]);

  const toggleSelect = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const handleDeleteSelected = () => {
    Alert.alert(
      "Delete Selected",
      "Are you sure you want to delete the selected orders?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const remaining = orders.filter(
              (_, index) => !selected.includes(index)
            );
            setOrders(remaining);
            setSelected([]);
          },
        },
      ]
    );
  };

  const renderOrderItem = ({ item, index }) => {
    if (!item?.name || !item?.price || !item?.image) return null;

    const isSelected = selected.includes(index);

    return (
      <TouchableOpacity
        onLongPress={() => toggleSelect(index)}
        onPress={() => selected.length > 0 && toggleSelect(index)}
        activeOpacity={0.9}
        style={[
          styles.card,
          isSelected && {
            borderColor: "#a78bfa",
            borderWidth: 2,
            backgroundColor: "#f3e8ff",
          },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>LKR {item.price.toFixed(2)}</Text>
        </View>
        {isSelected && (
          <Ionicons
            name="checkmark-circle"
            size={24}
            color="#8b5cf6"
            style={styles.checkIcon}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </LinearGradient>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#d1d5db" />
          <Text style={styles.emptyText}>No orders yet</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={orders}
            keyExtractor={(item, index) => `${item?.id || index}-${index}`}
            renderItem={renderOrderItem}
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 12 }}
            showsVerticalScrollIndicator={false}
          />
          {selected.length > 0 && (
            <View style={styles.deleteContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeleteSelected}
              >
                <Ionicons name="trash-outline" size={20} color="#fff" />
                <Text style={styles.deleteText}>
                  Delete Selected ({selected.length})
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    position: "relative",
  },
  image: {
    width: 85,
    height: 105,
    borderRadius: 10,
    marginRight: 14,
    backgroundColor: "#e5e7eb",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#1f2937",
  },
  price: {
    fontSize: 16,
    color: "#4b5563",
  },
  checkIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 100,
    opacity: 0.7,
  },
  emptyText: {
    fontSize: 18,
    color: "#9ca3af",
    marginTop: 12,
  },
  deleteContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 3,
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
