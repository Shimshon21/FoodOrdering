import Button from "@/components/Button";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPasswword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    console.warn("Sign in");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign In" }} />
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
        secureTextEntry
      />
      <Button
        onPress={signInWithEmail}
        disabled={loading}
        text={loading ? "Sign In..." : "Sign In"}
      ></Button>
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
