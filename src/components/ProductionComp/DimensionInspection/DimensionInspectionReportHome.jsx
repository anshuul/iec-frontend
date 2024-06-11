"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import StudDimensionReportPopUp from "./StudDimensionReport/StudDimensionReportPopUp";
import StudDimensionForm from "./StudDimensionReport/StudDimensionForm";
import NutDimensionForm from "./NutDimensionReport/NutDimensionForm";
import { FiPrinter } from "react-icons/fi";
import DimensionInspection from "@/components/PDF/DimensionInspection/DimensionInspection";
import DimensionInspectionNut from "@/components/PDF/DimensionInspection/DimensionInspectionNut";
import DimensionInspectionStud from "@/components/PDF/DimensionInspection/DimensionInspectionStud";
import DimensionInspectionFirstNut from "@/components/PDF/DimensionInspection/DimensionInspectionFirstNut";
import {
  Document,
  PDFDownloadLink,
  Page,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import NutDimensionReportPopup from "./NutDimensionReportPopUp";
import Link from "next/link";
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
  section: {
    margin: 10,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    fontSize: 12,
    marginBottom: 50,
  },
});

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
  const [dimensionReportResponseForNut, setDimensionReportResponseForNut] =
    useState(null);

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

        // Check if parsedSelectedPO has a valid length value
        if (!parsedSelectedPO || !parsedSelectedPO.POsize?.length?.value) {
          console.error("Error: No valid quantity found in parsedSelectedPO");
          return;
        }

        // Add quantity to studInputValues
        const newStudInputValues = {
          ...studInputValues,
          quantity: parsedSelectedPO.quantity,
          length: parsedSelectedPO.POsize?.length?.value,
        };
        console.log("newStudInputValues 1st", newStudInputValues);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dimensinReport/createDimensionReport`,
          newStudInputValues
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dimensinReport/${id}`
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

        // Check if parsedSelectedPO has a valid quantity value
        if (!parsedSelectedPO || !parsedSelectedPO.quantity) {
          console.error("Error: No valid quantity found in parsedSelectedPO");
          return;
        }

        // Check if parsedSelectedPO has a valid length value
        if (!parsedSelectedPO || !parsedSelectedPO.POsize?.length?.value) {
          console.error("Error: No valid quantity found in parsedSelectedPO");
          return;
        }

        // Check if parsedSelectedPO has a valid diameter value
        if (!parsedSelectedPO || !parsedSelectedPO.POsize?.diameter?.value) {
          console.error("Error: No valid quantity found in parsedSelectedPO");
          return;
        }
        if (
          !parsedSelectedPO ||
          !parsedSelectedPO.POsize?.diameter?.dimension
        ) {
          console.error("Error: No valid quantity found in parsedSelectedPO");
          return;
        }

        const newNutInputValues = {
          ...nutInputValues,
          quantity: parsedSelectedPO.quantity,
          length: parsedSelectedPO.POsize?.length?.value,
          diameter: parsedSelectedPO.POsize?.diameter?.value,
          dimension: parsedSelectedPO.POsize?.diameter?.dimension,
        };
        console.log("newNutInputValues", newNutInputValues);

        // Send an HTTP POST request to submit the stud data
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dimensinReport/dimensionNut/createDimensionReportNut`,
          newNutInputValues
        );
        console.log(
          "Stud dimension report submitted successfully:",
          response.data
        );

        // Extract the ID from the response data
        const id = response.data._id;
        console.log("id in stud", id);

        // Fetch data using the retrieved ID
        const dimensionReportResponseForNut = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dimensinReport/dimensionNut/${id}`
        );
        console.log(
          "Nut Fetched dimension report data:",
          dimensionReportResponseForNut.data
        );

        // Set the dimension report response data to state
        setDimensionReportResponseForNut(dimensionReportResponseForNut.data);
      } catch (error) {
        console.error("Error submitting stud dimension report:", error);
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

  let columnDefs = [];
  let rowData = [];
  if (studSubmitted && dimensionReportResponse) {
    // Update columnDefs for Stud report
    columnDefs = [
      { headerName: "Item Number", field: "itemNumber", flex: 1 },
      { headerName: "Total Length", field: "totalLength", flex: 1 },
      { headerName: "Go / No Go Gauge", field: "goNoGoGauge", flex: 1 },
    ];

    // Update rowData with formatted data
    rowData = dimensionReportResponse.observationValues.map((value, index) => {
      const formattedValue = value.toFixed(2).padEnd(5, "0");
      return {
        itemNumber: `${index + 1}`,
        totalLength: formattedValue,
        goNoGoGauge: "Ok",
      };
    });
  } else if (nutSubmitted && dimensionReportResponseForNut) {
    // Update columnDefs for Nut report
    columnDefs = [
      { headerName: "Item Number", field: "itemNumber", flex: 1 },
      { headerName: "Across Flat", field: "af", flex: 1 },
      { headerName: "Across Cross", field: "ac", flex: 1 },
      { headerName: "Nut Thickness", field: "nutthickness", flex: 1 },
      { headerName: "Go / No Go Gauge", field: "goNoGoGauge", flex: 1 },
    ];

    const { AC, AF, NUT_THICKNESS } =
      dimensionReportResponseForNut.observationValuesNut;
    // Get the percentage from the response
    const { percentage } = dimensionReportResponseForNut;

    for (let i = 0; i < percentage; i++) {
      rowData.push({
        itemNumber: `${i + 1}`,
        af: AF[i],
        ac: AC[i],
        nutthickness: NUT_THICKNESS[i],
        goNoGoGauge: "Ok",
      });
    }
  }

  return (
    <div className="flex flex-col mx-4 h-[85vh] bg-white">
      {/* <div className="flex items-center justify-between">
        {parsedRoutingSheet &&
          parsedRoutingSheet.RoutingSheets.startsWith("Stud") ? (
          <button
            className="px-4 py-2 m-4 bg-gray-300 rounded-lg"
            onClick={openStudPopup}
          >
            Get Stud Report
          </button>
        ) : (
          <button
            className="px-4 py-2 m-4 bg-gray-300 rounded-lg"
            onClick={openNutPopup}
          >
            Get Nut Report
          </button>
        )}
      </div> */}

      <div className="flex items-center justify-between">
        {parsedRoutingSheet ? (
          parsedRoutingSheet.RoutingSheets.startsWith("Stud") ? (
            <button
              className="px-4 py-2 m-4 bg-gray-300 rounded-lg"
              onClick={openStudPopup}
            >
              Get Stud Report
            </button>
          ) : (
            <button
              className="px-4 py-2 m-4 bg-gray-300 rounded-lg"
              onClick={openNutPopup}
            >
              Get Nut Report
            </button>
          )
        ) : (
          <Link href={"/production/routing-sheet"}>
            <p className="px-4 py-2 m-4 bg-red-200 text-red-700 font-bold rounded-lg">Please select a routing sheet</p>
          </Link>
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
              dimensionReportResponseForNut={dimensionReportResponseForNut}
            />
          )}
          <div className="ag-theme-alpine px-4 w-full h-[75vh]">
            <AgGridReact columnDefs={columnDefs} rowData={rowData} />
          </div>
          <hr className="my-4 border-t border-gray-300" />
          <div className="flex justify-end mx-4 my-6">
            {parsedRoutingSheet &&
              parsedRoutingSheet.RoutingSheets.startsWith("Stud") ? (
              <PDFDownloadLink
                document={
                  <Document>
                    <Page
                      size="A4"
                      style={styles.page}
                      orientation="landscape"
                      wrap
                    >
                      <DimensionInspection data={dimensionReportResponse} />
                    </Page>
                    <Page size="A4" style={styles.page} wrap>
                      <DimensionInspectionStud data={dimensionReportResponse} />
                    </Page>
                  </Document>
                }
                fileName={`DimensionInspectionStud_${dimensionReportResponse?._id}.pdf`}
              >
                <button
                  className="flex items-center px-4 py-2 text-black bg-gray-300 rounded"
                  onClick={() => console.log(dimensionReportResponse)}
                >
                  Print
                  <FiPrinter className="ml-2" />
                </button>
              </PDFDownloadLink>
            ) : (
              <PDFDownloadLink
                document={
                  <Document>
                    <Page
                      size="A4"
                      style={styles.page}
                      orientation="landscape"
                      wrap
                    >
                      <DimensionInspectionFirstNut
                        data={dimensionReportResponseForNut}
                      />
                    </Page>
                    <Page size="A4" style={styles.page} wrap>
                      <DimensionInspectionNut
                        data={dimensionReportResponseForNut}
                      />
                    </Page>
                  </Document>
                }
                fileName={`DimensionInspectionNut_${dimensionReportResponseForNut?._id}.pdf`}
              >
                <button
                  className="flex items-center px-4 py-2 text-black bg-gray-300 rounded"
                  onClick={() => console.log(dimensionReportResponseForNut)}
                >
                  Print
                  <FiPrinter className="ml-2" />
                </button>
              </PDFDownloadLink>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DimensionReportHome;
