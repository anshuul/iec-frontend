"use client";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FiArrowLeft, FiPrinter, FiSave } from "react-icons/fi";
import { useRouter } from "next/navigation";

const DimensionReportForm = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  const [productionSheetName, setProductionSheetName] =
    useState("Default Dimension");
  const [rowData, setRowData] = useState([
    {
      srNo: 1,
      date: "2024-04-03",
      operatorName: "John Doe",
      machineNo: "M123",
      processDescription: "Some description",
      procedureNo: "PROC123",
      orderQty: 10,
      processQty: 8,
      startTime: "08:00 AM",
      endTime: "12:00 PM",
      optSign: "Signed",
      remarks: "Some remarks",
    },
    {
      srNo: 2,
      date: "2024-04-04",
      operatorName: "Jane Smith",
      machineNo: "M456",
      processDescription: "Another description",
      procedureNo: "PROC456",
      orderQty: 15,
      processQty: 12,
      startTime: "09:00 AM",
      endTime: "01:00 PM",
      optSign: "Not signed",
      remarks: "Additional remarks",
    },
  ]);

  const handleCellValueChanged = (event) => {
    const updatedRowData = [...rowData];
    updatedRowData[event.rowIndex] = event.data;
    setRowData(updatedRowData);
  };

  const handleSave = () => {
    console.log("Updated Row Data:", rowData);
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

      <hr className="my-4 border-t border-gray-300" />

      <div className="flex items-center mb-4 mx-4">
        <label className="relative cursor-pointer App">
          <input
            type="text"
            placeholder="Input"
            value={productionSheetName}
            onChange={(e) => setProductionSheetName(e.target.value)}
            className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
          />
          <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
            Enter Dimension
          </span>
        </label>
      </div>

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
      <div className="flex justify-end max-w-screen-full mx-4 mb-4">
        <button
          onClick={handleSave}
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

export default DimensionReportForm;
