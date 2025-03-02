import React, { useContext, useEffect, useState } from "react";
import { signOut, signUp } from "./services/auth";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  const [destination, setDestination] = useState(null);

  const [score, setScore] = useState(0);

  const signout = () => {
    signOut();
    setIsUserSignedIn(false);
  };

  const signup = async (username, password) => {
    await signUp(username, password);
    setIsUserSignedIn(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsUserSignedIn(true);
    }
  }, [isUserSignedIn]);

  return (
    <AuthContext.Provider
      value={{
        isUserSignedIn,
        signup,
        signout,
        setDestination,
        destination,
        score,
        setScore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
