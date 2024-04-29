"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductionReport = ({ productionStep }) => {
  console.log("productionStep", productionStep);
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    router.push(`/production/${productionStep}/productionReportForm`);
  };

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

        // http://localhost:8000/api/productionReport/get-production-reportById/66212e4726e3bdaf230b6636

        const productionReports = response.data;
        const formattedData = productionReports.map((issueSlip, index) => {
          const processRow = issueSlip.processRows[0];
          let size = "N/A";
          if (issueSlip.size && issueSlip.size.diameter) {
            size = `${issueSlip.size.diameter.value}x${issueSlip.size.length.value}`;
          }
          console.log("issueSlip", issueSlip);
          return {
            srNo: index + 1,
            _id: issueSlip._id,
            ProductionPlanning: issueSlip.poNo,
            CreatedData: processRow.jobDescription,
            CreatedBy: processRow.operatorName,
          };
        });
        setRowData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const CustomButtonComponent = (props) => {
    return (
      <div className="flex flex-row items-center gap-2 pt-1 ag-theme-alpine">
        <button
          onClick={() => window.alert("clicked")}
          className="p-2 text-green-600 bg-green-200 rounded-lg"
        >
          <MdModeEdit />
        </button>
        <button
          onClick={() => window.alert("clicked")}
          className="p-2 text-red-600 bg-red-200 rounded-lg"
        >
          <RiDeleteBin5Line />
        </button>
      </div>
    );
  };

  const columnDefs = [
    { headerName: "Sr No", field: "srNo", minWidth: 50, maxWidth: 80 },
    { headerName: "Production Planning", field: "ProductionPlanning", flex: 1 },
    { headerName: "Created Data", field: "CreatedData", flex: 1 },
    { headerName: "Created By", field: "CreatedBy", flex: 1 },
    {
      headerName: "Action",
      cellRenderer: CustomButtonComponent,
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  return (
    // <div className="flex flex-col items-center justify-center">
    <div className="flex flex-col mx-4 bg-white">
      {/* Button positioned at the top right corner */}
      <button
        className="self-end px-4 py-2 m-4 bg-gray-400 rounded-lg"
        onClick={handleClick}
      >
        Create
      </button>
      <div className="ag-theme-alpine px-4 w-full h-[75vh]">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default ProductionReport;
