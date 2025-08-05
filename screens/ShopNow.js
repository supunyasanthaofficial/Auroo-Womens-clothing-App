import React, { useState } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useProducts } from "../context/ProductContext";

const { width } = Dimensions.get("window");

const ShopNowScreen = () => {
  const { ShopNowProducts } = useProducts();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [displayImage, setDisplayImage] = useState("");

  // For image viewer
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const navigation = useNavigation();

  const openModal = (product) => {
    const defaultColor = product.colors[0];
    setSelectedProduct(product);
    setSelectedSize(product.size[0]);
    setSelectedColor(defaultColor);
    setDisplayImage(product.imagesByColor?.[defaultColor] || product.thumbnail);
    setModalVisible(true);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const image = selectedProduct?.imagesByColor?.[color];
    if (image) {
      setDisplayImage(image);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      Alert.alert("Please select size and color");
      return;
    }
    navigation.navigate("Cart", {
      product: {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        size: selectedSize,
        color: selectedColor,
        image: displayImage,
        quantity: 1,
      },
    });
    setModalVisible(false);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => openModal(item)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>Rs {item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const renderStars = (rating) => (
    <View style={{ flexDirection: "row", marginBottom: 6 }}>
      {[...Array(5)].map((_, i) => (
        <Ionicons
          key={i}
          name={i < Math.floor(rating) ? "star" : "star-outline"}
          size={16}
          color="#f1c40f"
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop Now Deals</Text>
      <FlatList
        data={ShopNowProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={styles.list}
      />

      {/* Product Detail Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {selectedProduct && (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedImage(displayImage);
                      setImageViewerVisible(true);
                    }}
                  >
                    <Image
                      source={{ uri: displayImage }}
                      style={styles.modalImage}
                    />
                  </TouchableOpacity>

                  <Text style={styles.modalName}>{selectedProduct.name}</Text>
                  <Text style={styles.modalPrice}>
                    Rs {selectedProduct.price.toFixed(2)}
                  </Text>
                  {renderStars(selectedProduct.rating)}
                  <Text style={styles.modalDesc}>
                    {selectedProduct.description}
                  </Text>

                  <Text style={styles.modalLabel}>Size:</Text>
                  <View style={styles.optionRow}>
                    {selectedProduct.size.map((size) => (
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
                    {selectedProduct.colors.map((color) => (
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
                    <Text style={{ color: "#fff" }}>Close</Text>
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
            source={{ uri: selectedImage }}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
};

export default ShopNowScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f6ff",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8e44ad",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: (width - 48) / 2,
    marginBottom: 16,
    padding: 10,
    elevation: 3,
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
  },
  price: {
    fontSize: 14,
    color: "#8e44ad",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000aa",
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
  },
  modalPrice: {
    fontSize: 16,
    color: "#8e44ad",
    marginVertical: 6,
  },
  modalDesc: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
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
  },
  closeButton: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center",
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
