import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Fetch user data synchronously when the component mounts
    async function fetchUserData() {
        const { data } = await axios.get("/profile");
        setUser(data);
        setReady(true);
    }

    fetchUserData();
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

