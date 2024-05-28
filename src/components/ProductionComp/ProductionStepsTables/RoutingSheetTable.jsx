"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsInfoCircle } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import HistoryTablePopup from "@/components/HomeComp/HistoryTablePopup";
import { current } from "@reduxjs/toolkit";

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
          );
        } else {
          response = await axios.get("http://localhost:8000/api/routingSheet");
        }

        console.log("response", response.data);
        setRowData(
          response.data.map((item, index) => ({
            srNo: index + 1,
            _id: item._id,
            RoutingSheets: item.processRows[0].routingSheetNo,
            CreatedData: item.processDescription || "DATA",
            CreatedBy: item.createdBy,
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

  console.log("rowData2", rowData);
  useEffect(() => {
    const fetchProductionReports = async () => {
      try {
        console.log("Fetching production reports for each row...");
        const promises = rowData.map(async (item) => {
          const response = await axios.get(
            `http://localhost:8000/api/productionReport/get-production-report-by-routing-sheet/${item._id}`
          );
          console.log("response.data", response.data);
          return response.data;
        });

        const productionReports = await Promise.all(promises);
        console.log("Production Reports:", productionReports);

        // Extract the _id of the first report from each production reports array
        const firstReportIds = response.data.productionReports[0]?._id;
        console.log("First Report Ids:", firstReportIds);

        // Fetch data for each first report id and store startTime and endTime
        const fetchedData = await Promise.all(
          firstReportIds.map(async (firstReportId) => {
            const response = await axios.get(
              `http://localhost:8000/api/productionReport/get-production-reportById/${firstReportId}`
            );
            const { startTime, endTime } = response.data;
            // Store startTime and endTime in localStorage
            localStorage.setItem(`startTime_${firstReportId}`, startTime);
            localStorage.setItem(`endTime_${firstReportId}`, endTime);
            return response.data;
          })
        );

        console.log("Fetched Data:", fetchedData);
      } catch (error) {
        console.error("Error fetching production reports:", error);
      }
    };

    if (rowData.length > 0) {
      fetchProductionReports();
    }
  }, [rowData]);

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
    console.log("_id for routing", _id);
    router.push(`/production/routing-sheet/routingSheetFormUpdate?id=${_id}`);
  };

  const handleHistoryClick = async (_id) => {
    console.log("object _id routing sheet", _id);
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/routingSheet/get-getRoutingHistoryByroutingId/${_id}`
      );
      console.log("Response data Routing Sheet:", response.data);
      console.log(
        "Response data Routing Sheet historyRecords:",
        response.data.historyRecords
      );

      const historyData = response.data.historyRecords.map((record, index) => {
        const { date, processRows } = record.previousData;
        console.log("Routing Sheet Records", record);
        console.log(
          "processRows.length > 0 ? processRows[0].routingSheetNo ",
          processRows.length > 0 ? processRows[0].routingSheetNo : ""
        );
        return {
          srNo: index + 1,
          // routingSheets: record._id,
          RoutingSheets:
            processRows.length > 0 ? processRows[0].routingSheetNo : "",
          currentId: record._id,
          CreatedDate: new Date(date).toLocaleDateString(), // Format date
          UpdatedDate: record.updatedAt,
          ...processRows.map((processRow) => ({
            routingSheetNo: processRow.routingSheetNo,
            operatorName: processRow.operatorName,
            machineNo: processRow.machineNo,
            processDescription: processRow.processDescription,
            procedureNo: processRow.procedureNo,
            orderQty: processRow.orderQty,
            processQty: processRow.processQty,
            startTime: processRow.startTime,
            endTime: processRow.endTime,
            optSign: processRow.optSign,
            remarks: processRow.remarks,
          })),
        };
      });

      // }));
      console.log("historyData Routing Sheet", historyData);
      setHistoryRowData(historyData);
      console.log("first historyRowData routing", historyRowData);
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
    console.log("Routing Sheet Data", data);

    return (
      <div className="flex flex-row items-center gap-2 pt-1 ag-theme-alpine">
        <button
          onClick={() => handleEditClick(data._id)}
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
        <button
          onClick={() => handleHistoryClick(data._id)}
          className="p-2 text-red-600 bg-yellow-200 rounded-lg"
        >
          <BsInfoCircle />
        </button>
      </div>
    );
  };

  const handleViewClick = (currentId) => {
    router.push(
      `/production/routing-sheet/routing-sheet-history?currentId=${currentId}`
    );
  };

  const HistoryButton = (props) => {
    const data = props.data;
    console.log("data in routing for history", data);
    return (
      <div className="flex flex-row items-center gap-2 pt-1 ag-theme-alpine">
        {/* View Button */}
        <button
          onClick={() => {
            handleViewClick(data.currentId);
          }}
          className="p-2 text-red-600 bg-yellow-200 rounded-lg"
        >
          <IoSearch />
        </button>
      </div>
    );
  };

  const columnDefs = [
    { headerName: "Sr No", field: "srNo", minWidth: 50, maxWidth: 80 },
    {
      headerName: "Action",
      cellRenderer: CustomButtonComponent,
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Routing Sheets", field: "RoutingSheets", flex: 1 },
    { headerName: "Created Data", field: "CreatedData", flex: 1 },
    { headerName: "Created By", field: "CreatedBy", flex: 1 },
  ];

  const HistoryColumnDefs = [
    {
      headerName: "Action",
      cellRenderer: HistoryButton,
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Sr No",
      field: "srNo",
      minWidth: 50,
      maxWidth: 80,
      sort: "desc",
    },
    { headerName: "Routing Sheets", field: "RoutingSheets", flex: 1 },
    { headerName: "Created Data", field: "CreatedDate", flex: 1 },
    { headerName: "Updated Date", field: "UpdatedDate", flex: 1 },
  ];

  const onRowClicked = (event) => {
    const selectedRoutingSheet = event.data; // Access the clicked row data
    localStorage.setItem(
      "selectedRoutingSheet",
      JSON.stringify(selectedRoutingSheet)
    );
  };

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
          onRowClicked={onRowClicked}
          rowSelection="single"
        />
      </div>

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

export default RoutingSheetTable;
