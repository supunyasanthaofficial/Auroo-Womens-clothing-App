import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";
import * as SecureStore from "expo-secure-store";
import { useProducts } from "../context/ProductContext";
import Animated, { FadeIn } from "react-native-reanimated";

const getCardType = (number) => {
  if (/^4/.test(number)) return "visa";
  if (/^5[1-5]/.test(number)) return "mastercard";
  return "default";
};

const cardIcons = {
  visa: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
  mastercard:
    "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
};

const CardPaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cartItems = [], checkoutDetails } = route.params || {};
  const { placeOrder } = useProducts();

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [saveCard, setSaveCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [masked, setMasked] = useState(false);

  useEffect(() => {
    const loadSavedCard = async () => {
      try {
        const saved = await SecureStore.getItemAsync("savedCard");
        if (saved) {
          const parsed = JSON.parse(saved);
          setCardDetails(parsed);
          setMasked(true);
          setSaveCard(true);
        }
      } catch (e) {
        console.error("Error loading saved card:", e);
      }
    };
    loadSavedCard();
  }, []);

  const handleInputChange = (field, value) => {
    if (masked && field === "cardNumber") {
      setMasked(false);
      value = value.replace(/\D/g, "");
    }

    if (field === "cardNumber") {
      value = value.replace(/\D/g, "");
    }
    setCardDetails((prev) => ({ ...prev, [field]: value }));
  };

  const validateCardDetails = () => {
    const { cardNumber, expiry, cvv } = cardDetails;
    const errors = {};
    if (!/^\d{16}$/.test(cardNumber)) errors.cardNumber = true;
    if (!/^\d{2}\/\d{2}$/.test(expiry)) errors.expiry = true;
    if (!/^\d{3}$/.test(cvv)) errors.cvv = true;
    return errors;
  };

  const cardType = getCardType(cardDetails.cardNumber);
  const maskedCard =
    masked && cardDetails.cardNumber
      ? `**** **** **** ${cardDetails.cardNumber.slice(-4)}`
      : cardDetails.cardNumber;

  const handleConfirm = async () => {
    const errors = validateCardDetails();
    if (Object.keys(errors).length > 0) {
      Alert.alert("Invalid Card Details", "Please enter valid information.");
      return;
    }

    setLoading(true);

    if (saveCard) {
      try {
        await SecureStore.setItemAsync(
          "savedCard",
          JSON.stringify(cardDetails)
        );
      } catch (error) {
        console.error("SecureStore Error:", error);
      }
    }

    setTimeout(() => {
      placeOrder(cartItems);
      setLoading(false);
      Alert.alert("Success", "Payment completed successfully", [
        { text: "OK", onPress: () => navigation.navigate("MyOrders") },
      ]);
    }, 1500);
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
        <Text style={styles.headerTitle}>Card Payment</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Animated.View entering={FadeIn} style={styles.card}>
          <Text style={styles.sectionTitle}>Card information</Text>

          {cardType !== "default" && (
            <Image
              source={{ uri: cardIcons[cardType] }}
              style={styles.cardIcon}
            />
          )}

          <TextInput
            style={[
              styles.input,
              validateCardDetails().cardNumber && styles.inputError,
            ]}
            placeholder="Card Number (16 digits)"
            keyboardType="numeric"
            maxLength={16}
            value={masked ? maskedCard : cardDetails.cardNumber}
            onChangeText={(val) => handleInputChange("cardNumber", val)}
          />

          <View style={styles.row}>
            <TextInput
              style={[
                styles.input,
                validateCardDetails().expiry && styles.inputError,
                { flex: 1, marginRight: 10 },
              ]}
              placeholder="MM/YY"
              keyboardType="numeric"
              maxLength={5}
              value={cardDetails.expiry}
              onChangeText={(val) => handleInputChange("expiry", val)}
            />
            <TextInput
              style={[
                styles.input,
                validateCardDetails().cvv && styles.inputError,
                { flex: 1 },
              ]}
              placeholder="CVV"
              keyboardType="numeric"
              maxLength={3}
              secureTextEntry
              value={cardDetails.cvv}
              onChangeText={(val) => handleInputChange("cvv", val)}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              value={saveCard}
              onValueChange={setSaveCard}
              color={saveCard ? "#8b5cf6" : undefined}
            />
            <Text style={styles.checkboxLabel}>
              Save card for future payments
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.confirmButton,
              loading && { backgroundColor: "#a78bfa" },
            ]}
            onPress={handleConfirm}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.confirmButtonText}>Confirm Payment</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default CardPaymentScreen;

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
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 22,
    width: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 14,
  },
  inputError: {
    borderColor: "#dc2626",
    backgroundColor: "#fee2e2",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: "#374151",
  },
  confirmButton: {
    backgroundColor: "#8e44ad",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 18,
    shadowColor: "#8e44ad",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  cardIcon: {
    width: 70,
    height: 45,
    resizeMode: "contain",
    alignSelf: "flex-end",
    marginBottom: 10,
  },
});
