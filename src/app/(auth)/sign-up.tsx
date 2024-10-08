import Button from "@/components/Button";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPasswword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    console.warn("Sign Up");
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    console.log({ error });
    if (error) Alert.alert(error.message);

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign Up" }} />
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
        text={loading ? "Creating Account..." : "Create Account"}
        disabled={loading}
        onPress={() => {
          signUpWithEmail();
        }}
      ></Button>
      <Link href="/(auth)/sign-in" asChild>
        <Text style={styles.navText}>Sign in</Text>
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

export default SignUpScreen;
