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

const POListItemTable = ({ productionStep }) => {
    const router = useRouter();
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        router.push(`/production/${productionStep}/POListItemForm`);
    };

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
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customerPO/get-listItem/${parsedCustomerPO.poNo}`
                    );
                }

                setRowData(
                    response.data.listItem.map((item, index) => ({
                        srNo: index + 1,
                        POListNo: item.listItemNo,
                        orderDate: new Date(item.orderDate).toLocaleString(),
                        createdBy: item.createdBy,
                        createdAt: new Date(item.createdAt).toLocaleString(),
                        _id: item._id
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

    const handleEditClick = (_id) => {
        router.push(
            `/production/production-planning-sheets/productionSheetFormUpdate?id=${_id}`
        );
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
                {/* Delete Button */}
                <button className="p-2 text-red-600 bg-red-200 rounded-lg">
                    <RiDeleteBin5Line />
                </button>
                {/* History Button */}
                <button className="p-2 text-red-600 bg-yellow-200 rounded-lg">
                    <BsInfoCircle />
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
            sort: "desc",
        },
        {
            headerName: "Action",
            cellRenderer: CustomButtonComponent,
            minWidth: 150,
            maxWidth: 200,
        },
        { headerName: "POList No", field: "POListNo", flex: 1 },
        { headerName: "Order Date", field: "orderDate", flex: 1 },
        { headerName: "Created Date", field: "createdAt", flex: 1 },
        { headerName: "Created By", field: "createdBy", flex: 1 },
    ];

    const onRowClicked = (event) => {
        const selectedRoutingSheet = event.data;
        localStorage.setItem(
            "selectedPOListItem",
            JSON.stringify(selectedRoutingSheet)
        );
    };

    return (
        <div className="flex flex-col h-[85VH] mx-4 bg-white">
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
                    onRowClicked={onRowClicked}
                    rowSelection="single"
                />
            </div>
        </div>
    );
};

export default POListItemTable;
