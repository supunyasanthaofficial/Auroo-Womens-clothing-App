import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const ChatSupport = ({ navigation }) => {
  const supportOptions = [
    {
      id: "whatsapp",
      icon: "logo-whatsapp",
      label: "WhatsApp",
      description: "Chat with us on WhatsApp for quick support.",
      action: async () => {
        const url = "whatsapp://send?phone=+94741344312";
        try {
          const supported = await Linking.canOpenURL(url);
          if (supported) {
            await Linking.openURL(url);
          } else {
            Alert.alert("Error", "WhatsApp is not installed on your device.");
          }
        } catch (error) {
          Alert.alert("Error", "Failed to open WhatsApp. Please try again.");
          console.error("WhatsApp Linking Error:", error);
        }
      },
    },
    {
      id: "instagram",
      icon: "logo-instagram",
      label: "Instagram",
      description: "Message us on Instagram for assistance.",
      action: async () => {
        const url =
          "https://www.instagram.com/_supun_yasantha_?utm_source=qr&igsh=MTVranQ5NGx4MXMxMg=="; // Replace with your Instagram handle
        try {
          await Linking.openURL(url);
        } catch (error) {
          Alert.alert("Error", "Failed to open Instagram. Please try again.");
          console.error("Instagram Linking Error:", error);
        }
      },
    },
    {
      id: "messenger",
      icon: "logo-facebook",
      label: "Messenger",
      description: "Reach out via Facebook Messenger.",
      action: async () => {
        const url = "fb-messenger://user-thread/your_facebook_page_id";
        try {
          const supported = await Linking.canOpenURL(url);
          if (supported) {
            await Linking.openURL(url);
          } else {
            await Linking.openURL("https://m.me/your_facebook_page_id");
          }
        } catch (error) {
          Alert.alert("Error", "Failed to open Messenger. Please try again.");
          console.error("Messenger Linking Error:", error);
        }
      },
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat Support</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.supportContainer}>
          <Text style={styles.sectionTitle}>Connect with Us</Text>
          <Text style={styles.sectionSubtitle}>
            Choose your preferred platform to get in touch with our support
            team.
          </Text>

          {supportOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={option.action}
              activeOpacity={0.7}
            >
              <View style={styles.optionIconContainer}>
                <Ionicons name={option.icon} size={30} color="#4b5563" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionLabel}>{option.label}</Text>
                <Text style={styles.optionDescription}>
                  {option.description}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="#9ca3af"
                style={styles.optionArrow}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  backButton: {
    padding: 8,
    marginRight: 10,
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
  supportContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: 1,
  },
  optionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  optionDescription: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  optionArrow: {
    marginLeft: 10,
  },
});

export default ChatSupport;
