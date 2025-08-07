import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Modal,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useProducts } from "../context/ProductContext";

const { width } = Dimensions.get("window");

const banners = [
  {
    id: "1",
    title: "Up to 70% Off",
    subtitle: "Your dress up clothes first",
    buttonText: "Shop Now",
    image:
      "https://cdn.pixabay.com/photo/2023/01/24/13/23/viet-nam-7741017_1280.jpg",
  },
  {
    id: "2",
    title: "Up to 70% Off",
    subtitle: "New year special sale Off",
    buttonText: "Shop Now",
    image:
      "https://cdn.pixabay.com/photo/2020/02/01/03/00/girl-4809433_1280.jpg",
  },
];

const HomeScreen = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [sortType, setSortType] = useState("default");
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [categoryType, setCategoryType] = useState("all");
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const navigation = useNavigation();
  const { products, addToCart, cartItems, ShopNowProducts } =
    useProducts() || {};

  // Fallback if context is undefined
  if (!products || !addToCart || !cartItems) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>
          Error: Product context is not available. Ensure HomeScreen is wrapped
          in ProductProvider.
        </Text>
      </SafeAreaView>
    );
  }

  // Infer categories based on product names (since no category field exists)
  const inferCategory = (productName) => {
    if (!productName) return "Uncategorized";
    const name = productName.toLowerCase();
    if (name.includes("dress") || name.includes("jumpsuit")) return "Dresses";
    if (
      name.includes("blouse") ||
      name.includes("tee") ||
      name.includes("sweater")
    )
      return "Tops";
    if (name.includes("jeans") || name.includes("skirt")) return "Accessories";
    return "Uncategorized";
  };

  // Category options
  const categoryOptions = [
    { label: "All", value: "all" },
    { label: "Dresses", value: "Dresses" },
    { label: "Tops", value: "Tops" },
    { label: "Accessories", value: "Accessories" },
  ];

  // Filter and sort products
  const filteredAndSortedProducts = [...(products || [])]
    .filter((product) => {
      const productCategory = inferCategory(product.name);
      return categoryType === "all" || productCategory === categoryType;
    })
    .sort((a, b) => {
      if (sortType === "priceLowToHigh") {
        return (a.price || 0) - (b.price || 0);
      } else if (sortType === "priceHighToLow") {
        return (b.price || 0) - (a.price || 0);
      }
      return 0; // Default: no sorting
    });

  const navigateToCart = () => {
    if (!selectedProduct || !selectedSize || !selectedColor) {
      Alert.alert("Error", "Please select size and color");
      return;
    }

    try {
      addToCart({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        size: selectedSize,
        color: selectedColor,
        image: displayImage,
        quantity: 1,
      });
      setModalVisible(false);
      navigation.navigate("Cart");
    } catch (error) {
      Alert.alert("Error", "Failed to add item to cart. Please try again.");
    }
  };

  const openModal = (product) => {
    if (!product || !product.colors || !product.size) {
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
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const imageByColor = selectedProduct?.imagesByColor?.[color];
    if (imageByColor) {
      setDisplayImage(imageByColor);
    }
  };

  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri || "https://via.placeholder.com/200");
    setImageViewerVisible(true);
  };

  const renderStars = (rating) => (
    <View style={{ flexDirection: "row", marginBottom: 8 }}>
      {[...Array(5)].map((_, index) => (
        <Ionicons
          key={index}
          name={index < (rating || 0) ? "star" : "star-outline"}
          size={18}
          color="#f1c40f"
          style={{ marginRight: 2 }}
        />
      ))}
    </View>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      activeOpacity={0.9}
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

  const renderBannerItem = ({ item }) => (
    <TouchableOpacity style={styles.bannerContainer} activeOpacity={0.9}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.bannerBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(198, 161, 207, 0.7)", "rgba(216, 191, 216, 0.9)"]}
          style={styles.bannerGradient}
        >
          <Text style={styles.bannerTitle}>{item.title}</Text>
          <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
          <TouchableOpacity
            style={styles.shopNowButton}
            onPress={() =>
              navigation.navigate("ShopNow", {
                products: ShopNowProducts || [],
              })
            }
          >
            <Text style={styles.shopNowText}>{item.buttonText}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  const sortOptions = [
    { label: "Default", value: "default" },
    { label: "Price Low to High", value: "priceLowToHigh" },
    { label: "Price High to Low", value: "priceHighToLow" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#d8bfd8", "#c6a1cf"]} style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("../assets/Auro o fashion-01.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.headerTitle}>Women's Fashion</Text>
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => navigation.navigate("Cart")} // Direct navigation to Cart
        >
          <Ionicons name="cart-outline" size={28} color="#fff" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </LinearGradient>

      {/* ScrollView */}
      <ScrollView style={styles.scrollContainer}>
        {/* Banners */}
        <View style={styles.bannerSection}>
          <FlatList
            data={banners}
            renderItem={renderBannerItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            contentContainerStyle={styles.bannerList}
            snapToInterval={width - 32}
            decelerationRate="fast"
          />
        </View>

        {/* Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Collection</Text>
            <View style={styles.filterSortContainer}>
              {/* <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => {
                  console.log("Opening category modal");
                  setCategoryModalVisible(true);
                }}
              >
                <Ionicons name="funnel-outline" size={20} color="#8e44ad" />
                <Text style={styles.categoryButtonText}>
                  Filter:{" "}
                  {categoryOptions.find((opt) => opt.value === categoryType)
                    ?.label || "All"}
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.sortButton}
                onPress={() => {
                  console.log("Opening sort modal");
                  setSortModalVisible(true);
                }}
              >
                <Ionicons name="filter" size={20} color="#8e44ad" />
                <Text style={styles.sortButtonText}>
                  Sort:{" "}
                  {sortOptions.find((opt) => opt.value === sortType)?.label ||
                    "Default"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {filteredAndSortedProducts.length === 0 ? (
            <Text style={styles.noProductsText}>
              No products found for this category
            </Text>
          ) : (
            <FlatList
              data={filteredAndSortedProducts}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.id || Math.random().toString()}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.productList}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      {/* Category Modal */}
      <Modal
        visible={categoryModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={styles.sortModalContainer}>
          <View style={styles.sortModalContent}>
            <Text style={styles.sortModalTitle}>Filter by Category</Text>
            {categoryOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.sortOption,
                  categoryType === option.value && styles.selectedSortOption,
                ]}
                onPress={() => {
                  console.log(`Selected category: ${option.value}`);
                  setCategoryType(option.value);
                  setCategoryModalVisible(false);
                }}
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
              style={styles.sortCancelButton}
              onPress={() => {
                console.log("Category modal cancelled");
                setCategoryModalVisible(false);
              }}
            >
              <Text style={styles.sortCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal
        visible={sortModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={styles.sortModalContainer}>
          <View style={styles.sortModalContent}>
            <Text style={styles.sortModalTitle}>Sort By</Text>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.sortOption,
                  sortType === option.value && styles.selectedSortOption,
                ]}
                onPress={() => {
                  console.log(`Selected sort: ${option.value}`);
                  setSortType(option.value);
                  setSortModalVisible(false);
                }}
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
              style={styles.sortCancelButton}
              onPress={() => {
                console.log("Sort modal cancelled");
                setSortModalVisible(false);
              }}
            >
              <Text style={styles.sortCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Product Detail Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <TouchableOpacity onPress={() => handleImagePress(displayImage)}>
                <Image
                  source={{ uri: displayImage }}
                  style={styles.modalImage}
                />
              </TouchableOpacity>
              <Text style={styles.modalName}>
                {selectedProduct?.name || "Unknown Product"}
              </Text>
              <Text style={styles.modalPrice}>
                Rs {(selectedProduct?.price || 0).toFixed(2)}
              </Text>
              {selectedProduct?.rating && renderStars(selectedProduct.rating)}
              {selectedProduct?.description && (
                <>
                  <Text style={styles.modalLabel}>Description:</Text>
                  <Text style={styles.descriptionText}>
                    {selectedProduct.description}
                  </Text>
                </>
              )}
              <Text style={styles.modalLabel}>Select Size:</Text>
              <View style={styles.optionsRow}>
                {selectedProduct?.size?.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.optionBox,
                      selectedSize === size && styles.selectedOption,
                    ]}
                    onPress={() => {
                      console.log(`Selected size: ${size}`);
                      setSelectedSize(size);
                    }}
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
                    onPress={() => {
                      console.log(`Selected color: ${color}`);
                      handleColorChange(color);
                    }}
                  />
                ))}
              </View>
              <TouchableOpacity
                style={styles.addToCartModal}
                onPress={navigateToCart}
              >
                <Ionicons name="cart" size={20} color="#fff" />
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  console.log("Closing product modal");
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Image Viewer */}
      <Modal visible={imageViewerVisible} transparent>
        <View style={styles.imageViewerContainer}>
          <TouchableOpacity
            style={styles.closeImageViewer}
            onPress={() => {
              console.log("Closing image viewer");
              setImageViewerVisible(false);
            }}
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f6ff",
  },
  scrollContainer: {
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 75,
    height: 75,
    resizeMode: "contain",
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
  bannerSection: {
    marginVertical: 12,
  },
  bannerList: {
    paddingHorizontal: 16,
  },
  bannerContainer: {
    width: width - 32,
    marginRight: 16,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  bannerBackground: {
    width: "100%",
    height: 200,
  },
  bannerGradient: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    fontFamily: "Helvetica",
  },
  bannerSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    fontFamily: "Helvetica",
  },
  shopNowButton: {
    backgroundColor: "#8e44ad",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  shopNowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Helvetica",
  },
  section: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterSortContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Helvetica",
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
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 8,
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#8e44ad",
    marginLeft: 6,
    fontFamily: "Helvetica",
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
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sortButtonText: {
    fontSize: 14,
    color: "#8e44ad",
    marginLeft: 6,
    fontFamily: "Helvetica",
  },
  sortModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  sortModalContent: {
    width: width - 40,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  sortModalTitle: {
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
  selectedSortOption: {
    backgroundColor: "#f1e6fa",
  },
  sortOptionText: {
    fontSize: 16,
    color: "#374151",
    fontFamily: "Helvetica",
  },
  selectedSortOptionText: {
    color: "#8e44ad",
    fontWeight: "600",
  },
  sortCancelButton: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: "#8e44ad",
    borderRadius: 8,
    alignItems: "center",
  },
  sortCancelText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Helvetica",
  },
  noProductsText: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    padding: 20,
    fontFamily: "Helvetica",
  },
  productList: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  productItem: {
    width: (width - 32) / 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
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
    fontFamily: "Helvetica",
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 13,
    color: "#444",
    marginBottom: 4,
    fontFamily: "Helvetica",
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
    fontFamily: "Helvetica",
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
