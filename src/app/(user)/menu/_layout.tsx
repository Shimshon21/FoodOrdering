import Colors from "@/constants/Colors";
import colorScheme from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import { supabase } from "@/lib/supabase";

export default function MenuStack() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
		
          </Link>
        ),
        // headerLeft: () => (
        //   <Pressable
        //     onPress={() => {
        //       supabase.auth.signOut();
        //     }}
        //   >
        //     {({ pressed }) => (
        //       <FontAwesome
        //         name="sign-out"
        //         size={25}
        //         color={Colors.light.tint}
        //         style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
        //       />
        //     )}
        //   </Pressable>
        // ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Menu" }} />
    </Stack>
  );
}
