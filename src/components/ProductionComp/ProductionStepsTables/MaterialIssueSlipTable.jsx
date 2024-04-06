"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const MaterialIssueSlipTable = ({ productionStep }) => {
  console.log("productionStep", productionStep);
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);

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
            size = `${JSON.parse(issueSlip.size.diameter).value}x${
              JSON.parse(issueSlip.size.length).value
            }`;
          }

          return {
            srNo: index + 1,
            _id: issueSlip._id,
            PONumber: issueSlip.poNo,
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
      `/production/production-planning-sheets/materialIssueFormUpdate?id=${_id}`
    );
  };

  const CustomButtonComponent = (props) => {
    const data = props.data;
    console.log("MaterialData", data);
    return (
      <div className="ag-theme-alpine flex flex-row gap-2 items-center pt-1">
        <button
          onClick={() => handleEditClick(data._id)}
          className="p-2 bg-green-200 rounded-lg text-green-600"
        >
          <MdModeEdit />
        </button>
        <button
          onClick={() => window.alert("clicked")}
          className="p-2 bg-red-200 rounded-lg text-red-600"
        >
          <RiDeleteBin5Line />
        </button>
      </div>
    );
  };

  const columnDefs = [
    { headerName: "Sr No", field: "srNo", maxWidth: 80 },
    { headerName: "PO Number", field: "PONumber" },
    { headerName: "Item Desc", field: "ItemDesc" },
    { headerName: "Material Grade", field: "MaterialGrade" },
    { headerName: "Size", field: "Size" },
    { headerName: "Quantity Required", field: "QuantityRequired" },
    { headerName: "Quantity Issued", field: "QuantityIssued" },
    { headerName: "Remarks", field: "Remarks" },
    { headerName: "Action", cellRenderer: CustomButtonComponent },
  ];

  // const rowData = [
  // {
  //   srNo: 1,
  //   PONumber: "PO123",
  //   ItemDesc: "Item 1",
  //   MaterialGrade: "Grade A",
  //   Size: "10x10",
  //   QuantityRequired: 100,
  //   QuantityIssued: 90,
  //   Remarks: "-",
  // },
  //   {
  //     srNo: 2,
  //     PONumber: "PO456",
  //     ItemDesc: "Item 2",
  //     MaterialGrade: "Grade B",
  //     Size: "20x20",
  //     QuantityRequired: 150,
  //     QuantityIssued: 120,
  //     Remarks: "-",
  //   },
  //   {
  //     srNo: 3,
  //     PONumber: "PO789",
  //     ItemDesc: "Item 3",
  //     MaterialGrade: "Grade C",
  //     Size: "30x30",
  //     QuantityRequired: 200,
  //     QuantityIssued: 180,
  //     Remarks: "-",
  //   },
  //   {
  //     srNo: 4,
  //     PONumber: "PO101112",
  //     ItemDesc: "Item 4",
  //     MaterialGrade: "Grade D",
  //     Size: "40x40",
  //     QuantityRequired: 250,
  //     QuantityIssued: 200,
  //     Remarks: "-",
  //   },
  //   {
  //     srNo: 5,
  //     PONumber: "PO131415",
  //     ItemDesc: "Item 5",
  //     MaterialGrade: "Grade E",
  //     Size: "50x50",
  //     QuantityRequired: 300,
  //     QuantityIssued: 250,
  //     Remarks: "-",
  //   },
  //   {
  //     srNo: 6,
  //     PONumber: "PO161718",
  //     ItemDesc: "Item 6",
  //     MaterialGrade: "Grade F",
  //     Size: "60x60",
  //     QuantityRequired: 350,
  //     QuantityIssued: 300,
  //     Remarks: "-",
  //   },
  //   {
  //     srNo: 7,
  //     PONumber: "PO192021",
  //     ItemDesc: "Item 7",
  //     MaterialGrade: "Grade G",
  //     Size: "70x70",
  //     QuantityRequired: 400,
  //     QuantityIssued: 350,
  //     Remarks: "-",
  //   },
  //   {
  //     srNo: 8,
  //     PONumber: "PO222324",
  //     ItemDesc: "Item 8",
  //     MaterialGrade: "Grade H",
  //     Size: "80x80",
  //     QuantityRequired: 450,
  //     QuantityIssued: 400,
  //     Remarks: "-",
  //   },
  //   {
  //     srNo: 9,
  //     PONumber: "PO252627",
  //     ItemDesc: "Item 9",
  //     MaterialGrade: "Grade I",
  //     Size: "90x90",
  //     QuantityRequired: 500,
  //     QuantityIssued: 450,
  //     Remarks: "-",
  //   },
  //   {
  //     srNo: 10,
  //     PONumber: "PO282930",
  //     ItemDesc: "Item 10",
  //     MaterialGrade: "Grade J",
  //     Size: "100x100",
  //     QuantityRequired: 550,
  //     QuantityIssued: 500,
  //     Remarks: "-",
  //   },
  // ];

  return (
    // <div className="flex flex-col justify-center items-center">
    <div className="flex flex-col mx-4 bg-white">
      {/* Button positioned at the top right corner */}
      <button
        className="self-end m-4 bg-gray-400 px-4 py-2 rounded-lg"
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
    </div>
  );
};

export default MaterialIssueSlipTable;
