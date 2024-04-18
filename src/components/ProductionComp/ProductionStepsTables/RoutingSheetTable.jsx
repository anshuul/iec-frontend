"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const RoutingSheetTable = ({ productionStep }) => {
  console.log("productionStep", productionStep);
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const gridApiRef = useRef(null);

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
            CreatedBy: item.operatorName || "Vishal",
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

  console.log("rowData2", rowData)
  useEffect(() => {
    const fetchProductionReports = async () => {
      try {
        console.log("Fetching production reports for each row...");
        const promises = rowData.map(async (item) => {
          const response = await axios.get(
            `http://localhost:8000/api/productionReport/get-production-report-by-routing-sheet/${item._id}`
          );
          console.log("response.data", response.data)
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
    router.push(`/production/routing-sheet/routingSheetFormUpdate?id=${_id}`);
  };

  const CustomButtonComponent = (props) => {
    const data = props.data;

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
      </div>
    );
  };

  const columnDefs = [
    { headerName: "Sr No", field: "srNo", minWidth: 50, maxWidth: 80 },
    { headerName: "Routing Sheets", field: "RoutingSheets", flex: 1 },
    { headerName: "Created Data", field: "CreatedData", flex: 1 },
    { headerName: "Created By", field: "CreatedBy", flex: 1 },
    {
      headerName: "Action",
      cellRenderer: CustomButtonComponent,
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const onSelectionChanged = async () => {
    const selectedRows = gridApiRef.current.getSelectedRows(); // Access gridApi using ref

    if (selectedRows.length > 0) {
      const selectedRoutingSheet = selectedRows[0]._id;
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/routingSheet/get-routingSheetById/${selectedRoutingSheet}`
        );
        const RoutingData = response.data; // No need for extra property
        localStorage.setItem(
          "selectedRoutingSheet",
          JSON.stringify(RoutingData)
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching routing sheet data:", error);
        setLoading(false);
      }
    }
  };

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
        // onSelectionChanged={onSelectionChanged}
        // onGridReady={(params) => (gridApiRef.current = params.api)}
        />
      </div>
    </div>
  );
};

export default RoutingSheetTable;
