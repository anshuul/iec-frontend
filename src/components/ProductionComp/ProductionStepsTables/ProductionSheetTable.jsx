"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductionSheetTable = ({ productionStep }) => {
  console.log("productionStep", productionStep);
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("rowData", rowData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response;
        const selectedCustomerPO = localStorage.getItem("selectedCustomerPO");

        if (selectedCustomerPO) {
          const parsedCustomerPO = JSON.parse(selectedCustomerPO);
          console.log("poNo", parsedCustomerPO.poNo);
          response = await axios.get(
            `http://localhost:8000/api/production/get-planningSheet/${parsedCustomerPO.poNo}`
          );
        } else {
          response = await axios.get(
            "http://localhost:8000/api/production/get-planningSheet"
          );
        }
        setRowData(
          response.data.map((item, index) => ({
            srNo: index + 1,
            _id: item._id,
            ProductionPlanning: item.productionSheetName,
            CreatedDate: new Date(item.planningDate).toLocaleString(undefined, {
              dateStyle: "long",
              timeStyle: "medium",
            }),
            CreatedBy: item.productionSheetName, // Assuming createdBy should be displayed as Created By
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

  const handleClick = () => {
    router.push(`/production/${productionStep}/productionSheetForm`);
  };

  const handleEditClick = (_id) => {
    router.push(
      `/production/production-planning-sheets/productionSheetFormUpdate?id=${_id}`
    );
  };

  const handleDeleteClick = async (data) => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:8000/api/production/delete-planningSheetById/${data._id}`
      );
      const updatedRows = rowData.filter((row) => row !== data);
      setRowData(updatedRows);
      setLoading(false);
    } catch (error) {
      console.error("Error deleting data:", error);
      setLoading(false);
    }
  };

  const CustomButtonComponent = (props) => {
    const data = props.data;
    console.log("first data", data);
    return (
      <div className="ag-theme-alpine flex flex-row gap-2 items-center pt-1">
        <button
          // onClick={() => handleEditClick(data.CustomerPO)}
          onClick={() => handleEditClick(data._id)}
          className="p-2 bg-green-200 rounded-lg text-green-600"
        >
          <MdModeEdit />
        </button>
        <button
          onClick={() => handleDeleteClick(data)}
          className="p-2 bg-red-200 rounded-lg text-red-600"
        >
          <RiDeleteBin5Line />
        </button>
      </div>
    );
  };

  const columnDefs = [
    { headerName: "Sr No", field: "srNo", minWidth: 50, maxWidth: 80 },
    { headerName: "Production Planning", field: "ProductionPlanning", flex: 1 },
    { headerName: "Created Date", field: "CreatedDate", flex: 1 },
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

export default ProductionSheetTable;
