import { View, Text } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabase";

const index = () => {
  const { session, loading, profile, isAdmin } = useAuth();

  console.log(session);
  console.log("Profile logged in", profile);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    console.log("Redirect to sign in from main page");
    return <Redirect href={"/sign-in"} />;
  }

  if (!profile) {
    console.log("Profile is undefined");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (isAdmin) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
        <Link href={"/(user)"} asChild>
          <Button text="User" />
        </Link>
        <Link href={"/(admin)"} asChild>
          <Button text="Admin" />
        </Link>
      </View>
    );
  }

  console.log("Redirect to user from main page", profile?.group);

  return <Redirect href="/(user)" />;
};

export default index;
