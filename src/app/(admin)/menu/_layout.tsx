import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {
	return (
		<Stack
			screenOptions={{
				headerRight: () => (
					<Link href="/(admin)/menu/create" asChild>
						<Pressable>
							{({ pressed }) => (
								<FontAwesome
									name="plus-square-o"
									size={25}
									color={Colors.light.tint}
									style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
								/>
							)}
						</Pressable>
					</Link>
				),
				headerLeft: () => (
					<Pressable
						onPress={() => {
							supabase.auth.signOut();
						}}
					>
						{({ pressed }) => (
							<FontAwesome
								name="sign-out"
								size={25}
								color={Colors.light.tint}
								style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
							/>
						)}
					</Pressable>
				),
			}}
		></Stack>
	);
}
