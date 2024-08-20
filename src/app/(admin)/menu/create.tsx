import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Colors from "@/constants/Colors";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const CreateProductsScreen = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [errors, setErrors] = useState("");
	const [image, setImage] = useState<string | null>(null);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.5,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: image || defaultPizzaImage }}
				style={styles.image}
				resizeMode="contain"
			/>
			<Text onPress={pickImage} style={styles.textButton}>
				Select Image
			</Text>

			<Text style={styles.label}>Name</Text>
			<TextInput placeholder="Name" style={styles.input} />

			<Text style={styles.label}>Price</Text>
			<TextInput
				placeholder="Price"
				style={styles.input}
				keyboardType="decimal-pad"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 10,
	},
	image: {
		aspectRatio: 1,
		width: "50%",
		alignSelf: "center",
	},
	textButton: {
		alignSelf: "center",
		fontWeight: "bold",
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

	label: {
		color: "gray",
		fontSize: 16,
	},
});

export default CreateProductsScreen;
