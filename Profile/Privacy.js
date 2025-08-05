import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const PrivacyPolicy = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const openEmail = async () => {
    const email = "info@everefficient.lk";
    const url = `mailto:${email}`;
    setIsLoading(true);
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to open email client. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open email client.");
      console.error("Email Linking Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Section 1 */}
        <View style={styles.card}>
          <Text style={styles.title}>Your Privacy Matters to Us</Text>
          <Text style={styles.text}>
            At Ever Efficient Technologies, we are committed to protecting your
            personal information. This Privacy Policy explains how we collect,
            use, store, and safeguard your data when you interact with our
            mobile app or website.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <View style={styles.row}>
            <Ionicons name="person-outline" size={20} color="#4b5563" />
            <Text style={styles.text}>
              <Text style={styles.bold}> Personal Information:</Text> Name,
              email address, contact details, billing info.
            </Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="phone-portrait-outline" size={20} color="#4b5563" />
            <Text style={styles.text}>
              <Text style={styles.bold}> Device & Usage Data:</Text> IP address,
              device type, OS, and app usage patterns.
            </Text>
          </View>
        </View>

        {/* Section 3 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            2. How We Use Your Information
          </Text>
          <View style={styles.row}>
            <Ionicons name="cart-outline" size={20} color="#4b5563" />
            <Text style={styles.text}>
              Process orders and customer support.
            </Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="star-outline" size={20} color="#4b5563" />
            <Text style={styles.text}>
              Personalized experiences and content.
            </Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="analytics-outline" size={20} color="#4b5563" />
            <Text style={styles.text}>Improve services and performance.</Text>
          </View>
        </View>

        {/* More Sections */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>3. Sharing of Information</Text>
          <Text style={styles.text}>
            We never sell your data. We may share it only with trusted third
            parties (e.g., payment or analytics services).
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>4. Data Security</Text>
          <Text style={styles.text}>
            We use industry-standard security like encryption and secure
            servers.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>5. Cookies & Tracking</Text>
          <Text style={styles.text}>
            We use cookies to enhance your experience and analyze performance.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>6. Your Rights</Text>
          <Text style={styles.text}>
            • View or request changes to your data.{"\n"}• Request deletion of
            your data.{"\n"}• Opt-out of marketing at any time.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>7. Policy Updates</Text>
          <Text style={styles.text}>
            Changes to this policy will be posted here and notified via email or
            app.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>8. FAQs</Text>
          <Text style={styles.bold}>How is data stored?</Text>
          <Text style={styles.text}>
            All data is securely encrypted on certified servers.
          </Text>
          <Text style={[styles.bold, { marginTop: 8 }]}>
            Can I stop data collection?
          </Text>
          <Text style={styles.text}>
            Yes, you can opt out via your settings or email us for assistance.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>9. Contact Us</Text>
          <TouchableOpacity
            style={[styles.contactButton, isLoading && styles.buttonDisabled]}
            onPress={openEmail}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Ionicons name="mail-outline" size={20} color="#fff" />
                <Text style={styles.contactText}> info@everefficient.lk</Text>
              </>
            )}
          </TouchableOpacity>
          <View style={styles.row}>
            <Ionicons name="call-outline" size={20} color="#4b5563" />
            <Text style={styles.text}> +94 112 345 678</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="location-outline" size={20} color="#4b5563" />
            <Text style={styles.text}> Kandy, Sri Lanka</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  header: {
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 12,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#8e44ad",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  text: {
    flex: 1,
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
    marginLeft: 10,
  },
  bold: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },
  contactButton: {
    flexDirection: "row",
    backgroundColor: "#8e44ad",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  contactText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
