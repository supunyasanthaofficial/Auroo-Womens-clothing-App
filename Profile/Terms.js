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

const TermsOfUse = () => {
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
        Alert.alert("Error", "Unable to open email client.");
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
        <Text style={styles.headerTitle}>Terms of Use</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Intro */}
        <View style={styles.card}>
          <Text style={styles.title}>
            Welcome to Ever Efficient Technologies
          </Text>
          <Text style={styles.text}>
            By accessing or using our mobile app or website, you agree to be
            bound by these Terms of Use. Please review them carefully to
            understand your rights and responsibilities.
          </Text>
        </View>

        {/* Section 1 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <View style={styles.row}>
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color="#4b5563"
            />
            <Text style={styles.text}>
              You confirm you’ve read and agree to these Terms and all
              applicable laws.
            </Text>
          </View>
        </View>

        {/* Section 2 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>2. Modifications to Terms</Text>
          <View style={styles.row}>
            <Ionicons name="document-text-outline" size={20} color="#4b5563" />
            <Text style={styles.text}>
              We may update these terms at any time. Continued use means
              acceptance of changes.
            </Text>
          </View>
        </View>

        {/* Section 3 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
          <View style={styles.row}>
            <Ionicons name="person-outline" size={20} color="#4b5563" />
            <Text style={styles.text}>
              • Use services legally.{"\n"}• Keep your credentials safe.{"\n"}•
              Don’t engage in harmful or unauthorized activity.
            </Text>
          </View>
        </View>

        {/* Section 4 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>4. Intellectual Property</Text>
          <View style={styles.row}>
            <Ionicons name="lock-closed-outline" size={20} color="#4b5563" />
            <Text style={styles.text}>
              All designs, logos, and content are owned by Ever Efficient
              Technologies. Do not copy or redistribute without permission.
            </Text>
          </View>
        </View>

        {/* Section 5 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>5. Privacy</Text>
          <View style={styles.row}>
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color="#4b5563"
            />
            <Text style={styles.text}>
              Your use of our services is governed by our Privacy Policy. Please
              review it for details.
            </Text>
          </View>
        </View>

        {/* Section 6 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>6. Limitation of Liability</Text>
          <View style={styles.row}>
            <Ionicons name="warning-outline" size={20} color="#4b5563" />
            <Text style={styles.text}>
              We’re not responsible for indirect or consequential damages like
              data loss or business disruption.
            </Text>
          </View>
        </View>

        {/* Section 7 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>7. Termination</Text>
          <View style={styles.row}>
            <Ionicons name="close-circle-outline" size={20} color="#4b5563" />
            <Text style={styles.text}>
              We may suspend or terminate your account if you breach these terms
              or harm our platform.
            </Text>
          </View>
        </View>

        {/* Section 8: FAQs */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>8. Frequently Asked Questions</Text>
          <Text style={styles.bold}>Can I share my account?</Text>
          <Text style={styles.text}>
            No. Sharing accounts is prohibited and may result in suspension.
          </Text>

          <Text style={[styles.bold, { marginTop: 12 }]}>
            What happens if I violate the terms?
          </Text>
          <Text style={styles.text}>
            Your account may be restricted, suspended, or permanently removed.
          </Text>
        </View>

        {/* Section 9: Contact */}
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

export default TermsOfUse;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  header: {
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: { marginRight: 10 },
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
    marginBottom: 12,
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
    marginBottom: 4,
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
