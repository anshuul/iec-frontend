"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

const RoutingSheetTable = ({ productionStep }) => {
  console.log("productionStep", productionStep);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/production/${productionStep}/routingSheetForm`);
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
    { headerName: "Sr No", field: "srNo", minWidth: 50, maxWidth: 80 },
    { headerName: "Routing Sheets", field: "RoutingSheets", flex: 1 },
    { headerName: "Created Data", field: "CreatedData", flex: 1 },
    { headerName: "Created By", field: "CreatedBy", flex: 1 },
    {
      headerName: "Action",
      cellRenderer: CustomButtonComponent,
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const rowData = [
    {
      srNo: 1,
      RoutingSheets: "Routing Sheet 1",
      CreatedData: "2024-01-01",
      CreatedBy: "John Doe",
    },
    {
      srNo: 2,
      RoutingSheets: "Routing Sheet 2",
      CreatedData: "2024-01-02",
      CreatedBy: "Jane Smith",
    },
    {
      srNo: 3,
      RoutingSheets: "Routing Sheet 3",
      CreatedData: "2024-01-03",
      CreatedBy: "Alice Johnson",
    },
    {
      srNo: 4,
      RoutingSheets: "Routing Sheet 4",
      CreatedData: "2024-01-04",
      CreatedBy: "Bob Williams",
    },
    {
      srNo: 5,
      RoutingSheets: "Routing Sheet 5",
      CreatedData: "2024-01-05",
      CreatedBy: "Eva Brown",
    },
    {
      srNo: 6,
      RoutingSheets: "Routing Sheet 6",
      CreatedData: "2024-01-06",
      CreatedBy: "Michael Clark",
    },
    {
      srNo: 7,
      RoutingSheets: "Routing Sheet 7",
      CreatedData: "2024-01-07",
      CreatedBy: "Sophia Lee",
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

export default RoutingSheetTable;
