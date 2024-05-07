"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MdModeEdit } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerPOData } from "@/slice/customerPOSlice";
import { setRoutingSheetData } from "@/slice/routingSheetSlice";
import { setProductionReportData } from "@/slice/productionReportSlice";
import HistoryTablePopup from "./HistoryTablePopup";

const ProductionTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const [historyRowData, setHistoryRowData] = useState([]);
  const [showHistoryTable, setShowHistoryTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const gridApiRef = useRef(null);

  // Retrieve customerPOData from Redux store
  const customerPODataForRouting = useSelector(
    (state) => state.customerPO.data
  );
  console.log("customerPODataForRouting", customerPODataForRouting);

  // Retrieve routingSheetSlice from Redux store
  const routingSheetSliceDataForRouting = useSelector(
    (state) => state.routingSheetData.data
  );
  console.log(
    "routingSheetSliceDataForRouting",
    routingSheetSliceDataForRouting
  );

  // // Retrieve production report from Redux store
  // const productionReportSliceDataForRouting = useSelector(
  //   (state) => state.productionReport.data
  // );
  // console.log(
  //   "productionReportSliceDataForRouting",
  //   productionReportSliceDataForRouting
  // );

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

    // Clear localStorage on component unmount or tab close
    window.addEventListener("beforeunload", clearLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);

  const clearLocalStorage = () => {
    localStorage.removeItem("selectedCustomerPO");
  };

  const handleClick = () => {
    router.push(`/production/production-page/productionForm`);
  };

  const handleEditClick = (CustomerPO) => {
    router.push(`/production/productionForm/update?CustomerPO=${CustomerPO}`);
  };

  const handleDeleteClick = async (data) => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:8000/api/customerPO/delete/${data.CustomerPO}`
      );
      const updatedRows = rowData.filter((row) => row !== data);
      setRowData(updatedRows);
      setLoading(false);
    } catch (error) {
      console.error("Error deleting data:", error);
      setLoading(false);
    }
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
        CreatedAt: new Date(record.previousData.createdAt).toLocaleString(
          undefined,
          { dateStyle: "long", timeStyle: "medium" }
        ), // Convert to pretty format
        UpdatedAt: new Date(record.previousData.updatedAt).toLocaleString(
          undefined,
          { dateStyle: "long", timeStyle: "medium" }
        ), // Convert to pretty format
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

  // Function to close the history modal
  const closeModal = () => {
    setShowHistoryTable(false);
  };

  const CustomButtonComponent = (props) => {
    const data = props.data;
    console.log("data.CustomerPO", data.CustomerPO);
    return (
      <div className="flex flex-row items-center gap-2 pt-1 ag-theme-alpine">
        <button
          onClick={() => handleEditClick(data.CustomerPO)}
          className="p-2 text-green-600 bg-green-200 rounded-lg"
        >
          <MdModeEdit />
        </button>
        {/* Delete Button */}
        <button
          onClick={() => handleDeleteClick(data)}
          className="p-2 text-red-600 bg-red-200 rounded-lg"
        >
          <RiDeleteBin5Line />
        </button>
        {/* History Button */}
        <button
          onClick={() => handleHistoryClick(data.CustomerPO)}
          className="p-2 text-red-600 bg-yellow-200 rounded-lg"
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
      <div className="flex flex-row items-center gap-2 pt-1 ag-theme-alpine">
        {/* View Button */}
        <button
          onClick={() => {
            handleViewClick(data.CustomerPO, data.historyId);
          }}
          className="p-2 text-red-600 bg-yellow-200 rounded-lg"
        >
          <IoSearch />
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
    { headerName: "Customer PO", field: "CustomerPO", flex: 1, sort: "desc" },
    {
      headerName: "Customer Name",
      field: "CustomerName",
      flex: 1,
      sort: "desc",
    },
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
    { headerName: "CreatedAt", field: "CreatedAt", flex: 1 },
    { headerName: "UpdatedAt", field: "UpdatedAt", flex: 1 },
    {
      headerName: "Action",
      cellRenderer: HistoryButton,
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const onSelectionChanged = async () => {
    const selectedRows = gridApiRef.current.getSelectedRows(); // Access gridApi using ref

    if (selectedRows.length > 0) {
      const selectedCustomerPO = selectedRows[0].CustomerPO;
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/customerPO/${selectedCustomerPO}`
        );
        const customerPOData = response.data.customerPO;
        localStorage.setItem(
          "selectedCustomerPO",
          JSON.stringify(customerPOData)
        );
        dispatch(setCustomerPOData(customerPOData));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customer PO data:", error);
        setLoading(false);
      }
    }
  };

  const userData = JSON.parse(localStorage.getItem("selectedCustomerPO"));
  console.log("userData", userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch routing sheet data only if customerPODataForRouting is available
        if (customerPODataForRouting) {
          const poNo = customerPODataForRouting.poNo;
          console.log("poNo", poNo);
          const response = await axios.get(
            `http://localhost:8000/api/routingSheet/get-routingSheet/${poNo}`
          );

          console.log("response", response.data);
          const routingSheetResponse = response.data;
          dispatch(setRoutingSheetData(routingSheetResponse));
          console.log("routingSheetResponse", routingSheetResponse);

          // Fetch production report data for each routing sheet ID
          if (routingSheetResponse && Array.isArray(routingSheetResponse)) {
            const reportResponses = await Promise.all(
              routingSheetResponse.map(async (routingSheet) => {
                if (routingSheet && routingSheet._id) {
                  const id = routingSheet._id;
                  console.log("routing sheet id:", id);
                  const reportResponse = await axios.get(
                    `http://localhost:8000/api/productionReport/get-production-report-by-routing-sheet/${id}`
                  );
                  console.log(
                    "report response for routing sheet id:",
                    id,
                    reportResponse
                  );
                  dispatch(setProductionReportData(reportResponse.data));
                  return reportResponse;
                } else {
                  console.log("Invalid routing sheet data:", routingSheet);
                  return null;
                }
              })
            );
            // Dispatch action to update production report data in Redux store if needed
            console.log("reportResponses", reportResponses);
          }
        } else {
          console.log("No data found in localStorage for selectedCustomerPO");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerPODataForRouting]);

  return (
    <div className="flex flex-col h-screen mx-4 bg-white">
      <button
        className="self-end px-4 py-2 m-4 bg-gray-400 rounded-lg"
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
          onGridReady={(params) => (gridApiRef.current = params.api)} // Assign gridApi to ref
          onSelectionChanged={onSelectionChanged}
          rowSelection="single"
        />
      </div>
      {/* {showHistoryTable ? (
        <>
          <hr className="mx-4 mt-12 mb-6 border-t border-gray-300" />
          <div className="ag-theme-alpine px-4 w-full h-[30vh]">
            <p className="mb-2 text-xl font-bold text-start">History</p>
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
      ) : null} */}
      {showHistoryTable && (
        <HistoryTablePopup
          HistoryColumnDefs={HistoryColumnDefs}
          historyRowData={historyRowData}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default ProductionTable;
