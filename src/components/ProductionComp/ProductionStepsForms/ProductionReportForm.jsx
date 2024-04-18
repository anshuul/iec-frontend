"use client";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FiArrowLeft, FiPrinter, FiSave } from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProductionReportForm = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response;

        // Check if there's a selected customer PO in localStorage
        const selectedRoutingSheet = localStorage.getItem(
          "selectedRoutingSheet"
        );
        console.log("selectedRoutingSheet", selectedRoutingSheet);
        if (selectedRoutingSheet) {
          const parsedRoutingSheet = JSON.parse(selectedRoutingSheet);
          console.log("_id", parsedRoutingSheet._id);
          response = await axios.get(
            `http://localhost:8000/api/productionReport/get-production-report-by-routing-sheet/${parsedRoutingSheet._id}`
          );
          console.log("responsebyid", selectedRoutingSheet);
        } else {
          // Fetch all material issue slips if no customer PO is selected
          response = await axios.get(
            "http://localhost:8000/api/productionReport/get-all-production-report"
          );
        }

        const productionReports = response.data.productionReports;
        const formattedData = productionReports
          .map((report) => {
            return report.processRows.map((processRow) => {
              return {
                _id: report._id,
                date: new Date(report.date).toLocaleDateString(),
                operatorName: processRow.operatorName,
                processDescription: processRow.jobDescription,
                procedures: processRow.procedures || "-",
                orderQty: report.poNo || "-",
                processQty: report.processQty || "-",
                startTime: processRow.startTime || "-",
                endTime: processRow.endTime || "-",
                optSign: processRow.optSign || "-",
                remarks: processRow.remarks || "-",
              };
            });
          })
          .flat();

        setRowData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
      headerName: "Job DESCRIPTION",
      field: "processDescription",
      editable: true,
    },
    {
      headerName: "PROCEDURE NO/DRAWING NO/REPORT NO.",
      field: "procedures",
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

export default ProductionReportForm;
