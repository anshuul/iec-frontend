"use client";

import { useState, useEffect } from "react";

const Quality = () => {
  // Initialize the state from localStorage, defaulting to "API" if not present
  const [isChecked, setIsChecked] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("qualityModuleType") === "NON API";
    }
    return false;
  });

  const handleCheckboxChange = () => {
    setIsChecked((prevIsChecked) => {
      const newIsChecked = !prevIsChecked;
      const quality = newIsChecked ? "NON API" : "API";
      localStorage.setItem("qualityModuleType", quality); // Save to localStorage
      return newIsChecked;
    });
  };

  useEffect(() => {
    // Initialize the state from localStorage when component mounts
    const savedQuality = localStorage.getItem("qualityModuleType");
    if (savedQuality === null) {
      localStorage.setItem("qualityModuleType", "API");
      setIsChecked(false);
    } else {
      setIsChecked(savedQuality === "NON API");
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-[75vh]">
      <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex items-center justify-center w-24 space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${!isChecked ? 'text-primary bg-blue-300' : 'text-body-color'
            }`}
        >
          API
        </span>
        <span
          className={`flex items-center justify-center w-24 space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${isChecked ? 'text-primary bg-blue-300' : 'text-body-color'
            }`}
        >
          NON API
        </span>
      </label>
    </div>
  );
};

export default Quality;
