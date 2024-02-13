import { useState } from "react";
import { AppContext } from "./AppContext";

export const AppProvider = ({ children }) => {
  const token = useState(token);

  return (
    <AppContext.Provider value={{ token }}>{children}</AppContext.Provider>
  );
};
