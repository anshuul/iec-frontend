"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Icons
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";

// AGGrid
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const HeatTreatmentTable = ({ qualityStep }) => {
  console.log("qualityStep in HeatTreatmentTable", qualityStep);
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quality/heatTreatment`);
        console.log("response.data", response.data);
        const heatTreatmentData = response.data;

        const formattedData = heatTreatmentData.map((item, index) => {
          return {
            srNo: index + 1,
            HTR: item.htrNo,
            CreatedDate: new Date(item.date).toLocaleDateString(),
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

  const CustomButtonComponent = () => {
    return (
      <div className="flex flex-row items-center gap-2 pt-1 ag-theme-alpine">
        <button className="p-2 text-green-600 bg-green-200 rounded-lg">
          <MdModeEdit />
        </button>
        <button className="p-2 text-red-600 bg-red-200 rounded-lg">
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
    },
    {
      headerName: "Action",
      cellRenderer: CustomButtonComponent,
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "HTR", field: "HTR", flex: 1 },
    { headerName: "Created Date", field: "CreatedDate", flex: 1 },
    { headerName: "Created By", field: "CreatedBy", flex: 1 },
  ];

  const handleClick = () => {
    router.push(`/quality/${qualityStep}/heatTreatmentForm`);
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

export default HeatTreatmentTable;
