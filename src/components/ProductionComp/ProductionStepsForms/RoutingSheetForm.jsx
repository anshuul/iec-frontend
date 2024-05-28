"use client";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FiArrowLeft, FiFile, FiPrinter, FiSave } from "react-icons/fi";
import { TiPlus } from "react-icons/ti";

import { useRouter } from "next/navigation";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";

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
  const [selectedFile, setSelectedFile] = useState(null);

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
    console.log("newRowData", newRowData);
    setRowData([...rowData, newRowData]);
    setNewRow(newRowData);
  };

  const saveData = async () => {
    try {
      const selectedCustomerPODataForpoNo = JSON.parse(
        localStorage.getItem("selectedCustomerPO")
      );
      // Create a FormData object
      const formData = new FormData();
      formData.append("poNo", selectedCustomerPODataForpoNo.poNo);

      // Append the new row data to the FormData object
      Object.entries(newRow).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append the selected file to the FormData object
      if (selectedFile) {
        formData.append("attachment", selectedFile);
      }

      // Send the FormData object to the server
      await axios.post(
        "http://localhost:8000/api/routingSheet/create-routingSheet",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );
      console.log("Data saved successfully");
      router.push("/production/routing-sheet");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      // Optionally, you can display an error message or perform other actions here
      setSelectedFile(null);
      alert("Please select a PDF file.");
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
    // { headerName: "Date", field: "date", editable: true },
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
        <TiPlus className="mr-2" />
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

      <div className="flex justify-between max-w-screen-full mx-4 mb-4">
        <div className="flex items-center">
          <input
            type="file"
            id="attachment"
            className="hidden"
            name="attachment"
            accept="application/pdf"
            onChange={handleFileSelection}
          />
          <button
            onClick={() => document.getElementById("attachment").click()}
            className="flex items-center px-4 py-2 mr-4 text-black bg-gray-300 rounded"
          >
            Attachment
            <FiFile className="ml-2" />
          </button>
          {selectedFile && (
            <div className="flex items-center">
              <span className="mr-2">
                {selectedFile.name || selectedFile.fileName}
              </span>
              <button
                onClick={() => setSelectedFile(null)}
                className="flex items-center text-red-600 bg-none"
              >
                <IoIosCloseCircleOutline className="ml-2 text-2xl" />
              </button>
            </div>
          )}
        </div>

        <div className="flex">
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
    </div>
  );
};

export default RoutingSheetForm;
