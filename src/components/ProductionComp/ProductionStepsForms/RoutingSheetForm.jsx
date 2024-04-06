"use client";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FiArrowLeft, FiPrinter, FiSave } from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";

const RoutingSheetForm = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const [rowData, setRowData] = useState([]);
  const [newRow, setNewRow] = useState({
    date: "",
    operatorName: "",
    machineNo: "",
    processDescription: "",
    procedureNo: "",
    orderQty: 0,
    processQty: 0,
    startTime: "",
    endTime: "",
    optSign: "",
    remarks: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/routingSheet"
        );
        const dataWithSrNo = response.data.map((row, index) => ({
          ...row,
          srNo: index + 1, // Add srNo starting from 1
        }));
        setRowData(dataWithSrNo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCellValueChanged = (event) => {
    const updatedRowData = [...rowData];
    updatedRowData[event.rowIndex] = event.data;
    setRowData(updatedRowData);
  };

  const handleAddRow = () => {
    const newRowData = {
      ...newRow,
      srNo: rowData.length + 1,
      remarks: "-",
    };
    console.log("newRowData", newRowData)
    setRowData([...rowData, newRowData]);
    setNewRow(newRowData);
  };
  

  const saveData = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/routingSheet/create-routingSheet",
        newRow // Send only the newly added row data
      );
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const columnDefs = [
    {
      headerName: "Sr No",
      field: "srNo",
      editable: false,
      minWidth: 50,
      maxWidth: 80,
    },
    { headerName: "Date", field: "date", editable: true },
    {
      headerName: "Operator Name/Supplier",
      field: "operatorName",
      editable: true,
    },
    {
      headerName: "Machine No/Instrument No",
      field: "machineNo",
      editable: true,
    },
    {
      headerName: "PROCESS DESCRIPTION",
      field: "processDescription",
      editable: true,
    },
    {
      headerName: "PROCEDURE NO/DRAWING NO/REPORT NO.",
      field: "procedureNo",
      editable: true,
    },
    { headerName: "ORDER QTY", field: "orderQty", editable: true },
    { headerName: "PROCESS QTY", field: "processQty", editable: true },
    { headerName: "START TIME", field: "startTime", editable: true },
    { headerName: "END TIME", field: "endTime", editable: true },
    { headerName: "OPT SIGN", field: "optSign", editable: true },
    { headerName: "REMARKS", field: "remarks", editable: true },
  ];

  return (
    <div className="flex flex-col mx-4 bg-white">
      <button
        onClick={handleGoBack}
        className="flex items-center mb-2 px-4 py-2 text-lg font-bold text-black"
      >
        <FiArrowLeft className="mr-2" />
        Back
      </button>
      <button
        onClick={handleAddRow}
        className="flex items-center mb-2 px-4 py-2 text-lg font-bold text-black"
      >
        <FiArrowLeft className="mr-2" />
        Add
      </button>
      <div className="ag-theme-alpine px-4 w-full h-[75vh]">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          paginationPageSize={10}
          onCellValueChanged={handleCellValueChanged}
        />
      </div>
      <hr className="my-4 border-t border-gray-300" />
      {/* <Container> */}
      <div className="flex justify-end max-w-screen-full mx-4">
        <button
          onClick={saveData}
          className="flex items-center px-4 py-2 mr-4 text-black bg-gray-300 rounded"
        >
          Save
          <FiSave className="ml-2" />
        </button>
        <button className="flex items-center px-4 py-2 text-black bg-gray-300 rounded">
          Print
          <FiPrinter className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default RoutingSheetForm;
