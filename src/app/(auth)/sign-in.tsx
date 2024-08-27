import Button from "@/components/Button";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import Colors from "@/constants/Colors";

const SignInScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPasswword] = useState("");

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />
			<Text style={styles.label}>Email</Text>
			<TextInput
				value={email}
				placeholder="name@gamil.com"
				style={styles.input}
				onChangeText={setEmail}
			/>
			<Text style={styles.label}>Password</Text>
			<TextInput
				value={password}
				placeholder=""
				style={styles.input}
				onChangeText={setPasswword}
			/>
			<Link href="/(admin)/" asChild>
				<Button text="Button"></Button>
			</Link>
			<Link href="/(auth)/sign-up" asChild>
				<Text style={styles.navText}>Create an account</Text>
			</Link>
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
		borderColor: "grey",
		borderWidth: 1,
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
		marginHorizontal: 20,
	},
});

export default SignInScreen;