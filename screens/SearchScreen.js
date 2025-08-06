import React, { useState, useEffect, use } from "react";
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
  const [sortType, setSortType] = useState("lowToHigh");
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [categoryType, setCategoryType] = useState("all");
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  useEffect(() => {
    console.log("Products:", JSON.stringify(products, null, 2));
    if (products) {
      products.forEach((p, i) => {
        if (!p.price || typeof p.price !== "number") {
          console.warn(
            `Product ${i} (${p.name || "unknown"}) has invalid price: ${
              p.price
            }`
          );
        }
        if (!p.category) {
          console.warn(`Product ${i} (${p.name || "unknown"}) has no category`);
        }
      });
    } else {
      console.warn("No products available from ProductContext");
    }
  }, [products]);

  const sortOptions = [
    { label: "Price: Low to High", value: "lowToHigh" },
    { label: "Price: High to Low", value: "highToLow" },
  ];
  const categoryOptions = [
    { label: "All", value: "all" },
    { label: "Dresses", value: "Dresses" },
    { label: "Tops", value: "Tops" },
    { label: "Accessories", value: "Accessories" },
  ];

  const filteredProducts = [...(products || [])]
    .filter((product) => {
      if (!product || !product.name) {
        console.warn("Product missing or invalid:", product);
        return false;
      }
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const productCategory = (
        product.category || "Uncategorized"
      ).toLowerCase();
      const matchesCategory =
        categoryType === "all" ||
        productCategory === categoryType.toLowerCase();
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const priceA = a.price || 0,
        priceB = b.price || 0;
      return sortType === "lowToHigh" ? priceA - priceB : priceB - priceA;
    });

  useEffect(() => {
    console.log(
      "Filtered products:",
      filteredProducts.map((p) => ({
        name: p.name,
        price: p.price,
        category: p.category || "Uncategorized",
      }))
    );
    console.log("Filters:", { searchText, categoryType, sortType });
  }, [filteredProducts, searchText, categoryType, sortType]);

  const openModal = (product) => {
    if (!product || !product.colors?.length || !product.size?.length) {
      Alert.alert("Error", "Invalid product data");
      return;
    }
    setSelectedProduct(product);
    setSelectedSize(product.size[0] || "");
    setSelectedColor(product.colors[0] || "");
    setModalVisible(true);
  };

  const navigateToCart = () => {
    if (!selectedProduct || !selectedSize || !selectedColor) {
      Alert.alert("Error", "Please select size and color");
      return;
    }
    const cartProduct = {
      id: selectedProduct.id,
      name: selectedProduct.name,
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
    navigation.navigate("Cart", { product: cartProduct });
    setModalVisible(false);
  };

  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri || "https://via.placeholder.com/200");
    setImageViewerVisible(true);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      activeOpacity={0.8}
      onPress={() => openModal(item)}
    >
      <Image
        source={{
          uri:
            item.thumbnail || item.image || "https://via.placeholder.com/200",
        }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name || "Unknown Product"}</Text>
        <Text style={styles.productPrice}>
          Rs {(item.price || 0).toFixed(2)}
        </Text>
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

      {/* Search bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for items..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Sort button below search */}
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setSortModalVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="filter" size={20} color="#8e44ad" />
          <Text style={styles.sortButtonText}>
            {sortOptions.find((opt) => opt.value === sortType)?.label || "Sort"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Product listing */}
      {!products || products.length === 0 ? (
        <Text style={styles.noProductsText}>No products available</Text>
      ) : filteredProducts.length === 0 ? (
        <Text style={styles.noProductsText}>
          No products found for "{searchText || "all"}" in category "
          {categoryType === "all" ? "All" : categoryType}"
        </Text>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) =>
            item.id?.toString() || Math.random().toString()
          }
          numColumns={2}
          contentContainerStyle={styles.productList}
          columnWrapperStyle={styles.columnWrapper}
          extraData={[sortType, categoryType]}
        />
      )}

      {/* Sort Modal */}
      <Modal
        visible={sortModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort by Price</Text>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.sortOption,
                  sortType === option.value && styles.selectedSortOption,
                ]}
                onPress={() => {
                  setSortType(option.value);
                  setSortModalVisible(false);
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    sortType === option.value && styles.selectedSortOptionText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setSortModalVisible(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Category Modal */}
      <Modal
        visible={categoryModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Category</Text>
            {categoryOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.sortOption,
                  categoryType === option.value && styles.selectedSortOption,
                ]}
                onPress={() => {
                  setCategoryType(option.value);
                  setCategoryModalVisible(false);
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    categoryType === option.value &&
                      styles.selectedSortOptionText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setCategoryModalVisible(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Product Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <TouchableOpacity
                onPress={() =>
                  handleImagePress(
                    selectedProduct?.imagesByColor?.[selectedColor] ||
                      selectedProduct?.thumbnail ||
                      selectedProduct?.image ||
                      "https://via.placeholder.com/200"
                  )
                }
              >
                <Image
                  source={{
                    uri:
                      selectedProduct?.imagesByColor?.[selectedColor] ||
                      selectedProduct?.thumbnail ||
                      selectedProduct?.image ||
                      "https://via.placeholder.com/200",
                  }}
                  style={styles.modalImage}
                />
              </TouchableOpacity>

              <Text style={styles.modalName}>
                {selectedProduct?.name || "Unknown Product"}
              </Text>
              <Text style={styles.modalPrice}>
                Rs {(selectedProduct?.price || 0).toFixed(2)}
              </Text>

              <Text style={styles.modalLabel}>Select Size:</Text>
              <View style={styles.optionsRow}>
                {selectedProduct?.size?.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.optionBox,
                      selectedSize === size && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedSize(size)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.optionText}>{size}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.modalLabel}>Select Color:</Text>
              <View style={styles.optionsRow}>
                {selectedProduct?.colors?.map((color) => (
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
                    activeOpacity={0.7}
                  />
                ))}
              </View>

              <Text style={styles.modalLabel}>Reviews:</Text>
              {selectedProduct?.reviews?.length ? (
                selectedProduct.reviews.map((review, idx) => (
                  <Text key={idx} style={styles.reviewText}>
                    • {review}
                  </Text>
                ))
              ) : (
                <Text style={styles.reviewText}>No reviews available</Text>
              )}

              <TouchableOpacity
                style={styles.addToCartModal}
                onPress={navigateToCart}
                activeOpacity={0.7}
              >
                <Ionicons name="cart" size={20} color="#fff" />
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.closeButtonText}>Close</Text>
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
            activeOpacity={0.7}
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

export default SearchScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f6ff" },
  header: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    paddingTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    fontFamily: "Helvetica",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 12,
    justifyContent: "space-between",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 2,
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Helvetica",
    color: "#333",
  },
  sortContainer: {
    marginHorizontal: 16,
    marginBottom: 8,
    alignItems: "flex-start",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 1,
  },
  sortButtonText: {
    fontSize: 14,
    color: "#8e44ad",
    marginLeft: 6,
    fontFamily: "Helvetica",
  },
  filterContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
    alignItems: "flex-start",
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 1,
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#8e44ad",
    marginLeft: 6,
    fontFamily: "Helvetica",
  },
  noProductsText: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    padding: 20,
    fontFamily: "Helvetica",
  },
  productList: { paddingHorizontal: 8, paddingBottom: 16 },
  columnWrapper: { justifyContent: "space-between", marginBottom: 16 },
  productItem: {
    width: (width - 32) / 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    overflow: "hidden",
  },
  productImage: { width: "100%", height: 200 },
  productInfo: { padding: 12 },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Helvetica",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "500",
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
    width: width - 40,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "Helvetica",
  },
  sortOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  selectedSortOption: { backgroundColor: "#f1e6fa", borderColor: "#8e44ad" },
  sortOptionText: { fontSize: 16, color: "#374151", fontFamily: "Helvetica" },
  selectedSortOptionText: { color: "#8e44ad", fontWeight: "600" },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "600",
    fontFamily: "Helvetica",
  },
  modalImage: { width: "100%", height: 250, borderRadius: 12 },
  modalName: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 12,
    color: "#333",
    fontFamily: "Helvetica",
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: "600",
    color: "#8e44ad",
    marginBottom: 8,
    fontFamily: "Helvetica",
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
    color: "#555",
    fontFamily: "Helvetica",
  },
  optionsRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 8 },
  optionBox: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 6,
  },
  selectedOption: { borderColor: "#8e44ad", backgroundColor: "#f1e6fa" },
  optionText: { fontSize: 14, color: "#333", fontFamily: "Helvetica" },
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
    fontFamily: "Helvetica",
  },
  addToCartModal: {
    flexDirection: "row",
    backgroundColor: "#8e44ad",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "Helvetica",
  },
  closeButton: {
    marginTop: 12,
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 8,
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
    backgroundColor: "rgba(0,0,0,0.9)",
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
  fullScreenImage: { width: "100%", height: "100%" },
});
