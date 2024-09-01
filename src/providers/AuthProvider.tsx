import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Alert } from "react-native";

// 2.Make type
type AuthData = {
  session: Session | null;
};

// 1.Initialize context
const AuthContext = createContext<AuthData>({
  session: null,
});

// 3.Generate function which can get other components as children
export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
      console.log(data);

      if (error) {
        Alert.alert(error.message);
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}
