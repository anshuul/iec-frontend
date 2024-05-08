"use client";

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import StudDimensionReportPopUp from "./StudDimensionReport/StudDimensionReportPopUp";
import NutDimensionReportPopup from "./NutDimensionReportPopup";
import StudDimensionForm from "./StudDimensionReport/StudDimensionForm";
import NutDimensionForm from "./NutDimensionReport/NutDimensionForm";
import axios from "axios";

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
    instrumentUsed: "",
    quantity: "",
  });
  const [nutInputValues, setNutInputValues] = useState({
    percentage: "",
    operatorName: "",
    instrumentUsed: "",
    quantity: "",
  });
  const [studSubmitted, setStudSubmitted] = useState(false);
  const [nutSubmitted, setNutSubmitted] = useState(false);
  const [parsedSelectedPO, setParsedSelectedPO] = useState(null);
  const [parsedRoutingSheet, setParsedRoutingSheet] = useState(null);
  const [dimensionReportResponse, setDimensionReportResponse] = useState(null);

  useEffect(() => {
    const selectedCustomerPO = localStorage.getItem("selectedCustomerPO");
    if (selectedCustomerPO) {
      setParsedSelectedPO(JSON.parse(selectedCustomerPO));
    }
  }, []);

  useEffect(() => {
    // Fetch and parse the selectedRoutingSheet data from localStorage
    const selectedRoutingSheet = localStorage.getItem("selectedRoutingSheet");
    if (selectedRoutingSheet) {
      setParsedRoutingSheet(JSON.parse(selectedRoutingSheet));
    }
  }, []);

  const handleStudInputChange = (e) => {
    const { name, value } = e.target;
    setStudInputValues({ ...studInputValues, [name]: value });
  };

  const handleNutInputChange = (e) => {
    const { name, value } = e.target;
    setNutInputValues({ ...nutInputValues, [name]: value });
  };

  const handleSubmit = async () => {
    if (showStudPopup) {
      // Handle Stud report submission
      setStudSubmitted(true);
      try {
        console.log("studInputValues in try", studInputValues);

        // Check if parsedSelectedPO has a valid quantity value
        if (!parsedSelectedPO || !parsedSelectedPO.quantity) {
          console.error("Error: No valid quantity found in parsedSelectedPO");
          return;
        }

        // Add quantity to studInputValues
        const newStudInputValues = {
          ...studInputValues,
          quantity: parsedSelectedPO.quantity,
        };
        console.log("newStudInputValues 1st", newStudInputValues);

        const response = await axios.post(
          "http://localhost:8000/api/dimensinReport/createDimensionReport",
          newStudInputValues // Use updated studInputValues
        );
        console.log(
          "Stud dimension report submitted successfully:",
          response.data
        );

        // Extract the ID from the response data
        const id = response.data._id;
        console.log("id in stud", id);

        // Fetch data using the retrieved ID
        const dimensionReportResponse = await axios.get(
          `http://localhost:8000/api/dimensinReport/${id}`
        );
        console.log(
          "Fetched dimension report data:",
          dimensionReportResponse.data
        );

        // Set the dimension report response data to state
        setDimensionReportResponse(dimensionReportResponse.data);

        // You may want to handle any success behavior here, such as updating state or showing a success message
      } catch (error) {
        console.error("Error submitting stud dimension report:", error);
        // You may want to handle any error behavior here, such as showing an error message to the user
      }
    } else if (showNutPopup) {
      // Handle Nut report submission
      setNutSubmitted(true);

      try {
        console.log("NutInputValues in try", nutInputValues);
        // Send an HTTP POST request to submit the stud data
        const response = await axios.post(
          "http://localhost:8000/api/dimensinReport/dimensionNut/createDimensionReportNut",
          nutInputValues
        );
        console.log(
          "Stud dimension report submitted successfully:",
          response.data
        );

        // Extract the ID from the response data
        const id = response.data._id;
        console.log("id in stud", id);

        // Fetch data using the retrieved ID
        const dimensionReportResponse = await axios.get(
          `http://localhost:8000/api/dimensinReport/dimensionNut/${id}`
        );
        console.log(
          "Nut Fetched dimension report data:",
          dimensionReportResponse.data
        );

        // Set the dimension report response data to state
        setDimensionReportResponse(dimensionReportResponse.data);

        // You may want to handle any success behavior here, such as updating state or showing a success message
      } catch (error) {
        console.error("Error submitting stud dimension report:", error);
        // You may want to handle any error behavior here, such as showing an error message to the user
      }
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
        totalLength: parsedSelectedPO?.POsize?.length?.value || "",
        goNoGoGauge: "Ok",
      },
    ];
  } else if (nutSubmitted) {
    rowData = [
      {
        itemNumber: "Nut",
        totalLength: parsedSelectedPO?.POsize?.length?.value || "",
        goNoGoGauge: "Ok",
      },
    ];
  }

  return (
    <div className="flex flex-col mx-4 h-[85vh] bg-white">
      <div className="flex justify-between items-center">
        {parsedRoutingSheet &&
        parsedRoutingSheet.RoutingSheets.startsWith("Stud") ? (
          <button
            className="m-4 bg-gray-300 px-4 py-2 rounded-lg"
            onClick={openStudPopup}
          >
            Get Stud Report
          </button>
        ) : (
          <button
            className="m-4 bg-gray-300 px-4 py-2 rounded-lg"
            onClick={openNutPopup}
          >
            Get Nut Report
          </button>
        )}
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
        <>
          {parsedRoutingSheet &&
          parsedRoutingSheet.RoutingSheets.startsWith("Stud") ? (
            <StudDimensionForm
              parsedSelectedPO={parsedSelectedPO}
              parsedRoutingSheet={parsedRoutingSheet}
              dimensionReportResponse={dimensionReportResponse}
            />
          ) : (
            <NutDimensionForm
              parsedSelectedPO={parsedSelectedPO}
              parsedRoutingSheet={parsedRoutingSheet}
              dimensionReportResponse={dimensionReportResponse}
            />
          )}
          <div className="ag-theme-alpine px-4 w-full h-[75vh]">
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}
              pagination={true}
              paginationPageSize={20}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DimensionReportHome;
