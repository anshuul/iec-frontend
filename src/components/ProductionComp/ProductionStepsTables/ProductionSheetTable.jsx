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

const ProductionSheetTable = ({ productionStep }) => {
  console.log("productionStep", productionStep);
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyRowData, setHistoryRowData] = useState([]);
  const [showHistoryTable, setShowHistoryTable] = useState(false);
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
            PONumber: item.poNo,
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

  const handleHistoryClick = async (poNo) => {
    console.log("objectpono", poNo)
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/production/productionPlanningHistory/${poNo}`
      );
      console.log("Response data:", response.data);
      // Check if historyRecords exists in the previousData object
      if (response.data.previousData && response.data.previousData.historyRecords) {
        const historyData = response.data.previousData.map((record, index) => ({
          srNo: index + 1,
          ProductionSheetName: record.productionSheetName,
          itemDescription: record.itemDescription,
          materialIssue: record.materialIssue,
          requiredResources: record.requiredResources,
          productAndCustomer: record.productAndCustomer,
          legalAndApplicable: record.legalAndApplicable,
          contingencyPlanning: record.contingencyPlanning,
          verification: record.verification,
          validation: record.validation,
          monitoring: record.monitoring,
          measurement: record.measurement,
          inspection: record.inspection,
          management: record.management,
          recordsEvidence: record.recordsEvidence,
          planningQuantity: record.planningQuantity,
          planningDate: new Date(record.planningDate).toLocaleString(
            undefined,
            { dateStyle: "long", timeStyle: "medium" }
          ), // Convert to pretty format
          achievementQuantity: record.achievementQuantity,
          selectedItem: record.selectedItem,
          achievementDate: new Date(record.achievementDate).toLocaleString(
            undefined,
            { dateStyle: "long", timeStyle: "medium" }
          ), // Convert to pretty format
          attachment: record.attachment,
          poNo: record.poNo,
          CreatedAt: new Date(record.createdAt).toLocaleString(
            undefined,
            { dateStyle: "long", timeStyle: "medium" }
          ), // Convert to pretty format
          UpdatedAt: new Date(record.updatedAt).toLocaleString(
            undefined,
            { dateStyle: "long", timeStyle: "medium" }
          ), // Convert to pretty format
          historyId: record._id,
        }));

        console.log("historyData", historyData);
        setHistoryRowData(historyData);
        setShowHistoryTable(true);
      } else {
        console.log("No history records found in the response");
        setHistoryRowData([]); // Clear history data
        setShowHistoryTable(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching history data:", error);
      setLoading(false);
    }
  }

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
    // console.log("first data", data);
    return (
      <div className="flex flex-row items-center gap-2 pt-1 ag-theme-alpine">
        <button
          // onClick={() => handleEditClick(data.CustomerPO)}
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
          onClick={() => handleHistoryClick(data.PONumber)}
          className="p-2 text-red-600 bg-yellow-200 rounded-lg"
        >
          <BsInfoCircle />
        </button>
      </div>
    );
  };

  const HistoryButton = (props) => {
    const data = props.data;
    console.log("HistoryButton", data);
    return (
      <div className="flex flex-row items-center gap-2 pt-1 ag-theme-alpine">
        {/* View Button */}
        <button
          // onClick={() => {
          //   handleViewClick(data.CustomerPO, data.historyId);
          // }}
          className="p-2 text-red-600 bg-yellow-200 rounded-lg"
        >
          <IoSearch />
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

  const HistoryColumnDefs = [
    { headerName: "Sr No", field: "srNo", minWidth: 50, maxWidth: 80 },
    { headerName: "Production Planning", field: "ProductionSheetName", flex: 1 },
    { headerName: "Created Date", field: "CreatedAt", flex: 1 },
    { headerName: "Created By", field: "UpdatedAt", flex: 1 },
    {
      headerName: "Action",
      cellRenderer: HistoryButton,
      minWidth: 150,
      maxWidth: 200,
    }
  ];

  return (
    // <div className="flex flex-col items-center justify-center">
    <div className="flex flex-col h-screen mx-4 bg-white">
      {/* Button positioned at the top right corner */}
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
        />
      </div>
      {showHistoryTable ? (
        <>
          <hr className="mx-4 mt-12 mb-6 border-t border-gray-300" />
          <div className="ag-theme-alpine px-4 w-full h-[30vh]">
            <p className="mb-2 text-xl font-bold text-start">History</p>
            <AgGridReact
              columnDefs={HistoryColumnDefs}
              rowData={historyRowData}
              pagination={true}
              paginationPageSize={10}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ProductionSheetTable;
