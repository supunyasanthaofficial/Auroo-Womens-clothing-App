import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const IMAGES = [
  "https://cdn.pixabay.com/photo/2023/11/10/02/30/woman-8378634_1280.jpg",
  "https://cdn.pixabay.com/photo/2022/11/10/07/15/portrait-7582123_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/07/28/09/23/woman-3567600_1280.jpg",
];

const IntroScreen = () => {
  const navigation = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(1)).current;

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-5deg"],
  });

  useEffect(() => {
    const animateImage = () => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1.05,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        setCurrentSlide((prev) => (prev + 1) % IMAGES.length);
      });
    };

    const interval = setInterval(() => {
      animateImage();
    }, 3000);

    animateImage();
    return () => clearInterval(interval);
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("Home");
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />

      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to MarketPlace</Text>
          <Text style={styles.subtitle}>
            Explore top deals and connect with buyers and sellers.
          </Text>
        </View>

        <View style={styles.carouselContainer}>
          <Animated.Image
            source={{ uri: IMAGES[currentSlide] }}
            style={[
              styles.image,
              {
                opacity: fadeAnim,
                transform: [
                  { scale: scaleAnim },
                  { rotate: rotateInterpolate },
                ],
              },
            ]}
            resizeMode="cover"
          />
        </View>

        <View style={styles.dotsContainer}>
          {IMAGES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, currentSlide === i && styles.activeDot]}
            />
          ))}
        </View>

        <Animated.View
          style={{
            transform: [{ scale: buttonAnim }],
            opacity: buttonAnim.interpolate({
              inputRange: [0.96, 1],
              outputRange: [0.9, 1],
            }),
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  content: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 26,
  },
  carouselContainer: {
    width: width - 40,
    height: 360,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 5,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: "#3B82F6",
    width: 12,
    height: 12,
  },
  button: {
    backgroundColor: "#0a0a0aff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    textTransform: "uppercase",
  },
});
