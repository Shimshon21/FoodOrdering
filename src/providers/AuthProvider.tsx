import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Redirect } from "expo-router";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import { ActivityIndicator, Alert } from "react-native";

// 2.Make type
type AuthData = {
	session: Session | null;
	profile: any;
	loading: Boolean;
	isAdmin: boolean;
};

// 1.Initialize context
const AuthContext = createContext<AuthData>({
	session: null,
	profile: null,
	loading: true,
	isAdmin: false,
});

// 3.Generate function which can get other components as children
export default function AuthProvider({ children }: PropsWithChildren) {
	const [session, setSession] = useState<Session | null>(null);
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSession = async () => {
			const {
				data: { session },
				error,
			} = await supabase.auth.getSession();
			setSession(session);

			if (session) {
				// fetch profile
				const { data } = await supabase
					.from("profiles") // Get from profiles table
					.select("*") // Select all the fields
					.eq("id", session.user.id)
					.single();
				setProfile(data || null);
			}

			setLoading(false);

			if (error) {
				Alert.alert(error.message);
			}
		};

		fetchSession();
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	console.log("Profile!!!!");
	console.log(profile);

	return (
		<AuthContext.Provider
			value={{ session, loading, profile, isAdmin: profile?.group == "ADMIN" }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
