import { useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const isLogged = token !== null;

  const login = async (username, password) => {
    if (!username || !password) {
      return "Username and password are required.";
    }
    try {
      const res = await axios.post("/api/user/login", { username, password });
      setToken(res.data.token);
    } catch (e) {
      return e.response.data.message;
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AppContext.Provider value={{ token, login, logout, isLogged }}>
      {children}
    </AppContext.Provider>
  );
};
