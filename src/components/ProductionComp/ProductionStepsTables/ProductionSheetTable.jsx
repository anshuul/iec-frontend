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
        const selectedPOListItem = localStorage.getItem("selectedPOListItem");

        if (selectedPOListItem) {
          const parsedPOListItem = JSON.parse(selectedPOListItem);
          console.log("poNo", parsedPOListItem.poNo);
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/production/get-planningSheetBy-listItemNo?poNo=${parsedPOListItem.poNo}&listItemNo=${parsedPOListItem.POListNo}`
          );
        } else {
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/production/get-planningSheet`
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

  const handleClick = () => {
    router.push(`/production/${productionStep}/productionSheetForm`);
  };

  const handleEditClick = (_id) => {
    router.push(
      `/production/production-planning-sheets/productionSheetFormUpdate?id=${_id}`
    );
  };

  const handleHistoryClick = async (_id) => {
    console.log("object _id", _id);
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/production/productionPlanningHistoryBypreviousDataId/${_id}`
      );
      console.log("Response data:", response.data);

      const historyData = response.data.map((record, index) => ({
        srNo: index + 1,
        ProductionSheetName: record.previousData.productionSheetName,
        itemDescription: record.previousData.itemDescription,
        materialIssue: record.previousData.materialIssue,
        requiredResources: record.previousData.requiredResources,
        productAndCustomer: record.previousData.productAndCustomer,
        legalAndApplicable: record.previousData.legalAndApplicable,
        contingencyPlanning: record.previousData.contingencyPlanning,
        verification: record.previousData.verification,
        validation: record.previousData.validation,
        monitoring: record.previousData.monitoring,
        measurement: record.previousData.measurement,
        inspection: record.previousData.inspection,
        management: record.previousData.management,
        recordsEvidence: record.previousData.recordsEvidence,
        planningQuantity: record.previousData.planningQuantity,
        planningDate: new Date(record.previousData.planningDate).toLocaleString(
          undefined,
          {
            dateStyle: "long",
            timeStyle: "medium",
          }
        ),
        orderDate: new Date(record.previousData.orderDate).toLocaleString(
          undefined,
          {
            dateStyle: "long",
            timeStyle: "medium",
          }
        ),
        achievementQuantity: record.previousData.achievementQuantity,
        selectedItem: record.previousData.selectedItem,
        achievementDate: new Date(
          record.previousData.achievementDate
        ).toLocaleString(undefined, { dateStyle: "long", timeStyle: "medium" }),
        attachment: record.previousData.attachment,
        poNo: record.poNo,
        UpdatedAt: new Date(record.updatedAt).toLocaleString(undefined, {
          dateStyle: "long",
          timeStyle: "medium",
        }),
        historyId: record._id,
      }));
      console.log("historyData planning", historyData);
      setHistoryRowData(historyData);
      setShowHistoryTable(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching history data:", error);
      setLoading(false);
    }
  };

  const handleDeleteClick = async (data) => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/production/delete-planningSheetById/${data._id}`
      );
      const updatedRows = rowData.filter((row) => row !== data);
      setRowData(updatedRows);
      setLoading(false);
    } catch (error) {
      console.error("Error deleting data:", error);
      setLoading(false);
    }
  };

  // Function to close the history modal
  const closeModal = () => {
    setShowHistoryTable(false);
  };

  const CustomButtonComponent = (props) => {
    const data = props.data;
    console.log("data.PONumber", data.PONumber);
    // console.log("data.all", data);
    console.log("data.id", data._id);
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
          onClick={() => handleHistoryClick(data._id)}
          className="p-2 text-red-600 bg-yellow-200 rounded-lg"
        >
          <BsInfoCircle />
        </button>
      </div>
    );
  };

  const handleViewClick = (historyId) => {
    router.push(
      `/production/production-planning-sheets/planningSheet-history?historyId=${historyId}`
    );
    // router.push(`/production/productionForm/view`);
  };

  const HistoryButton = (props) => {
    const data = props.data;
    console.log("data.CustomerPO", data);
    console.log("data.historyId", data.historyId);
    return (
      <div className="flex flex-row items-center gap-2 pt-1 ag-theme-alpine">
        {/* View Button */}
        <button
          onClick={() => {
            handleViewClick(data.historyId);
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
      // sort: "desc",
    },
    {
      headerName: "Action",
      cellRenderer: CustomButtonComponent,
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Production Planning", field: "ProductionPlanning", flex: 1 },
    { headerName: "Created Date", field: "CreatedDate", flex: 1 },
    { headerName: "Created By", field: "CreatedBy", flex: 1 },
  ];

  const HistoryColumnDefs = [
    {
      headerName: "Sr No",
      field: "srNo",
      minWidth: 50,
      maxWidth: 80,
      sort: "desc",
    },
    {
      headerName: "Production Planning",
      field: "ProductionSheetName",
      flex: 1,
    },
    { headerName: "Created Date", field: "orderDate", flex: 1 },
    { headerName: "Created By", field: "UpdatedAt", flex: 1 },
    {
      headerName: "Action",
      cellRenderer: HistoryButton,
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  return (
    // <div className="flex flex-col items-center justify-center">
    <div className="flex flex-col h-[85VH] mx-4 bg-white">
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
          paginationPageSize={15}
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

export default ProductionSheetTable;
