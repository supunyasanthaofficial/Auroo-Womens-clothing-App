// import React, { createContext, useContext, useState } from "react";

// const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([
//     {
//       id: "1",
//       name: "Floral Maxi Dress",
//       price: 4500.0,
//       size: ["S", "M", "L"],
//       colors: ["#FFC0CB", "#000000"],
//       thumbnail:
//         "https://cdn.pixabay.com/photo/2020/03/12/00/52/nonbinary-4923610_640.jpg",
//       imagesByColor: {
//         "#FFC0CB":
//           "https://cdn.pixabay.com/photo/2020/03/12/00/52/nonbinary-4923610_1280.jpg",
//         "#000000":
//           "https://cdn.pixabay.com/photo/2024/07/22/06/38/woman-8911930_1280.jpg",
//       },
//       description: "Elegant floral dress perfect for summer outings.",
//       rating: 4.5,
//     },
//     {
//       id: "2",
//       name: "Silk Blouse",
//       price: 5900.99,
//       size: ["XS", "S", "M"],
//       colors: ["#F5F5DC", "#DDA0DD"],
//       thumbnail:
//         "https://cdn.pixabay.com/photo/2023/05/25/13/10/woman-8017358_640.jpg",
//       imagesByColor: {
//         "#F5F5DC":
//           "https://cdn.pixabay.com/photo/2023/05/25/13/10/woman-8017358_1280.jpg",
//         "#DDA0DD":
//           "https://cdn.pixabay.com/photo/2021/03/26/11/16/woman-6127233_1280.jpg",
//       },
//       description: "Silky smooth blouse for casual and formal occasions.",
//       rating: 4.8,
//     },

//   ]);

//   const [ShopNowProducts, setShopNowProducts] = useState([
//     {
//       id: "s1",
//       name: "Summer Sale Skirt",
//       price: 2999.99,
//       size: ["S", "M"],
//       colors: ["#FF7F50", "#FFD700"],
//       thumbnail:
//         "https://cdn.pixabay.com/photo/2023/09/02/11/53/woman-8228748_1280.jpg",
//       imagesByColor: {
//         "#FF7F50":
//           "https://cdn.pixabay.com/photo/2023/09/02/11/53/woman-8228748_1280.jpg",
//         "#FFD700":
//           "https://cdn.pixabay.com/photo/2019/10/12/16/03/skirt-4544372_1280.jpg",
//       },
//       description: "Limited time offer for stylish summer skirts.",
//       rating: 4.6,
//     },
//   ]);

//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     setCartItems((prevItems) => {
//       const exists = prevItems.find(
//         (item) =>
//           item.id === product.id &&
//           item.size === product.size &&
//           item.color === product.color
//       );

//       if (exists) {
//         return prevItems.map((item) =>
//           item.id === newItem.id &&
//           item.size === newItem.size &&
//           item.color === newItem.color
//             ? { ...item, quantity: item.quantity + newItem.quantity }
//             : item
//         );
//       }

//       if (prevItems.length >= 10) {
//         alert("You can only add up to 10 different items in your cart");
//         return prevItems;
//       }
//       return [...prevItems, newItem];
//     });
//   };

//   // add muiltiple items to cart
//   const addMultipleToCart = (productsToAdd) => {
//     setCartItems((prevItems) => {
//       let updatedItems = [...prevItems];

//       for (let product of productsToAdd) {
//         const exists = updatedItems.find(
//           (item) =>
//             item.id === product.id &&
//             item.size === product.size &&
//             item.color === product.color
//         );

//         if (exists) {
//           updatedItems = updatedItems.map((item) =>
//             item.id === product.id &&
//             item.size === product.size &&
//             item.color === product.color
//               ? { ...item, quantity: item.quantity + product.quantity }
//               : item
//           );
//         } else {
//           if (updatedItems.length >= 10) {
//             alert("Cart limit excceeded.Only 10 unique products allowed.");
//             break;
//           }
//           updatedItems.push(product);
//         }
//       }
//       return updatedItems;
//     });
//   };

//   const removeFromCart = (id, size, color) => {
//     setCartItems((prevItems) =>
//       prevItems.filter(
//         (item) =>
//           !(item.id === id && item.size === size && item.color === color)
//       )
//     );
//   };

//   const [orders, setOrders] = useState([]);

//   const placeOrder = (product) => {
//     setOrders((prev) => [...prev, product]);
//   };

//   const addProduct = (newProduct) => {
//     setProducts((prev) => [...prev, newProduct]);
//   };

//   const deleteProduct = (productId) => {
//     setProducts((prev) => prev.filter((item) => item.id !== productId));
//   };

//   //Show now Products
//   const addShopNowProduct = (newProduct) => {
//     setShopNowProducts((prev) => [...prev, newProduct]);
//   };

//   const deleteShopNowProduct = (productId) => {
//     setShopNowProducts((prev) => prev.filter((item) => item.id !== productId));
//   };

//   //orders

//   const PlaceOrder = (product) => {
//     setOrders((prev) => [...prev, product]);
//   };

//   return (
//     <ProductContext.Provider
//       value={{
//         products,
//         addProduct,
//         deleteProduct,
//         placeOrder,
//         orders,
//         setOrders,
//         ShopNowProducts,
//         addShopNowProduct,
//         deleteShopNowProduct,
//         PlaceOrder,
//         setShopNowProducts,
//         cartItems,
//         setCartItems,
//         addToCart,
//         removeFromCart,
//         addMultipleToCart,
//         removeFromCart,
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export const useProducts = () => useContext(ProductContext);

import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Floral Maxi Dress",
      price: 4500.0,
      size: ["S", "M", "L"],
      colors: ["#FFC0CB", "#000000"],
      thumbnail:
        "https://cdn.pixabay.com/photo/2020/03/12/00/52/nonbinary-4923610_640.jpg",
      imagesByColor: {
        "#FFC0CB":
          "https://cdn.pixabay.com/photo/2020/03/12/00/52/nonbinary-4923610_1280.jpg",
        "#000000":
          "https://cdn.pixabay.com/photo/2024/07/22/06/38/woman-8911930_1280.jpg",
      },
      description: "Elegant floral dress perfect for summer outings.",
      rating: 4.5,
    },
    {
      id: "2",
      name: "Silk Blouse",
      price: 5900.99,
      size: ["XS", "S", "M"],
      colors: ["#F5F5DC", "#DDA0DD"],
      thumbnail:
        "https://cdn.pixabay.com/photo/2023/05/25/13/10/woman-8017358_640.jpg",
      imagesByColor: {
        "#F5F5DC":
          "https://cdn.pixabay.com/photo/2023/05/25/13/10/woman-8017358_1280.jpg",
        "#DDA0DD":
          "https://cdn.pixabay.com/photo/2021/03/26/11/16/woman-6127233_1280.jpg",
      },
      description: "Silky smooth blouse for casual and formal occasions.",
      rating: 4.8,
    },
    {
      id: "3",
      name: "High-Waisted Jeans",
      price: 7900.99,
      size: ["M", "L", "XL"],
      colors: ["#1E90FF", "#708090"],
      thumbnail:
        "https://cdn.pixabay.com/photo/2017/08/06/01/24/people-2587437_640.jpg",
      imagesByColor: {
        "#1E90FF":
          "https://cdn.pixabay.com/photo/2017/08/06/01/24/people-2587437_1280.jpg",
        "#708090":
          "https://cdn.pixabay.com/photo/2021/01/15/19/28/jeans-5919633_1280.jpg",
      },
      description: "Comfortable high-waisted jeans that fit any style.",
      rating: 4.3,
    },
    {
      id: "4",
      name: "Leather Jacket",
      price: 12900.99,
      size: ["M", "L"],
      colors: ["#000000"],
      thumbnail:
        "https://cdn.pixabay.com/photo/2024/01/20/13/44/woman-8521140_640.jpg",
      imagesByColor: {
        "#000000":
          "https://cdn.pixabay.com/photo/2024/01/20/13/44/woman-8521140_1280.jpg",
      },
      description: "Classic black leather jacket with premium feel.",
      rating: 4.9,
    },
    {
      id: "5",
      name: "Knit Sweater",
      price: 6900.99,
      size: ["S", "M", "L"],
      colors: ["#8B4513", "#FFFACD"],
      thumbnail:
        "https://cdn.pixabay.com/photo/2020/02/01/16/41/girl-4810719_640.jpg",
      imagesByColor: {
        "#8B4513":
          "https://cdn.pixabay.com/photo/2020/02/01/16/41/girl-4810719_1280.jpg",
        "#FFFACD":
          "https://cdn.pixabay.com/photo/2019/12/14/21/14/woman-4695491_1280.jpg",
      },
      description: "Warm and stylish sweater for cold weather.",
      rating: 4.4,
    },
    {
      id: "6",
      name: "Denim Skirt",
      price: 4900.99,
      size: ["XS", "S", "M", "L"],
      colors: ["#4682B4"],
      thumbnail:
        "https://cdn.pixabay.com/photo/2019/07/26/06/12/girl-4364019_640.jpg",
      imagesByColor: {
        "#4682B4":
          "https://cdn.pixabay.com/photo/2019/07/26/06/12/girl-4364019_1280.jpg",
      },
      description: "Trendy denim skirt with perfect fit and length.",
      rating: 4.2,
    },
    {
      id: "7",
      name: "Graphic Tee",
      price: 2999.99,
      size: ["S", "M", "L"],
      colors: ["#FFFFFF", "#000000"],
      thumbnail:
        "https://cdn.pixabay.com/photo/2016/11/14/04/57/woman-1822656_640.jpg",
      imagesByColor: {
        "#FFFFFF":
          "https://cdn.pixabay.com/photo/2016/11/14/04/57/woman-1822656_1280.jpg",
        "#000000":
          "https://cdn.pixabay.com/photo/2016/03/27/22/22/hipster-1283826_1280.jpg",
      },
      description: "Soft cotton tee with stylish graphic prints.",
      rating: 4.1,
    },
    {
      id: "8",
      name: "Chic Jumpsuit",
      price: 8500.99,
      size: ["S", "M", "L"],
      colors: ["#FF69B4", "#FFD700"],
      thumbnail:
        "https://cdn.pixabay.com/photo/2021/04/03/02/52/ao-dai-6146369_640.jpg",
      imagesByColor: {
        "#FF69B4":
          "https://cdn.pixabay.com/photo/2021/04/03/02/52/ao-dai-6146369_1280.jpg",
        "#FFD700":
          "https://cdn.pixabay.com/photo/2019/06/05/14/32/jumpsuit-4253906_1280.jpg",
      },
      description: "Modern jumpsuit perfect for casual parties.",
      rating: 4.6,
    },
    // ... add more products as needed
  ]);

  const [ShopNowProducts, setShopNowProducts] = useState([
    {
      id: "s1",
      name: "Summer Sale Skirt",
      price: 2999.99,
      size: ["S", "M"],
      colors: ["#FF7F50", "#FFD700"],
      thumbnail:
        "https://cdn.pixabay.com/photo/2023/09/02/11/53/woman-8228748_1280.jpg",
      imagesByColor: {
        "#FF7F50":
          "https://cdn.pixabay.com/photo/2023/09/02/11/53/woman-8228748_1280.jpg",
        "#FFD700":
          "https://cdn.pixabay.com/photo/2019/10/12/16/03/skirt-4544372_1280.jpg",
      },
      description: "Limited time offer for stylish summer skirts.",
      rating: 4.6,
    },
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // ✅ Add single product to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
      );

      if (exists) {
        return prevItems.map((item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }

      if (prevItems.length >= 10) {
        alert("You can only add up to 10 different items in your cart");
        return prevItems;
      }

      return [...prevItems, product];
    });
  };

  // ✅ Add multiple products (e.g., bulk add)
  const addMultipleToCart = (productsToAdd) => {
    setCartItems((prevItems) => {
      let updatedItems = [...prevItems];

      for (let product of productsToAdd) {
        const exists = updatedItems.find(
          (item) =>
            item.id === product.id &&
            item.size === product.size &&
            item.color === product.color
        );

        if (exists) {
          updatedItems = updatedItems.map((item) =>
            item.id === product.id &&
            item.size === product.size &&
            item.color === product.color
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );
        } else {
          if (updatedItems.length >= 10) {
            alert("Cart limit exceeded. Only 10 unique products allowed.");
            break;
          }
          updatedItems.push(product);
        }
      }

      return updatedItems;
    });
  };

  // ✅ Remove product from cart
  const removeFromCart = (id, size, color) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color)
      )
    );
  };

  // ✅ Place order
  const placeOrder = (product) => {
    setOrders((prev) => [...prev, product]);
  };

  // ✅ Manage shop products
  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((item) => item.id !== productId));
  };

  // ✅ Manage shop now products
  const addShopNowProduct = (newProduct) => {
    setShopNowProducts((prev) => [...prev, newProduct]);
  };

  const deleteShopNowProduct = (productId) => {
    setShopNowProducts((prev) => prev.filter((item) => item.id !== productId));
  };

  // ✅ Duplicate of placeOrder (if needed)
  const PlaceOrder = (product) => {
    setOrders((prev) => [...prev, product]);
  };

  return (
    <ProductContext.Provider
      value={{
        // Products
        products,
        addProduct,
        deleteProduct,

        // Shop now
        ShopNowProducts,
        setShopNowProducts,
        addShopNowProduct,
        deleteShopNowProduct,

        // Cart
        cartItems,
        setCartItems,
        addToCart,
        addMultipleToCart,
        removeFromCart,

        // Orders
        orders,
        setOrders,
        placeOrder,
        PlaceOrder,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
