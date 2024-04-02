"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

const DimensionReport = ({ productionStep }) => {
  console.log("productionStep", productionStep);

  const router = useRouter();

  const handleClick = () => {
    router.push(`/production/${productionStep}/dimensionReportForm`);
  };

  const CustomButtonComponent = (props) => {
    return (
      <div className="ag-theme-alpine flex flex-row gap-2 items-center pt-1">
        <button
          onClick={() => window.alert("clicked")}
          className="p-2 bg-green-200 rounded-lg text-green-600"
        >
          <MdModeEdit />
        </button>
        <button
          onClick={() => window.alert("clicked")}
          className="p-2 bg-red-200 rounded-lg text-red-600"
        >
          <RiDeleteBin5Line />
        </button>
      </div>
    );
  };

  const columnDefs = [
    { headerName: "Sr No", field: "srNo", maxWidth: 80 },
    {
      headerName: "Production Planning",
      field: "ProductionPlanning",
      minWidth: 400,
    },
    { headerName: "Created Data", field: "CreatedData", minWidth: 400 },
    { headerName: "Created By", field: "CreatedBy", minWidth: 400 },
    { headerName: "Action", cellRenderer: CustomButtonComponent },
  ];

  const rowData = [
    {
      srNo: 1,
      ProductionPlanning: "F-PR-01",
      CreatedData: "12 Apr 2024",
      CreatedBy: "Vishal Doshi",
    },
    {
      srNo: 2,
      ProductionPlanning: "F-PR-02",
      CreatedData: "13 Apr 2024",
      CreatedBy: "Vishal Doshi",
    },
    {
      srNo: 3,
      ProductionPlanning: "F-PR-03",
      CreatedData: "14 Apr 2024",
      CreatedBy: "Vishal Doshi",
    },
    {
      srNo: 4,
      ProductionPlanning: "F-PR-04",
      CreatedData: "15 Apr 2024",
      CreatedBy: "Vishal Doshi",
    },
  ];

  return (
    // <div className="flex flex-col justify-center items-center">
    <div className="flex flex-col mx-4 bg-white">
      {/* Button positioned at the top right corner */}
      <button
        className="self-end m-4 bg-gray-400 px-4 py-2 rounded-lg"
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

export default DimensionReport;
