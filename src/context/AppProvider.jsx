import { useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const isLogged = token !== null;

  const login = (username, password) => {
    axios
      .post("/api/user/login", { username, password })
      .then((res) => {
        setToken(res.data.token);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
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
