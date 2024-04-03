"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MdModeEdit } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductionTable = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const [historyRowData, setHistoryRowData] = useState([]);
  const [showHistoryTable, setShowHistoryTable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            "http://localhost:8000/api/customerPO/"
          );
          const formattedData = response.data.customerPOs.map(
            (item, index) => ({
              srNo: index + 1,
              CustomerPO: item.poNo,
              CustomerName: item.customerName, // Assuming customerName field exists
            })
          );
          setRowData(formattedData);
          router.push("/production");
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClick = () => {
    router.push(`/production/production-page/productionForm`);
  };

  const handleEditClick = (CustomerPO) => {
    router.push(`/production/productionForm/update?CustomerPO=${CustomerPO}`);
  };

  const handleDeleteClick = (data) => {
    const updatedRows = rowData.filter((row) => row !== data);
    setRowData(updatedRows);
  };

  const handleHistoryClick = async (poNo) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/customerPO/customerPOHistory/${poNo}`
      );
      const historyData = response.data.historyRecords.map((record, index) => ({
        srNo: index + 1,
        CustomerPO: record.poNo,
        CustomerName: record.previousData.customerName,
        historyId: record._id,
      }));
      setHistoryRowData(historyData);
      setShowHistoryTable(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching history data:", error);
      setLoading(false);
    }
  };

  const CustomButtonComponent = (props) => {
    const data = props.data;
    return (
      <div className="ag-theme-alpine flex flex-row gap-2 items-center pt-1">
        <button
          onClick={() => handleEditClick(data.CustomerPO)}
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
        {/* History Button */}
        <button
          onClick={() => handleHistoryClick(data.CustomerPO)}
          className="p-2 bg-yellow-200 rounded-lg text-red-600"
        >
          <BsInfoCircle />
        </button>
      </div>
    );
  };

  const handleViewClick = (CustomerPO, historyId) => {
    router.push(
      `/production/productionForm/view?CustomerPO=${CustomerPO}&historyId=${historyId}`
    );
    // router.push(`/production/productionForm/view`);
  };

  const HistoryButton = (props) => {
    const data = props.data;
    console.log("HistoryButton", data);
    return (
      <div className="ag-theme-alpine flex flex-row gap-2 items-center pt-1">
        {/* View Button */}
        <button
          onClick={() => {
            handleViewClick(data.CustomerPO, data.historyId);
          }}
          className="p-2 bg-yellow-200 rounded-lg text-red-600"
        >
          <IoSearch />
        </button>
      </div>
    );
  };

  const columnDefs = [
    { headerName: "Sr No", field: "srNo", minWidth: 50, maxWidth: 80 },
    { headerName: "Customer PO", field: "CustomerPO", flex: 1 },
    { headerName: "Customer Name", field: "CustomerName", flex: 1 },
    {
      headerName: "Action",
      cellRenderer: CustomButtonComponent,
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const HistoryColumnDefs = [
    { headerName: "Sr No", field: "srNo", minWidth: 50, maxWidth: 80 },
    { headerName: "Customer PO", field: "CustomerPO", flex: 1 },
    { headerName: "Customer Name", field: "CustomerName", flex: 1 },
    {
      headerName: "Action",
      cellRenderer: HistoryButton,
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  return (
    <div className="flex flex-col mx-4 h-screen bg-white">
      <button
        className="self-end m-4 bg-gray-400 px-4 py-2 rounded-lg"
        onClick={handleClick}
      >
        Create
      </button>

      <div className="ag-theme-alpine px-4 w-full h-[45vh]">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          paginationPageSize={10}
          loadingOverlayComponent={"Loading"}
          overlayLoadingTemplate={
            '<span class="ag-overlay-loading-center">Please wait while loading...</span>'
          }
        />
      </div>
      {showHistoryTable ? (
        <>
          <hr className="mt-12 mb-6 mx-4 border-t border-gray-300" />
          <div className="ag-theme-alpine px-4 w-full h-[30vh]">
            <p className="text-start font-bold text-xl mb-2">History</p>
            <AgGridReact
              columnDefs={HistoryColumnDefs}
              rowData={historyRowData}
              pagination={true}
              paginationPageSize={10}
              loadingOverlayComponent={"Loading"}
              overlayLoadingTemplate={
                '<span class="ag-overlay-loading-center">Please wait while loading...</span>'
              }
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ProductionTable;
