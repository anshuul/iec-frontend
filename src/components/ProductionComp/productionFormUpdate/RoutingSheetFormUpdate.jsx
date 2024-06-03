"use client";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FiArrowLeft, FiFile, FiPrinter, FiSave } from "react-icons/fi";
import { TiPlus } from "react-icons/ti";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import RoutingSheetNut from "@/components/PDF/RoutingSheet/RoutingSheetNut";
import RoutingSheetStud from "@/components/PDF/RoutingSheet/RoutingSheetStud";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import ConfirmPopUp from "@/components/common/ConfirmPopUp";

const RoutingSheetFormUpdate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log("Final id for update routing form", id);
  // Retrieve production report from Redux store
  const productionReportSliceDataForRouting = useSelector(
    (state) => state.productionReport.data
  );
  console.log(
    "productionReportSliceDataForRouting in routing",
    productionReportSliceDataForRouting
  );

  const handleGoBack = () => {
    router.back();
  };

  const [rowData, setRowData] = useState([]);
  const [routingSheet, setRoutingSheet] = useState({});
  const [attachment, setAttachment] = useState(null);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [processRowToDelete, setProcessRowToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/routingSheet/get-routingSheetById/${id}`
        );
        const responseData = Array.isArray(response.data)
          ? response.data
          : [response.data];
        console.log("responseData routing", responseData[0]);

        const newRows = responseData[0]?.processRows.map((row, index) => {
          let startTime = "";
          let endTime = "";
          let operatorName = "";
          let procedureNo = "";
          let orderQty = "";
          let processQty = "";

          console.log("start new Rows");
          // Check if routingSheetNo starts with "Stud" or "Nut"
          if (row.routingSheetNo.startsWith("Stud")) {
            startTime =
              productionReportSliceDataForRouting[0]?.processRows[index]
                ?.startTime || "";
            endTime =
              productionReportSliceDataForRouting[0]?.processRows[index]
                ?.endTime || "";
            operatorName =
              productionReportSliceDataForRouting[0]?.processRows[index]
                ?.operatorName || "";
            // processDescription =
            //   productionReportSliceDataForRouting[0]?.processRows[index]
            //     ?.jobDescription || "";
            procedureNo =
              productionReportSliceDataForRouting[0]?.processRows[index]
                ?.procedures || "";
            orderQty =
              productionReportSliceDataForRouting[0]?.processRows[index]
                ?.orderQty || "";
            processQty =
              productionReportSliceDataForRouting[0]?.processRows[index]
                ?.processQty || "";
          } else if (row.routingSheetNo.startsWith("Nut")) {
            // Handle the single-element case efficiently
            if (productionReportSliceDataForRouting.length === 1) {
              const processRow =
                productionReportSliceDataForRouting[0]?.processRows?.[index];
              if (processRow) {
                startTime = processRow.startTime || "";
                endTime = processRow.endTime || "";
                operatorName = processRow.operatorName || "";
                procedureNo = processRow.procedures || "";
                orderQty = processRow.orderQty || "";
                processQty = processRow.processQty || "";
              } else {
                console.warn(
                  "No matching process row found for 'Nut' routing sheet (single element)"
                );
              }
            } else {
              // Handle multiple elements (including case with length 2)
              const matchingProcessRow =
                productionReportSliceDataForRouting.find(
                  (dataItem) => dataItem?.processRows?.[index]
                );

              if (matchingProcessRow) {
                const processRow = matchingProcessRow.processRows[index];
                startTime = processRow.startTime || "";
                endTime = processRow.endTime || "";
                operatorName = processRow.operatorName || "";
                procedureNo = processRow.procedures || "";
                orderQty = processRow.orderQty || "";
                processQty = processRow.processQty || "";
              } else {
                console.warn(
                  "No matching process row found for 'Nut' routing sheet (multiple elements)"
                );
              }
            }
          }

          return {
            ...row,
            srNo: index + 1,
            startTime,
            endTime,
            operatorName,
            procedureNo,
            orderQty,
            processQty,
            processRowNumber: index + 1,
            routingSheetId: responseData[0]._id,
          };
        });

        console.log("newRows in Routing", newRows);

        setRowData(newRows);
        setRoutingSheet(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, productionReportSliceDataForRouting]);

  const handleAddRow = () => {
    const newRowData = {
      srNo: rowData.length + 1,
      date: "",
      operatorName: "",
      machineNo: "",
      processDescription: "",
      procedureNo: "",
      orderQty: 0,
      processQty: 0,
      startTime: "",
      endTime: "",
      optSign: "",
      remarks: "",
      poNo: "",
      routingSheetNumber: 0,
      processRowNumber: rowData.length + 1, // Update processRowNumber
    };
    setRowData([...rowData, newRowData]);
  };

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setAttachment(file);
    } else {
      setAttachment(null);
      alert("Please select a PDF file.");
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      const updatedData = { ...routingSheet, processRows: rowData };
      console.log("updatedData in routing sheet handleSave", updatedData);
      formData.append("routingSheetId", id);
      formData.append("newData", updatedData);
      if (attachment) {
        formData.append("attachment", attachment);
        formData.append("attachmentPoNo", routingSheet.poNo); // Include the poNo for the file destination
      }

      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/routingSheet/update-generated-routingsheet/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Routing sheet updated successfully");
    } catch (error) {
      console.error("Error updating routing sheet:", error);
      alert("Failed to update routing sheet");
    }
  };

  const handleDelete = (processRowId, routingSheetId) => {
    setProcessRowToDelete({ processRowId, routingSheetId });
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    const { processRowId, routingSheetId } = processRowToDelete;
    try {
      console.log("Deleting process row:", processRowId);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/routingSheet/delete-processRow/${routingSheetId}/${processRowId}`
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
    return (
      <div className="flex flex-row items-center gap-2 pt-1 ag-theme-alpine">
        <button
          onClick={() =>
            handleDelete(props.data._id, props.data.routingSheetId)
          }
          className="p-2 text-red-600 bg-red-200 rounded-lg"
        >
          <RiDeleteBin5Line />
        </button>
      </div>
    );
  };

  const columnDefs = [
    {
      headerName: "Sr No",
      field: "processRowNumber",
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
      headerName: "PROCESS DESCRIPTION",
      field: "processDescription",
      editable: true,
      pinned: "left",
    },
    {
      headerName: "Machine No/Instrument No",
      field: "machineNo",
      editable: true,
    },
    {
      headerName: "PROCEDURE NO/DRAWING NO/REPORT NO.",
      field: "procedureNo",
      editable: true,
    },
    { headerName: "ORDER QTY", field: "orderQty", editable: true },
    { headerName: "PROCESS QTY", field: "processQty", editable: true },
    { headerName: "START TIME", field: "startTime", editable: true },
    { headerName: "END TIME", field: "endTime", editable: true },
    { headerName: "OPT SIGN", field: "optSign", editable: true },
    { headerName: "REMARKS", field: "remarks", editable: true },
    { headerName: "Delete", cellRenderer: CustomButtonComponent },
  ];
  console.log("PDF Row Data", rowData);
  console.log("routingSheet PDF Row Data", routingSheet);
  return (
    <div className="flex flex-col mx-4 bg-white">
      <button
        onClick={handleGoBack}
        className="flex items-center px-4 py-2 mb-2 text-lg font-bold text-black"
      >
        <FiArrowLeft className="mr-2" />
        Back
      </button>
      <button
        onClick={handleAddRow}
        className="flex items-center px-4 py-2 mb-2 text-lg font-bold text-black"
      >
        <TiPlus className="mr-2" />
        Add Row
      </button>
      <div className="ag-theme-alpine px-4 w-full h-[75vh]">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
      <hr className="my-4 border-t border-gray-300" />
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
              <span className="mr-2">{attachment.name}</span>
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
            className="flex items-center px-4 py-2 mr-4 text-black bg-gray-300 rounded"
          >
            Save
            <FiSave className="ml-2" />
          </button>
          <PDFDownloadLink
            document={<RoutingSheetStud data={rowData} />}
            fileName={`RoutingSheet_${id}.pdf`}
          >
            <button
              className="flex items-center px-4 py-2 text-black bg-gray-300 rounded"
              onClick={() => console.log(rowData)}
            >
              Print
              <FiPrinter className="ml-2" />
            </button>
          </PDFDownloadLink>
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

export default RoutingSheetFormUpdate;
