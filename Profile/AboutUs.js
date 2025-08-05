import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const AboutUs = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const openWebsite = async () => {
    const url = "https://everefficient.lk/";
    setIsLoading(true);
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "Error",
          "Unable to open the website. Please try again later."
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to open the website. Please check your connection."
      );
      console.error("Website Linking Error:", error);
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
        <Text style={styles.headerTitle}>About Us</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <Image
            source={{
              uri: "https://everefficient.lk/assets/img/ee-images/ee-logo-new2.png",
            }} // Replace with your local logo or valid URI
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.companyName}>Ever Efficient Technologies</Text>
          <Text style={styles.description}>
            We are a Sri Lankan-based software and IT service provider,
            delivering innovative digital solutions tailored to your business
            needs. Our commitment to quality, performance, and integrity drives
            us to provide exceptional web development, mobile app design,
            digital marketing, and IT consultation services.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.sectionText}>
            To empower businesses with cutting-edge technology, ensuring
            efficiency, scalability, and a competitive edge in the digital
            landscape.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <View style={styles.serviceItem}>
            <Ionicons name="globe-outline" size={20} color="#4b5563" />
            <Text style={styles.serviceText}>Web & Mobile App Development</Text>
          </View>
          <View style={styles.serviceItem}>
            <Ionicons name="code-slash-outline" size={20} color="#4b5563" />
            <Text style={styles.serviceText}>Custom Software Solutions</Text>
          </View>
          <View style={styles.serviceItem}>
            <Ionicons name="megaphone-outline" size={20} color="#4b5563" />
            <Text style={styles.serviceText}>Digital Marketing & SEO</Text>
          </View>
          <View style={styles.serviceItem}>
            <Ionicons name="people-outline" size={20} color="#4b5563" />
            <Text style={styles.serviceText}>Expert IT Consultation</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Our Team</Text>
          <Text style={styles.sectionText}>
            Our team of skilled developers, designers, and strategists work
            collaboratively to bring your vision to life. With expertise in
            modern technologies and a passion for innovation, we ensure every
            project exceeds expectations.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={20} color="#4b5563" />
            <Text style={styles.contactText}>info@everefficient.lk</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={20} color="#4b5563" />
            <Text style={styles.contactText}>+94 777 644 590</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="location-outline" size={20} color="#4b5563" />
            <Text style={styles.contactText}>Kandy, Sri Lanka</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.websiteButton, isLoading && styles.buttonDisabled]}
          onPress={openWebsite}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="globe-outline" size={20} color="#fff" />
              <Text style={styles.websiteButtonText}>Visit Our Website</Text>
            </>
          )}
        </TouchableOpacity>
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
  contentContainer: {
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
  logo: {
    width: 160,
    height: 160,
    alignSelf: "center",
    marginBottom: 16,
  },
  companyName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#8e44ad",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  serviceText: {
    fontSize: 15,
    color: "#374151",
    marginLeft: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  contactText: {
    fontSize: 15,
    color: "#374151",
    marginLeft: 12,
  },
  websiteButton: {
    flexDirection: "row",
    backgroundColor: "#8e44ad",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  websiteButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    backgroundColor: "#a78bfa",
    opacity: 0.7,
  },
});

export default AboutUs;
