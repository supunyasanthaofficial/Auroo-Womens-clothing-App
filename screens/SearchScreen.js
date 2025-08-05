import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useProducts } from "../context/ProductContext";

const { width } = Dimensions.get("window");

const SearchScreen = () => {
  const navigation = useNavigation();
  const { products } = useProducts();
  const [searchText, setSearchText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.size[0]);
    setSelectedColor(product.colors[0]);
    setModalVisible(true);
  };

  const navigateToCart = () => {
    if (!selectedSize || !selectedColor) {
      Alert.alert("Please select size and color");
      return;
    }

    navigation.navigate("Cart", {
      product: {
        id: selectedProduct?.id,
        name: selectedProduct?.name,
        price: selectedProduct?.price,
        size: selectedSize,
        color: selectedColor,
        image: selectedProduct?.thumbnail || selectedProduct?.image,
        quantity: 1,
      },
    });
    setModalVisible(false);
  };

  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri);
    setImageViewerVisible(true);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      activeOpacity={0.8}
      onPress={() => openModal(item)}
    >
      <Image
        source={{ uri: item.thumbnail || item.image }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>Rs {item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
        <Text style={styles.headerTitle}>Search Products</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Ionicons name="cart" size={26} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.searchBarContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={{ marginRight: 8 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for items..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />

      {/* Product Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <TouchableOpacity
                onPress={() =>
                  handleImagePress(
                    selectedProduct?.imagesByColor?.[selectedColor] ||
                      selectedProduct?.image
                  )
                }
              >
                <Image
                  source={{
                    uri:
                      selectedProduct?.imagesByColor?.[selectedColor] ||
                      selectedProduct?.image,
                  }}
                  style={styles.modalImage}
                />
              </TouchableOpacity>

              <Text style={styles.modalName}>{selectedProduct?.name}</Text>
              <Text style={styles.modalPrice}>
                Rs {selectedProduct?.price.toFixed(2)}
              </Text>

              <Text style={styles.modalLabel}>Select Size:</Text>
              <View style={styles.optionsRow}>
                {selectedProduct?.size.map((size) => (
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

              <Text style={styles.modalLabel}>Select Color:</Text>
              <View style={styles.optionsRow}>
                {selectedProduct?.colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorCircle,
                      {
                        backgroundColor: color,
                        borderWidth: selectedColor === color ? 2 : 1,
                        borderColor:
                          selectedColor === color ? "#8e44ad" : "#ccc",
                      },
                    ]}
                    onPress={() => setSelectedColor(color)}
                  />
                ))}
              </View>

              <Text style={styles.modalLabel}>Reviews:</Text>
              {selectedProduct?.reviews?.map((review, index) => (
                <Text key={index} style={styles.reviewText}>
                  • {review}
                </Text>
              ))}

              <TouchableOpacity
                style={styles.addToCartModal}
                onPress={navigateToCart}
              >
                <Ionicons name="cart" size={20} color="#fff" />
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Close</Text>
              </TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f6ff" },
  header: {
    padding: 50,
    paddingBottom: 16,
    paddingTop: 40,
    backgroundColor: "#c6a1cf",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 24, fontWeight: "700", color: "#fff" },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  productList: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  productItem: {
    width: (width - 32) / 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 8,
    elevation: 3,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 200,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#8e44ad",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width - 40,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    maxHeight: "90%",
  },
  modalImage: {
    width: "100%",
    height: 250,
    borderRadius: 12,
  },
  modalName: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 12,
    color: "#333",
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: "600",
    color: "#8e44ad",
    marginBottom: 8,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
    color: "#555",
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  optionBox: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 6,
  },
  selectedOption: {
    borderColor: "#8e44ad",
    backgroundColor: "#f1e6fa",
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
  reviewText: {
    fontSize: 13,
    color: "#444",
    marginBottom: 4,
  },
  addToCartModal: {
    flexDirection: "row",
    backgroundColor: "#8e44ad",
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
    fontSize: 14,
  },
  closeButton: {
    marginTop: 12,
    backgroundColor: "#444",
    padding: 8,
    borderRadius: 6,
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
