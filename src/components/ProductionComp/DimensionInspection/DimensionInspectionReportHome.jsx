"use client";

import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import StudDimensionReportPopUp from "./StudDimensionReportPopUp";
import NutDimensionReportPopup from "./NutDimensionReportPopup";

const DimensionReportHome = () => {
  const [showStudPopup, setShowStudPopup] = useState(false);
  const [showNutPopup, setShowNutPopup] = useState(false);
  const [studInputValues, setStudInputValues] = useState({
    percentage: "",
    tolerancemin: "",
    tolerancemax: "",
    studstartvalue: "",
    studendvalue: "",
    operatorName: "",
    instrucmentUsed: "",
  });
  const [nutInputValues, setNutInputValues] = useState({
    percentage: "",
    operatorName: "",
    instrucmentUsed: "",
  });
  const [studSubmitted, setStudSubmitted] = useState(false);
  const [nutSubmitted, setNutSubmitted] = useState(false);

  const handleStudInputChange = (e) => {
    const { name, value } = e.target;
    setStudInputValues({ ...studInputValues, [name]: value });
  };

  const handleNutInputChange = (e) => {
    const { name, value } = e.target;
    setNutInputValues({ ...nutInputValues, [name]: value });
  };

  const handleSubmit = () => {
    if (showStudPopup) {
      // Handle Stud report submission
      setStudSubmitted(true);
    } else if (showNutPopup) {
      // Handle Nut report submission
      setNutSubmitted(true);
    }

    // Close the popups
    setShowStudPopup(false);
    setShowNutPopup(false);
  };

  const closeStudPopup = () => {
    setShowStudPopup(false);
  };

  const closeNutPopup = () => {
    setShowNutPopup(false);
  };

  const openStudPopup = () => {
    setShowStudPopup(true);
    setStudSubmitted(false);
  };

  const openNutPopup = () => {
    setShowNutPopup(true);
    setNutSubmitted(false);
  };

  const columnDefs = [
    { headerName: "Item Number", field: "itemNumber", flex: 1 },
    { headerName: "Total Length", field: "totalLength", flex: 1 },
    { headerName: "Go / No Go Gauge", field: "goNoGoGauge", flex: 1 },
  ];

  let rowData = [];
  if (studSubmitted) {
    rowData = [
      {
        itemNumber: "Stud",
        totalLength:
          parseFloat(studInputValues.studstartvalue) +
          parseFloat(studInputValues.studendvalue),
        goNoGoGauge: "Ok",
      },
    ];
  } else if (nutSubmitted) {
    rowData = [
      {
        itemNumber: "Nut",
        totalLength: "",
        goNoGoGauge: "Ok",
      },
    ];
  }

  // Check if there's a selected customer PO in localStorage
  const selectedRoutingSheet = localStorage.getItem("selectedRoutingSheet");
  console.log("selectedRoutingSheet in dimension report", selectedRoutingSheet);

  return (
    <div className="flex flex-col mx-4 h-[85vh] bg-white">
      <div className="flex justify-between items-center">
        <button
          className="m-4 bg-gray-300 px-4 py-2 rounded-lg"
          onClick={openStudPopup}
        >
          Get Stud Report
        </button>
        <button
          className="m-4 bg-gray-300 px-4 py-2 rounded-lg"
          onClick={openNutPopup}
        >
          Get Nut Report
        </button>
      </div>
      {showStudPopup && (
        <StudDimensionReportPopUp
          showPopup={showStudPopup}
          inputValues={studInputValues}
          handleInputChange={handleStudInputChange}
          handleSubmit={handleSubmit}
          closePopup={closeStudPopup}
        />
      )}
      {showNutPopup && (
        <NutDimensionReportPopup
          showPopup={showNutPopup}
          inputValues={nutInputValues}
          handleInputChange={handleNutInputChange}
          handleSubmit={handleSubmit}
          closePopup={closeNutPopup}
        />
      )}
      {rowData.length > 0 && (
        <div className="ag-theme-alpine px-4 w-full h-[75vh]">
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            pagination={true}
            paginationPageSize={20}
          />
        </div>
      )}
    </div>
  );
};

export default DimensionReportHome;
