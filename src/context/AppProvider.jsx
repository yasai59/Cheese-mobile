import { useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import { getData, removeData, storeData } from "../storage/storageManager";

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [tastes, setTastes] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [allTastes, setAllTastes] = useState([]);
  const [allRestrictions, setAllRestrictions] = useState([]);

  const isLogged = !!token;

  const login = async (username, password) => {
    if (!username || !password) {
      return "Username and password are required.";
    }
    try {
      const res = await axios.post("/api/user/login", { username, password });
      console.log(res.data);
      setUser(res.data.user);
      setToken(res.data.token);
      axios.defaults.headers.common["x-token"] = `${res.data.token}`;
      storeData("token", res.data.token);
      storeData("user", JSON.stringify(res.data.user));
    } catch (e) {
      return e.response.data.message;
    }
  };

  const loginLocal = async () => {
    getData("token").then(async (token) => {
      if (!token) return;
      axios.defaults.headers.common["x-token"] = `${token}`;
      const res = await axios.get("/api/user/myUser");
      setUser(res.data.user);
      setToken(token);
      const resTastes = await axios.get("/api/taste");
      setTastes(resTastes.data.tastes);
    });
  };

  const changeToken = (newToken) => {
    axios.defaults.headers.common["x-token"] = `${newToken}`;
    setToken(newToken);
  };

  const logout = () => {
    removeData("token");
    removeData("user");
    axios.defaults.headers.common["x-token"] = null;
    setToken(null);
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        token,
        login,
        user,
        setUser,
        logout,
        isLogged,
        changeToken,
        loginLocal,
        tastes,
        restrictions,
        setRestrictions,
        setTastes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
