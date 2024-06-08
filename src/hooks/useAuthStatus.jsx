import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    console.log("Auth:", auth); // Log auth object to verify initialization
    onAuthStateChanged(auth, (user) => {
      console.log("User:", user); // Log user object to check user status
      if (user) {
        setLoggedIn(true);
      }
      setCheckingStatus(false);
    });
  }, []);

  return { loggedIn, checkingStatus };
}
