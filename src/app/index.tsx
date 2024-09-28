import { View, Text } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabase";

const index = () => {
	const { session, loading, isAdmin } = useAuth();

	function signOut() {
		supabase.auth.signOut();
	}

	console.log(session);

	if (loading) {
		return <ActivityIndicator />;
	}

	if (!session) {
		console.log("Redirect to sign in from main page");
		return <Redirect href={"/sign-in"} />;
	}

	if (!isAdmin) {
		console.log("Redirect to user");
		return <Redirect href={"/(user)"} />;
	}

	return <Redirect href={"/(admin)"} />;
};

export default index;
