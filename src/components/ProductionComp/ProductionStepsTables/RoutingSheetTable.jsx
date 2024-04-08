"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const RoutingSheetTable = ({ productionStep }) => {
  console.log("productionStep", productionStep);
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyRowData, setHistoryRowData] = useState([]);
  const [showHistoryTable, setShowHistoryTable] = useState(false);

  const handleClick = () => {
    router.push(`/production/${productionStep}/routingSheetForm`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("start");
        setLoading(true);
        let response;
        const selectedCustomerPO = localStorage.getItem("selectedCustomerPO");

        if (selectedCustomerPO) {
          const parsedCustomerPO = JSON.parse(selectedCustomerPO);
          console.log("poNo", parsedCustomerPO.poNo);
          response = await axios.get(
          `http://localhost:8000/api/routingSheet/get-routingSheet/${parsedCustomerPO.poNo}`
          // `http://localhost:8000/api/routingSheet/get-routingSheetById/${parsedCustomerPO.poNo}`
          );
          // response = await axios.get("http://localhost:8000/api/routingSheet");
        } else {
          response = await axios.get("http://localhost:8000/api/routingSheet");
        }

        console.log("response", response.data);
        setRowData(
          response.data.map((item, index) => ({
            srNo: index + 1,
            _id: item._id,
            RoutingSheets: item.operatorName||"R010",
            CreatedData: item.processDescription || "DATA",
            CreatedBy: item.operatorName || "Vishal",
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteClick = async (data) => {
    console.log("data", data);
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:8000/api/routingSheet/delete-routingSheet/${data._id}`
      );
      const updatedRows = rowData.filter((row) => row !== data);
      setRowData(updatedRows);
      setLoading(false);
    } catch (error) {
      console.error("Error deleting data:", error);
      setLoading(false);
    }
  };

  const handleEditClick = (_id) => {
    router.push(`/production/routing-sheet/routingSheetFormUpdate?id=${_id}`);
  };

  const CustomButtonComponent = (props) => {
    const data = props.data;

    return (
      <div className="ag-theme-alpine flex flex-row gap-2 items-center pt-1">
        <button
          onClick={() => handleEditClick(data._id)}
          className="p-2 bg-green-200 rounded-lg text-green-600"
        >
          <MdModeEdit />
        </button>
        <button
          onClick={() => handleDeleteClick(data)}
          className="p-2 text-red-600 bg-red-200 rounded-lg"
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
