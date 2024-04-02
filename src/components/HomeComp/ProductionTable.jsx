"use client";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

const ProductionTable = () => {
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
    { headerName: "Sr No", field: "srNo", flex: 1 },
    { headerName: "Customer PO", field: "customerPO", flex: 3 },
    { headerName: "Customer Name", field: "customerName", flex: 3 },
    { headerName: "Action", cellRenderer: CustomButtonComponent, flex: 1 },
  ];

  const rowData = [
    { srNo: 1, customerPO: "PO123", customerName: "John Doe" },
    { srNo: 2, customerPO: "PO456", customerName: "Jane Smith" },
  ];

  return (
    <div 
      className="ag-theme-alpine px-4 w-full h-[90vh]"
      // style={{ width: "100%", height: "100vh"}}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default ProductionTable;
