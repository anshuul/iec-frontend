"use client";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FiArrowLeft, FiPrinter, FiSave } from "react-icons/fi";
import { TiPlus } from "react-icons/ti";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import RoutingSheetNut from "@/components/PDF/RoutingSheet/RoutingSheetNut";
import RoutingSheetStud from "@/components/PDF/RoutingSheet/RoutingSheetStud";
import { PDFDownloadLink } from "@react-pdf/renderer";

const RoutingSheetFormUpdate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log("Final id for update routing form", id);
  // Retrieve production report from Redux store
  const productionReportSliceDataForRouting = useSelector(
    (state) => state.productionReport.data
  );

  const handleGoBack = () => {
    router.back();
  };

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/routingSheet/get-routingSheetById/${id}`
        );
        const responseData = Array.isArray(response.data)
          ? response.data
          : [response.data];
        console.log("responseData routing", responseData);

        const newRows = responseData[0]?.processRows.map((row, index) => {
          let startTime = "";
          let endTime = "";
          let operatorName = "";
          let processDescription = "";
          let procedureNo = "";
          let orderQty = "";
          let processQty = "";

          // Check if routingSheetNo starts with "Stud" or "Nut"
          if (row.routingSheetNo.startsWith("Stud")) {
            startTime =
              productionReportSliceDataForRouting[0][0]?.processRows[index]
                ?.startTime || "";
            endTime =
              productionReportSliceDataForRouting[0][0]?.processRows[index]
                ?.endTime || "";
            operatorName =
              productionReportSliceDataForRouting[0][0]?.processRows[index]
                ?.operatorName || "";
            processDescription =
              productionReportSliceDataForRouting[0][0]?.processRows[index]
                ?.jobDescription || "";
            procedureNo =
              productionReportSliceDataForRouting[0][0]?.processRows[index]
                ?.procedures || "";
            orderQty =
              productionReportSliceDataForRouting[0][0]?.processRows[index]
                ?.orderQty || "";
            processQty =
              productionReportSliceDataForRouting[0][0]?.processRows[index]
                ?.processQty || "";
          } else if (row.routingSheetNo.startsWith("Nut")) {
            startTime =
              productionReportSliceDataForRouting[1][1]?.processRows[index]
                ?.startTime || "";
            endTime =
              productionReportSliceDataForRouting[1][1]?.processRows[index]
                ?.endTime || "";
            operatorName =
              productionReportSliceDataForRouting[1][1]?.processRows[index]
                ?.operatorName || "";
            processDescription =
              productionReportSliceDataForRouting[1][1]?.processRows[index]
                ?.jobDescription || "";
            procedureNo =
              productionReportSliceDataForRouting[1][1]?.processRows[index]
                ?.procedures || "";
            orderQty =
              productionReportSliceDataForRouting[1][1]?.processRows[index]
                ?.processQty || "";
            processQty =
              productionReportSliceDataForRouting[1][1]?.processRows[index]
                ?.processQty || "";
          }

          return {
            ...row,
            srNo: index + 1,
            startTime,
            endTime,
            operatorName,
            processDescription,
            procedureNo,
            orderQty,
            processQty,
            processRowNumber: index + 1,
          };
        });

        setRowData(newRows || []);
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

  const columnDefs = [
    {
      headerName: "Sr No",
      field: "processRowNumber",
      editable: false,
      minWidth: 50,
      maxWidth: 80,
      pinned: "left",
    },
    // { headerName: "Date", field: "date", editable: true },
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
  ];
  console.log("PDF Row Data", rowData);
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
      <div className="flex justify-end mx-4 max-w-screen-full">
        <button className="flex items-center px-4 py-2 mr-4 text-black bg-gray-300 rounded">
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
  );
};

export default RoutingSheetFormUpdate;
