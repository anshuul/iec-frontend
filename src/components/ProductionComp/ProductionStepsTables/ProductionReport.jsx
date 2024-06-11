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
import HistoryTablePopup from "@/components/HomeComp/HistoryTablePopup";
import { IoSearch } from "react-icons/io5";

const ProductionReport = ({ productionStep }) => {
  console.log("productionStep", productionStep);

  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [historyRowData, setHistoryRowData] = useState([]);
  const [showHistoryTable, setShowHistoryTable] = useState(false);

  const handleClick = () => {
    router.push(`/production/${productionStep}/productionReportForm`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response;

        // Check if there's a selected customer PO in localStorage
        const selectedRoutingSheet = localStorage.getItem(
          "selectedRoutingSheet"
        );
        console.log("selectedRoutingSheet", selectedRoutingSheet);
        if (selectedRoutingSheet) {
          const parsedRoutingSheet = JSON.parse(selectedRoutingSheet);
          console.log("_id", parsedRoutingSheet._id);
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productionReport/get-production-report-by-routing-sheet/${parsedRoutingSheet._id}`
          );
          console.log("in condition response", response.data);
          console.log("responsebyid", selectedRoutingSheet);
        } else {
          // Fetch all material issue slips if no customer PO is selected
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productionReport/get-all-production-report`
          );
        }

        const productionReports = response.data;
        console.log("productionReports in report sheet", productionReports);

        const formattedData = [
          {
            srNo: 1,
            ProductionPlanning: productionReports.poNo,
            productionReportID: productionReports._id,
            CreatedData: new Date(productionReports.date).toLocaleString(
              undefined,
              { dateStyle: "long", timeStyle: "medium" }
            ),
            CreatedBy: productionReports.createdBy,
          },
        ];

        console.log("formattedData in production report", formattedData);

        setRowData(formattedData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = () => {
    router.push(`/production/production-report/productionReportFormUpdate`);
  };

  const handleDeleteClick = async (data) => {
    console.log("data", data);
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productionReport/delete-productionReport/${data.productionReportID}`
      );
      const updatedRows = rowData.filter((row) => row !== data);
      setRowData(updatedRows);
      setLoading(false);
    } catch (error) {
      console.error("Error deleting data:", error);
      setLoading(false);
    }
  };

  const handleHistoryClick = async (productionReportID) => {
    console.log("object productionReportID routing sheet", productionReportID);
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productionReport/get-productionReportHistory/${productionReportID}`
      );

      console.log(
        "Response data Production Report historyRecords:",
        response.data.historyRecords
      );

      // Flatten the processRowsHistory from all historyRecords
      const historyData = {
        _id: response.data.historyRecords[0]._id,
        date: response.data.historyRecords[0].date,
        productionReportId: response.data.historyRecords[0].productionReportId,
        processRows: response.data.historyRecords.flatMap((record) =>
          record.processRowsHistory.map((processRow) => ({
            operatorName: processRow.previousData.operatorName || "N/A",
            machineNo: processRow.previousData.machineNo || "N/A",
            jobDescription: processRow.previousData.jobDescription || "N/A",
            procedures: processRow.previousData.procedures || "N/A",
            orderQty: processRow.previousData.orderQty || "N/A",
            processQty: processRow.previousData.processQty || "N/A",
            startTime: processRow.previousData.startTime || "N/A",
            endTime: processRow.previousData.endTime || "N/A",
            remarks: processRow.previousData.remarks || "N/A",
          }))
        ),
      };

      console.log("historyData production report", historyData);
      setHistoryRowData(historyData);
      // setHistoryRowData(historyData.processRows);
      console.log("first historyRowData production report", historyRowData);
      setShowHistoryTable(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching history data:", error);
      setLoading(false);
    }
  };

  const HistoryButton = (props) => {
    const data = props.data;
    console.log("data in routing for history", data);
    return (
      <div className="flex flex-row items-center gap-2 pt-1 ag-theme-alpine">
        {/* View Button */}
        <button
          // onClick={() => {
          //   handleViewClick(data.currentId);
          // }}
          className="p-2 text-red-600 bg-yellow-200 rounded-lg"
        >
          <IoSearch />
        </button>
      </div>
    );
  };

  const closeModal = () => {
    setShowHistoryTable(false);
  };

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
    { headerName: "Production Report", field: "productionReportId", flex: 1 },
    { headerName: "Created Data", field: "date", flex: 1 },
    { headerName: "Updated Date", field: "date", flex: 1 },
  ];

  const CustomButtonComponent = (props) => {
    const data = props.data;
    console.log("Production Report Data", data);

    return (
      <div className="flex flex-row items-center gap-2 pt-1 ag-theme-alpine">
        {/* Edit button */}
        <button
          onClick={handleEditClick}
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
          onClick={() => handleHistoryClick(data.productionReportID)}
          className="p-2 text-red-600 bg-yellow-200 rounded-lg"
        >
          <BsInfoCircle />
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
    { headerName: "Production Planning", field: "ProductionPlanning", flex: 1 },
    { headerName: "Created Data", field: "CreatedData", flex: 1 },
    { headerName: "Created By", field: "CreatedBy", flex: 1 },
  ];

  return (
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

export default ProductionReport;
