import { useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import { removeData, storeData } from "../storage/storageManager";

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
      axios.defaults.headers.common["x-token"] = `${res.data.token}`;
      storeData("token", res.data.token);
    } catch (e) {
      return e.response.data.message;
    }
  };

  const changeToken = (newToken) => {
    axios.defaults.headers.common["x-token"] = `${newToken}`;
    setToken(newToken);
  };

  const logout = () => {
    removeData("token");
    axios.defaults.headers.common["x-token"] = null;
    setToken(null);
  };

  return (
    <AppContext.Provider
      value={{ token, login, logout, isLogged, changeToken }}
    >
      {children}
    </AppContext.Provider>
  );
};
