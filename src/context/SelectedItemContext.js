"use client";
import React, { createContext, useContext, useState } from "react";

// Step 1: Create a context
const SelectedItemContext = createContext();

// Step 2: Create a provider
export const SelectedItemProvider = ({ children }) => {
  const [selectedLink, setSelectedLink] = useState({
    href: "/production-planning/material-issue-slip",
    text: "Material Issue Slip",
  });

  const selectLink = (link) => {
    setSelectedLink(link); // Update selectedLink when a link is selected
  };

  // Step 3: Provide the state and actions to the components
  return (
    <SelectedItemContext.Provider value={{ selectedLink, selectLink }}>
      {children}
    </SelectedItemContext.Provider>
  );
};

// Step 4: Consume the context
export const useSelectedLink = () => useContext(SelectedItemContext);
