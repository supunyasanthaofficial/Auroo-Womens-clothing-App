import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useProducts } from "../context/ProductContext";

const { width } = Dimensions.get("window");

const ShopNowScreen = () => {
  const navigation = useNavigation();
  const { ShopNowProducts, addToCart, cartItems } = useProducts() || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Debug context and products on mount
  useEffect(() => {
    console.log("ShopNowScreen mounted");
    console.log("ProductContext:", { ShopNowProducts, addToCart, cartItems });
    console.log("ShopNowProducts:", JSON.stringify(ShopNowProducts, null, 2));
    if (!ShopNowProducts) {
      console.warn("ShopNowProducts is undefined or null");
    } else if (ShopNowProducts.length === 0) {
      console.warn("ShopNowProducts is empty");
    } else {
      ShopNowProducts.forEach((p, i) => {
        if (
          !p.id ||
          !p.name ||
          !p.price ||
          !p.colors?.length ||
          !p.size?.length
        ) {
          console.warn(`Product ${i} has invalid data:`, p);
        }
      });
    }
  }, [ShopNowProducts, addToCart, cartItems]);

  // Fallback if context is undefined
  if (!ShopNowProducts || !addToCart || !cartItems) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>
          Error: Product context is not available. Ensure ShopNowScreen is
          wrapped in ProductProvider.
        </Text>
      </SafeAreaView>
    );
  }

  const openModal = (product) => {
    if (
      !product ||
      !product.id ||
      !product.colors?.length ||
      !product.size?.length
    ) {
      console.warn("Invalid product data:", product);
      Alert.alert("Error", "Invalid product data");
      return;
    }
    const defaultColor = product.colors[0] || "";
    setSelectedProduct(product);
    setSelectedSize(product.size[0] || "");
    setSelectedColor(defaultColor);
    setDisplayImage(
      product.imagesByColor?.[defaultColor] ||
        product.thumbnail ||
        product.image ||
        "https://via.placeholder.com/200"
    );
    setModalVisible(true);
    console.log("Opened modal for product:", product.name);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const image =
      selectedProduct?.imagesByColor?.[color] || selectedProduct?.thumbnail;
    if (image) {
      setDisplayImage(image);
    }
    console.log("Selected color:", color, "Image:", image);
  };

  const handleAddToCart = () => {
    if (!selectedProduct || !selectedSize || !selectedColor) {
      console.warn("Missing selection:", {
        selectedProduct,
        selectedSize,
        selectedColor,
      });
      Alert.alert("Error", "Please select size and color");
      return;
    }
    try {
      const cartItem = {
        id: selectedProduct.id,
        name: selectedProduct.name || "Unknown Product",
        price: selectedProduct.price || 0,
        size: selectedSize,
        color: selectedColor,
        image:
          selectedProduct.imagesByColor?.[selectedColor] ||
          selectedProduct.thumbnail ||
          selectedProduct.image ||
          "https://via.placeholder.com/200",
        quantity: 1,
      };
      addToCart(cartItem);
      console.log("Added to cart:", cartItem);
      setModalVisible(false);
      navigation.navigate("Cart");
    } catch (error) {
      console.error("Add to cart error:", error);
      Alert.alert("Error", "Failed to add item to cart. Please try again.");
    }
  };

  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri || "https://via.placeholder.com/200");
    setImageViewerVisible(true);
    console.log("Image viewer opened for:", imageUri);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => openModal(item)}
      activeOpacity={0.9}
    >
      <Image
        source={{
          uri:
            item.thumbnail || item.image || "https://via.placeholder.com/200",
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{item.name || "Unknown Product"}</Text>
      <Text style={styles.price}>Rs {(item.price || 0).toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const renderStars = (rating) => (
    <View style={{ flexDirection: "row", marginBottom: 6 }}>
      {[...Array(5)].map((_, i) => (
        <Ionicons
          key={i}
          name={i < Math.floor(rating || 0) ? "star" : "star-outline"}
          size={16}
          color="#f1c40f"
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
        <Text style={styles.headerTitle}>Shop Now Deals</Text>
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => {
            console.log("Navigating to Cart, items:", cartItems.length);
            navigation.navigate("Cart");
          }}
        >
          <Ionicons name="cart-outline" size={28} color="#fff" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </LinearGradient>

      {/* Product List */}
      {ShopNowProducts.length === 0 ? (
        <Text style={styles.noProductsText}>No products available</Text>
      ) : (
        <FlatList
          data={ShopNowProducts}
          renderItem={renderProduct}
          keyExtractor={(item) =>
            item.id?.toString() || Math.random().toString()
          }
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={styles.list}
        />
      )}

      {/* Product Detail Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {selectedProduct && (
                <>
                  <TouchableOpacity
                    onPress={() => handleImagePress(displayImage)}
                  >
                    <Image
                      source={{ uri: displayImage }}
                      style={styles.modalImage}
                    />
                  </TouchableOpacity>
                  <Text style={styles.modalName}>
                    {selectedProduct.name || "Unknown Product"}
                  </Text>
                  <Text style={styles.modalPrice}>
                    Rs {(selectedProduct.price || 0).toFixed(2)}
                  </Text>
                  {selectedProduct.rating &&
                    renderStars(selectedProduct.rating)}
                  <Text style={styles.modalDesc}>
                    {selectedProduct.description || "No description available"}
                  </Text>
                  <Text style={styles.modalLabel}>Size:</Text>
                  <View style={styles.optionRow}>
                    {selectedProduct.size?.map((size) => (
                      <TouchableOpacity
                        key={size}
                        style={[
                          styles.optionBox,
                          selectedSize === size && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedSize(size)}
                      >
                        <Text style={styles.optionText}>{size}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text style={styles.modalLabel}>Color:</Text>
                  <View style={styles.optionRow}>
                    {selectedProduct.colors?.map((color) => (
                      <TouchableOpacity
                        key={color}
                        style={[
                          styles.colorCircle,
                          {
                            backgroundColor: color,
                            borderColor:
                              selectedColor === color ? "#8e44ad" : "#ccc",
                            borderWidth: 2,
                          },
                        ]}
                        onPress={() => handleColorChange(color)}
                      />
                    ))}
                  </View>
                  <TouchableOpacity
                    style={styles.addToCart}
                    onPress={handleAddToCart}
                  >
                    <Ionicons name="cart" size={20} color="#fff" />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Image Viewer Modal */}
      <Modal visible={imageViewerVisible} transparent>
        <View style={styles.imageViewerContainer}>
          <TouchableOpacity
            style={styles.closeImageViewer}
            onPress={() => setImageViewerVisible(false)}
          >
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <Image
            source={{ uri: selectedImage || "https://via.placeholder.com/200" }}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ShopNowScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f6ff",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    padding: 20,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    fontFamily: "Helvetica",
  },
  cartIcon: {
    padding: 8,
  },
  cartBadge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#ff0000",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  noProductsText: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    padding: 20,
    fontFamily: "Helvetica",
  },
  list: {
    paddingBottom: 20,
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: (width - 48) / 2,
    marginBottom: 16,
    marginHorizontal: 8,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    color: "#333",
    fontFamily: "Helvetica",
  },
  price: {
    fontSize: 14,
    color: "#8e44ad",
    fontFamily: "Helvetica",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    maxHeight: "90%",
  },
  modalImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  modalName: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    color: "#333",
    fontFamily: "Helvetica",
  },
  modalPrice: {
    fontSize: 16,
    color: "#8e44ad",
    marginVertical: 6,
    fontFamily: "Helvetica",
  },
  modalDesc: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
    fontFamily: "Helvetica",
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
    fontFamily: "Helvetica",
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  optionBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 6,
  },
  selectedOption: {
    backgroundColor: "#f1e6fa",
    borderColor: "#8e44ad",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Helvetica",
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  addToCart: {
    flexDirection: "row",
    backgroundColor: "#8e44ad",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  addToCartText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "Helvetica",
  },
  closeButton: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "Helvetica",
  },
  imageViewerContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeImageViewer: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
  },
});
