"use client";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FiArrowLeft, FiPrinter, FiSave } from "react-icons/fi";
import { TiPlus } from "react-icons/ti";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const RoutingSheetFormUpdate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const handleGoBack = () => {
    router.back();
  };

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/routingSheet/get-routingSheetById/${id}`
        );
        const responseData = Array.isArray(response.data)
          ? response.data
          : [response.data];

        setRowData(responseData[0]?.processRows || []); // Update rowData with processRows data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddRow = () => {
    const newRowData = {
      srNo: rowData.length + 1,
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
      poNo: "",
      routingSheetNumber: 0,
      processRowNumber: rowData.length + 1, // Update processRowNumber
    };
    setRowData([...rowData, newRowData]);
  };

  const columnDefs = [
    { headerName: "Sr No", field: "processRowNumber" },
    { headerName: "Date", field: "date", editable: true },
    { headerName: "Operator Name/Supplier", field: "operatorName", editable: true },
    { headerName: "Machine No/Instrument No", field: "machineNo", editable: true },
    { headerName: "PROCESS DESCRIPTION", field: "processDescription", editable: true },
    { headerName: "PROCEDURE NO/DRAWING NO/REPORT NO.", field: "procedureNo", editable: true },
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
        className="flex items-center px-4 py-2 mb-2 text-lg font-bold text-black"
      >
        <FiArrowLeft className="mr-2" />
        Back
      </button>
      <button
        onClick={handleAddRow}
        className="flex items-center px-4 py-2 mb-2 text-lg font-bold text-black"
      >
        <TiPlus className="mr-2" />
        Add Row
      </button>
      <div className="ag-theme-alpine px-4 w-full h-[75vh]">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          paginationPageSize={15}
        />
      </div>
      <hr className="my-4 border-t border-gray-300" />
      <div className="flex justify-end mx-4 max-w-screen-full">
        <button className="flex items-center px-4 py-2 mr-4 text-black bg-gray-300 rounded">
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

export default RoutingSheetFormUpdate;
