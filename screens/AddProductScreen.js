import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { useProducts } from "../context/ProductContext";

const AddProductScreen = () => {
  const { addProduct } = useProducts();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = () => {
    addProduct({
      id: Date.now().toString(),
      name,
      price: 3999,
      size: ["S", "M", "L"],
      colors: ["#000", "#fff"],
      image,
      reviews: [],
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />
      <Button title="Add Product" onPress={handleAdd} />
    </View>
  );
};

export default AddProductScreen;
