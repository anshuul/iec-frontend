"use client";
import React, { createContext, useContext, useState } from "react";

const SelectedItemContext = createContext();

export const SelectedItemProvider = ({ children }) => {
  const [selectedLink, setSelectedLink] = useState({
    href: "",
    text: "",
  });

  const selectLink = (link) => {
    setSelectedLink(link);
  };

  return (
    <SelectedItemContext.Provider value={{ selectedLink, selectLink }}>
      {children}
    </SelectedItemContext.Provider>
  );
};

export const useSelectedLink = () => useContext(SelectedItemContext);
