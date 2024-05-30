"use client";
import React, { createContext, useContext, useState } from "react";

const SelectedItemQuantityContext = createContext();

export const SelectedItemQuantityProvider = ({ children }) => {
  const [selectedLink, setSelectedLink] = useState({
    href: "",
    text: "",
  });

  const selectLink = (link) => {
    setSelectedLink(link);
  };

  return (
    <SelectedItemQuantityContext.Provider value={{ selectedLink, selectLink }}>
      {children}
    </SelectedItemQuantityContext.Provider>
  );
};

export const useSelectedLink = () => useContext(SelectedItemQuantityContext);
