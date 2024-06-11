"use client";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FiArrowLeft, FiFile, FiPrinter, FiSave } from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import ConfirmPopUp from "@/components/common/ConfirmPopUp";
import ProductionReport from "@/components/PDF/ProductionReport/ProductionReport";
import ProductionReportMain from "@/components/PDF/ProductionReport/ProductionReportMain";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ProductionReportForm = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [processRowToDelete, setProcessRowToDelete] = useState(null);
  const [data, setData] = useState(null);

  const [attachment, setAttachment] = useState(null);

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setAttachment(file);
    } else {
      setAttachment(null);
      alert("Please select a PDF file.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        let response;

        // Check if there's a selected customer PO in localStorage
        const selectedRoutingSheet = localStorage.getItem(
          "selectedRoutingSheet"
        );
        console.log("selectedRoutingSheet", selectedRoutingSheet);
        if (selectedRoutingSheet) {
          const parsedRoutingSheet = JSON.parse(selectedRoutingSheet);
          console.log("_id", parsedRoutingSheet._id);
          const routingSheetIdData = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productionReport/get-production-report-by-routing-sheet/${parsedRoutingSheet._id}`
          );
          console.log("routingSheetIdData", routingSheetIdData.data);
          setData(routingSheetIdData.data);

          // Extract the _id from the response
          const firstReportId = routingSheetIdData.data._id;
          console.log("firstReportId", firstReportId);

          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productionReport/get-production-reportById/${firstReportId}`
          );
          console.log("responsebyid", response.data);
        } else {
          // Fetch all material issue slips if no customer PO is selected
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productionReport/get-all-production-report`
          );
        }

        const formattedData = response.data.processRows.map(
          (processRow, index) => {
            // Extract date and time parts from startTime
            console.log("processRow.startTime", processRow.startTime);
            const startTimeParts = processRow.startTime
              ? processRow.startTime.split(", ")
              : ["", ""];
            const datePart = startTimeParts[0];
            const timePart = startTimeParts[1];
            console.log("datePart", datePart);

            // Split the date into parts and rearrange them to format as dd/mm/yyyy if datePart exists
            const formattedDate = datePart
              ? (() => {
                const parts = datePart.split("/");
                return `${parts[1]}/${parts[0]}/${parts[2]}`;
              })()
              : "";

            // Extract Date and Time parts from endTime
            const endTimeParts = processRow.endTime
              ? processRow.endTime.split(", ")
              : ["", ""];
            const datePartForEnd = endTimeParts[0];
            const timePartForEnd = endTimeParts[1];
            console.log("datePartForEnd", datePartForEnd);

            // Split the date into parts and rearrange them to format as dd/mm/yyyy if datePart exists
            const formattedDateForEndTime = datePartForEnd
              ? (() => {
                const parts = datePartForEnd.split("/");
                return `${parts[1]}/${parts[0]}/${parts[2]}`;
              })()
              : "";
            console.log("formattedDateForEndTime", formattedDateForEndTime);

            return {
              srNo: index + 1,
              _id: processRow._id,
              productionReportId: response.data._id,
              date: formattedDate,
              operatorName: processRow.operatorName,
              processDescription: processRow.jobDescription,
              procedures: processRow.procedures || "-",
              orderQty: processRow.orderQty || "-",
              processQty: processRow.processQty || "-",
              startTime: `${formattedDate}, ${timePart}` || "-",
              // endTime: processRow.endTime,
              endTime: `${formattedDateForEndTime}, ${timePartForEnd}` || "-",
              optSign: processRow.optSign || "-",
              remarks: processRow.remarks || "-",
            };
          }
        );
        console.log("formattedData in pr", formattedData);

        setRowData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCellValueChanged = (event) => {
    const updatedRowData = [...rowData];
    updatedRowData[event.rowIndex] = {
      ...updatedRowData[event.rowIndex],
      ...event.data,
      modified: true,
    };
    setRowData(updatedRowData);
  };

  const handleSave = async () => {
    try {
      // Toggle the loading state
      setLoading(true);

      // Iterate over rowData to find the changed row
      for (const row of rowData) {
        console.log("row data in production report", row);
        // Check if the row has been modified
        if (row.modified) {
          const { productionReportId, _id, ...updatedProcessRowData } = row;
          console.log("updatedProcessRowData in production report", updatedProcessRowData)
          // Create a FormData object
          const formData = new FormData();

          // Append the updated process row data
          for (const key in updatedProcessRowData) {
            if (updatedProcessRowData.hasOwnProperty(key)) {
              formData.append(key, updatedProcessRowData[key]);
            }
          }

          // Append the production report ID and process row ID
          formData.append("productionReportId", productionReportId);
          formData.append("processRowId", _id);

          // Append the attachment if it exists
          if (attachment) {
            formData.append("attachment", attachment);
            // formData.append("attachmentPoNo", updatedProcessRowData.poNo); // Include the poNo for the file destination
            // Get poNo from data state
            console.log("data in handle save", data)
            console.log("data in handle save PONO", data.poNo)
            const poNo = data ? data.poNo : null;
            formData.append("attachmentPoNo", poNo);
          }
          console.log("formData in production report", formData)
          await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productionReport/${productionReportId}/${_id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          console.log("Process row updated successfully:", row);

          // Reset the modified flag
          row.modified = false;
        }
      }

      router.push('/production/production-report');
    } catch (error) {
      console.error("Error updating process row:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (processRowId, productionReportId) => {
    setProcessRowToDelete({ processRowId, productionReportId });
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    const { processRowId, productionReportId } = processRowToDelete;
    try {
      console.log("Deleting process row:", processRowId);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productionReport/${productionReportId}/${processRowId}`
      );
      const updatedRowData = rowData.filter((row) => row._id !== processRowId);
      setRowData(updatedRowData);
      console.log("Process row deleted successfully");
    } catch (error) {
      console.log("Error deleting process row:", error);
    }
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  const CustomButtonComponent = (props) => {
    console.log("props.data in production report", props.data);
    console.log("props.data._id", props.data._id);
    console.log("props.data.productionReportId", props.data.productionReportId);
    return (
      <div className="flex flex-row items-center gap-2 pt-1 ag-theme-alpine">
        <button
          className="p-2 text-red-600 bg-red-200 rounded-lg"
          onClick={() =>
            handleDelete(props.data._id, props.data.productionReportId)
          }
        >
          <RiDeleteBin5Line />
        </button>
      </div>
    );
  };

  const columnDefs = [
    {
      headerName: "Sr No",
      field: "srNo",
      editable: false,
      minWidth: 50,
      maxWidth: 80,
      pinned: "left",
    },
    {
      headerName: "Operator Name/Supplier",
      field: "operatorName",
      editable: true,
      pinned: "left",
    },
    {
      headerName: "Job DESCRIPTION",
      field: "processDescription",
      editable: true,
      pinned: "left",
    },
    {
      headerName: "PROCEDURE NO/DRAWING NO/REPORT NO.",
      field: "procedures",
      editable: true,
    },
    { headerName: "ORDER QTY (NOS)", field: "orderQty", editable: true },
    { headerName: "PROCESS QTY (NOS)", field: "processQty", editable: true },
    { headerName: "START TIME", field: "startTime", editable: true },
    { headerName: "END TIME", field: "endTime", editable: true },
    { headerName: "OPT SIGN", field: "optSign", editable: true },
    { headerName: "REMARKS", field: "remarks", editable: true },
    { headerName: "Delete", cellRenderer: CustomButtonComponent },
  ];

  console.log("Final output in PR", rowData);
  console.log("Final data in PR", data);
  return (
    <div className="flex flex-col mx-4 bg-white">
      <button
        onClick={handleGoBack}
        className="flex items-center px-4 py-2 mb-2 text-lg font-bold text-black"
      >
        <FiArrowLeft className="mr-2" />
        Back
      </button>
      <div className="ag-theme-alpine px-4 w-full h-[75vh]">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          paginationPageSize={20}
          onCellValueChanged={handleCellValueChanged}
        />
      </div>
      <hr className="my-4 border-t border-gray-300" />
      {/* <Container> */}
      <div className="flex justify-between mx-4 mb-4 max-w-screen-full">
        <div className="flex items-center">
          <input
            type="file"
            id="attachment"
            className="hidden"
            name="attachment"
            accept="application/pdf"
            onChange={handleFileSelection}
          />
          <button
            onClick={() => document.getElementById("attachment").click()}
            className="flex items-center px-4 py-2 mr-4 text-black bg-gray-300 rounded"
          >
            Attachment
            <FiFile className="ml-2" />
          </button>
          {attachment && (
            <div className="flex items-center">
              <span className="mr-2">{attachment.name || attachment.fileName}</span>
              <button
                onClick={() => setAttachment(null)}
                className="flex items-center text-red-600 bg-none"
              >
                <IoIosCloseCircleOutline className="ml-2 text-2xl" />
              </button>
            </div>
          )}
        </div>
        <div className="flex">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`flex items-center px-4 py-2 mr-4 text-black bg-gray-300 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Saving..." : "Save"}
            <FiSave className="ml-2" />
          </button>

          {data && (
            <PDFDownloadLink
              document={<ProductionReport data={data} />}
              fileName={`ProductionReport_${data.poNo}.pdf`}
            >
              <button
                className="flex items-center px-4 py-2 text-black bg-gray-300 rounded"
                onClick={() => {
                  console.log(data?.rowData);
                }}
              >
                Print
                <FiPrinter className="ml-2" />
              </button>
            </PDFDownloadLink>
          )}
        </div>
      </div>
      {showConfirmDelete && (
        <ConfirmPopUp
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default ProductionReportForm;
