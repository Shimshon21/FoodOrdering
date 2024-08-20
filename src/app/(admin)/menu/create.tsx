import Button from "@/components/Button";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import defaultPizzaImage from "@components/ProductListItem";
import Colors from "@/constants/Colors";

const CreateProductsScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [errors, setErrors] = useState("");

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const validateInput = () => {
    if (!name) {
      setErrors("Name is required");
      return false;
    }

    if (!price) {
      setErrors("Price is required");
      return false;
    }

    if (isNaN(parseFloat(price))) {
      setErrors("Price is not a number");
      return false;
    }

    return true;
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    console.warn("Creating product", name, price);
    resetFields();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: defaultPizzaImage }} style = {styles.image} />
      <Text style = {styles.te}

      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="decimal-pad"
      />

      <Text style={{ color: "red" }}>{errors}</Text>
      <Button text="Create" onPress={onCreate}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  image: {
    aspectRatio: 1,
    width: "50%",
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
});

export default CreateProductsScreen;
