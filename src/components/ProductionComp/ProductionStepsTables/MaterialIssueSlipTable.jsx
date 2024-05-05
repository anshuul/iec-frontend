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

const MaterialIssueSlipTable = ({ productionStep }) => {
  console.log("productionStep", productionStep);
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyRowData, setHistoryRowData] = useState([]);
  const [showHistoryTable, setShowHistoryTable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response;

        // Check if there's a selected customer PO in localStorage
        const selectedCustomerPO = localStorage.getItem("selectedCustomerPO");
        if (selectedCustomerPO) {
          const parsedCustomerPO = JSON.parse(selectedCustomerPO);
          console.log("poNo", parsedCustomerPO.poNo);
          // Fetch material issue slips based on the selected customer PO
          response = await axios.get(
            `http://localhost:8000/api/materialissueslip/get-materialIssueSlip/${parsedCustomerPO.poNo}`
          );
        } else {
          // Fetch all material issue slips if no customer PO is selected
          response = await axios.get(
            "http://localhost:8000/api/materialissueslip/get-materialIssueSlip"
          );
        }

        const materialIssueSlips = response.data;
        // Generate srNo for each material issue slip
        const formattedData = materialIssueSlips.map((issueSlip, index) => {
          let size = "N/A";
          if (issueSlip.size && issueSlip.size.diameter) {
            size = `${issueSlip.size.diameter.value}x${issueSlip.size.length.value}`;
          }

          return {
            srNo: index + 1,
            _id: issueSlip._id,
            PONumber: issueSlip.poNo,
            MaterialSlipName: issueSlip.materialSlipName,
            ItemDesc: issueSlip.itemDescription,
            MaterialGrade: issueSlip.materialGrade,
            Size: size,
            QuantityRequired: issueSlip.quantityRequired,
            QuantityIssued: issueSlip.quantityIssued,
            Remarks: "-",
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

  const handleClick = () => {
    router.push(`/production/${productionStep}/materialIssueForm`);
  };

  const handleEditClick = (_id) => {
    router.push(
      `/production/material-issue-slip/materialIssueFormUpdate?id=${_id}`
    );
  };

  const handleHistoryClick = async (poNo) => {
    console.log("objectpono", poNo)
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/materialissueslip/materialIssueSlipHistory/${poNo}`
      );
      const historyData = response.data.historyRecords.map((record, index) => ({
        srNo: index + 1,
        CustomerPO: record.poNo,
        CustomerName: record.previousData.customerName,
        PONumber: record.previousData.poNo,
        MaterialSlipName: record.previousData.materialSlipName,
        ItemDescription: record.previousData.itemDescription,
        MaterialGrade: record.previousData.materialGrade,
        Size: record.previousData.size,
        QuantityRequired: record.previousData.quantityRequired,
        QuantityIssued: record.previousData.quantityIssued,
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
      console.log("historyData", historyData)
      setHistoryRowData(historyData);
      setShowHistoryTable(true);
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
        `http://localhost:8000/api/materialissueslip/delete-materialissueslipbyid/${data._id}`
      );
      const updatedRows = rowData.filter((row) => row !== data);
      setRowData(updatedRows);
    } catch (error) {
      console.error("Error deleting data:", error);
      setLoading(false);
    }
  }

  const CustomButtonComponent = (props) => {
    const data = props.data;

    console.log("MaterialData", data);
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
    { headerName: "Sr No", field: "srNo", maxWidth: 80 },
    { headerName: "Action", cellRenderer: CustomButtonComponent },
    { headerName: "PO Number", field: "PONumber" },
    { headerName: "MaterialSlip Name", field: "MaterialSlipName" },
    { headerName: "Item Desc", field: "ItemDesc" },
    { headerName: "Material Grade", field: "MaterialGrade" },
    { headerName: "Size", field: "Size" },
    { headerName: "Quantity Required", field: "QuantityRequired" },
    { headerName: "Quantity Issued", field: "QuantityIssued" },
    { headerName: "Remarks", field: "Remarks" },
  ];

  const HistoryColumnDefs = [
    { headerName: "Sr No", field: "srNo", maxWidth: 80 },
    { headerName: "PO Number", field: "PONumber" },
    { headerName: "MaterialSlip Name", field: "MaterialSlipName" },
    { headerName: "Item Desc", field: "ItemDesc" },
    { headerName: "Material Grade", field: "MaterialGrade" },
    { headerName: "Size", field: "Size" },
    { headerName: "Quantity Required", field: "QuantityRequired" },
    { headerName: "Quantity Issued", field: "QuantityIssued" },
    { headerName: "Remarks", field: "Remarks" },
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

export default MaterialIssueSlipTable;
