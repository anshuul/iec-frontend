"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Icons
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";

// AGGrid
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const DispatchTable = ({ qualityStep }) => {
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let response;

        // Check if there's a selected customer PO in localStorage
        const selectedPOListItem = localStorage.getItem("selectedPOListItem");
        if (selectedPOListItem) {
          const parsedPOListItem = JSON.parse(selectedPOListItem);
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quality/dispatch/getBy-listItemNo?poNo=${parsedPOListItem.poNo}&listItemNo=${parsedPOListItem.POListNo}`
          );
        } else {
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quality/dispatch`
          );
        }

        console.log("response.data", response.data);
        const heatTreatmentData = response.data;

        const formattedData = heatTreatmentData.map((item, index) => {
          return {
            srNo: index + 1,
            DANO: item.daNo,
            CustomerName: item.customerName,
            CreatedDate: new Date(item.date).toLocaleDateString(),
            id: item._id,
            CreatedBy: item.createdBy,
          };
        });
        setRowData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (id) => {
    router.push(`/quality/dispatch/dispatchUpdateForm?id=${id}`);
  };

  const handleDeleteClick = async (data) => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quality/dispatch/deleteByID/${data.id}`
      );
      const updatedRows = rowData.filter((row) => row !== data);
      setRowData(updatedRows);
    } catch (error) {
      console.error("Error deleting data:", error);
      setLoading(false);
    }
  };

  const CustomButtonComponent = ({ data }) => {
    return (
      <div className="flex flex-row items-center gap-2 pt-1 ag-theme-alpine">
        <button
          onClick={() => handleEditClick(data.id)}
          className="p-2 text-green-600 bg-green-200 rounded-lg"
        >
          <MdModeEdit />
        </button>
        <button
          onClick={() => handleDeleteClick(data)}
          className="p-2 text-red-600 bg-red-200 rounded-lg"
        >
          <RiDeleteBin5Line />
        </button>
        {/* History Button */}
        <button className="p-2 text-red-600 bg-yellow-200 rounded-lg">
          <BsInfoCircle />
        </button>
      </div>
    );
  };

  const columnDefs = [
    {
      headerName: "Sr No",
      field: "srNo",
      minWidth: 50,
      maxWidth: 80,
      sort: "desc",
    },
    {
      headerName: "Action",
      cellRenderer: CustomButtonComponent,
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "DA NO", field: "DANO", flex: 1 },
    { headerName: "Customer Name", field: "CustomerName", flex: 1 },
    { headerName: "Created Date", field: "CreatedDate", flex: 1 },
    { headerName: "Created By", field: "CreatedBy", flex: 1 },
  ];

  const handleClick = () => {
    router.push(`/quality/${qualityStep}/dispatchForm`);
  };

  return (
    <div className="flex flex-col h-[85VH] mx-4 bg-white">
      <button
        onClick={handleClick}
        className="self-end px-4 py-2 m-4 bg-gray-400 rounded-lg"
      >
        Create
      </button>
      <div className="ag-theme-alpine px-4 w-full h-[75vh]">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          paginationPageSize={15}
        />
      </div>
    </div>
  );
};

export default DispatchTable;
