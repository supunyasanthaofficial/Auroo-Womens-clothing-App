import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// Profile Screen Component
const ProfileScreen = ({ navigation }) => {
  const user = {
    name: "Supun Yasantha",
    profileImage:
      "https://cdn.pixabay.com/photo/2019/12/04/09/30/man-4672229_1280.jpg",
  };

  const handleOptionPress = (label) => {
    switch (label) {
      case "Terms of Use":
        navigation.navigate("Terms");
        break;
      case "Privacy Policy":
        navigation.navigate("Privacy");
        break;
      case "Chat Support":
        navigation.navigate("ChatSupport");
        break;
      case "AboutUs":
        navigation.navigate("AboutUs");
        break;
      case "Logout":
        Alert.alert("Logout", "Are you sure you want to logout?", [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: () => navigation.navigate("Welcome") },
        ]);
        break;
      default:
        Alert.alert(label, `${label} clicked`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{user.name}</Text>
        </View>

        <View style={styles.optionsContainer}>
          <OptionRow
            icon="document-text-outline"
            label="Terms of Use"
            onPress={() => handleOptionPress("Terms of Use")}
          />
          <OptionRow
            icon="lock-closed-outline"
            label="Privacy Policy"
            onPress={() => handleOptionPress("Privacy Policy")}
          />
          <OptionRow
            icon="headset-outline"
            label="Chat Support"
            onPress={() => handleOptionPress("Chat Support")}
          />
          <OptionRow
            icon="information-circle-outline"
            label="About Us"
            onPress={() => handleOptionPress("AboutUs")}
          />
          <OptionRow
            icon="log-out-outline"
            label="Logout"
            onPress={() => handleOptionPress("Logout")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// OptionRow Component
const OptionRow = ({ icon, label, onPress }) => (
  <TouchableOpacity
    style={styles.optionRow}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Ionicons name={icon} size={24} color="#4b5563" />
    <Text style={styles.optionLabel}>{label}</Text>
    <Ionicons
      name="chevron-forward"
      size={24}
      color="#9ca3af"
      style={{ marginLeft: "auto" }}
    />
  </TouchableOpacity>
);

// Placeholder Screen Components
const WelcomeScreen = () => (
  <SafeAreaView style={styles.screenContainer}>
    <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
      <Text style={styles.headerTitle}>Welcome</Text>
    </LinearGradient>
    <View style={styles.screenContent}>
      <Text style={styles.screenText}>Welcome to the App!</Text>
    </View>
  </SafeAreaView>
);

const LanguageScreen = () => (
  <SafeAreaView style={styles.screenContainer}>
    <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
      <Text style={styles.headerTitle}>Language</Text>
    </LinearGradient>
    <View style={styles.screenContent}>
      <Text style={styles.screenText}>Select your preferred language.</Text>
    </View>
  </SafeAreaView>
);

const TermsScreen = () => (
  <SafeAreaView style={styles.screenContainer}>
    <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
      <Text style={styles.headerTitle}>Terms of Use</Text>
    </LinearGradient>
    <View style={styles.screenContent}>
      <Text style={styles.screenText}>Review our Terms of Use.</Text>
    </View>
  </SafeAreaView>
);

const PrivacyScreen = () => (
  <SafeAreaView style={styles.screenContainer}>
    <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
      <Text style={styles.headerTitle}>Privacy Policy</Text>
    </LinearGradient>
    <View style={styles.screenContent}>
      <Text style={styles.screenText}>Read our Privacy Policy.</Text>
    </View>
  </SafeAreaView>
);

const ChatSupportScreen = () => (
  <SafeAreaView style={styles.screenContainer}>
    <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
      <Text style={styles.headerTitle}>Chat Support</Text>
    </LinearGradient>
    <View style={styles.screenContent}>
      <Text style={styles.screenText}>Contact our support team.</Text>
    </View>
  </SafeAreaView>
);

const AboutUsScreen = () => (
  <SafeAreaView style={styles.screenContainer}>
    <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
      <Text style={styles.headerTitle}>About Us</Text>
    </LinearGradient>
    <View style={styles.screenContent}>
      <Text style={styles.screenText}>Learn more about our company.</Text>
    </View>
  </SafeAreaView>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 16,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  profileContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: "#c084fc",
    marginBottom: 14,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1f2937",
  },
  optionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: 1,
  },
  optionLabel: {
    fontSize: 16,
    color: "#374151",
    marginLeft: 12,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  screenContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  screenText: {
    fontSize: 18,
    color: "#1f2937",
    textAlign: "center",
  },
});

export default ProfileScreen;
