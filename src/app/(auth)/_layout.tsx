import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthStack() {
	const session = useAuth().session;

	if (session) {
		return <Redirect href={"/"} />;
	}

	return (
		<Stack>
			{/* <Stack.Screen name="/src/app/(auth)" options={{ headerShown: false }} /> */}
		</Stack>
	);
}
