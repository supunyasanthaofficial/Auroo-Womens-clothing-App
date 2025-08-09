import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ImageViewing from "react-native-image-viewing";

const defaultProfileImage =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(
    "https://cdn.pixabay.com/photo/2019/12/04/09/30/man-4672229_1280.jpg"
  );
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);

  const user = {
    name: "Supun Yasantha",
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

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Please allow access to photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleRemoveImage = () => {
    Alert.alert(
      "Remove Photo",
      "Are you sure you want to remove your profile photo?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => setProfileImage(null),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => setIsImageViewerVisible(true)}>
            <Image
              source={{ uri: profileImage || defaultProfileImage }}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          <Text style={styles.profileName}>{user.name}</Text>

          <View style={styles.imageButtons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handlePickImage}
            >
              <Ionicons name="camera-outline" size={20} color="#fff" />
              <Text style={styles.editButtonText}>Change</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: "#ef4444" }]}
              onPress={handleRemoveImage}
            >
              <Ionicons name="trash-outline" size={20} color="#fff" />
              <Text style={styles.editButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
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

      <ImageViewing
        images={[{ uri: profileImage || defaultProfileImage }]}
        imageIndex={0}
        visible={isImageViewerVisible}
        onRequestClose={() => setIsImageViewerVisible(false)}
      />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 18,
    paddingHorizontal: 16,
    alignItems: "flex-start",
    backgroundColor: "transparent",
  },
  headerTitle: {
    fontSize: 22,
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
  imageButtons: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: "#7c3aed",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    gap: 6,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "500",
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
});

export default ProfileScreen;
