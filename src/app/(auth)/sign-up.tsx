import Button from "@/components/Button";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Stack } from "expo-router";
import { useState } from "react";
import Colors from "@/constants/Colors";

const SignUpScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPasswword] = useState("");

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "product.name" }} />
			<Text style={styles.label}>Email</Text>
			<TextInput
				value={email}
				placeholder="name@gamil.com"
				style={styles.input}
				onChangeText={setEmail}
			/>
			<Text style={styles.label}>Password</Text>
			<TextInput
				value={email}
				placeholder="name@gamil.com"
				style={styles.input}
				onChangeText={setPasswword}
			/>
			<Button
				text="Button"
				onPress={() => {
					console.log("");
				}}
			></Button>
			<Text style={styles.navText}>Sign in dasdasdas</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5,
		marginTop: 5,
		marginBottom: 20,
	},
	label: {
		color: "grey",
	},
	navText: {
		color: Colors.light.tint,
		marginTop: 10,
		alignSelf: "center",
	},
	container: {
		flex: 1,
		justifyContent: "center",
		marginHorizontal: 10,
	},
});

export default SignUpScreen;
