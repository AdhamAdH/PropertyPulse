"use client";
import { createContext, useContext, useState } from "react";

//Create Context
const GlobalContext = createContext();

//Create Provider
export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

//Create Custom Hook To Access Context
export function useGlobalContext() {
  return useContext(GlobalContext);
}
