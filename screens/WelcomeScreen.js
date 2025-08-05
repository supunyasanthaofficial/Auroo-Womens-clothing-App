import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
  Easing,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const FadeInView = ({ children, style, delay = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      delay,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [fadeAnim, delay]);

  return (
    <Animated.View style={{ ...style, opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const buttonAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(buttonAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      friction: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
    }).start();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://cdn.pixabay.com/photo/2018/11/17/15/31/indonesia-3821296_1280.jpg",
        }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
      </ImageBackground>

      <FadeInView style={styles.content} delay={200}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/Auro o fashion-01.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Welcome to MarketPlace</Text>
        <Text style={styles.subtitle}>
          Explore a world of deals and connect with buyers and sellers.
        </Text>

        <FadeInView style={styles.buttonContainer} delay={400}>
          <Animated.View
            style={{
              transform: [{ scale: buttonAnim }],
              opacity: buttonAnim.interpolate({
                inputRange: [0.97, 1],
                outputRange: [0.85, 1],
              }),
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => navigation.navigate("Home")}
              accessibilityLabel="Get Started"
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
        </FadeInView>
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(31, 41, 55, 0.7)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 40,
    // backgroundColor: "rgba(255, 255, 255, 0.9)",
    // borderRadius: 20,
    // padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "Helvetica",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: "#E5E7EB",
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "Helvetica-bold",
    lineHeight: 28,
    maxWidth: 300,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#141313ff",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 15,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    alignItems: "center",
    width: "85%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Helvetica-bold",
  },
});

export default WelcomeScreen;
