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

const POListItemTable = ({ productionStep }) => {
    const router = useRouter();
    const [rowData, setRowData] = useState([]);

    // History States
    const [showHistoryTable, setShowHistoryTable] = useState(false);
    const [historyRowData, setHistoryRowData] = useState([]);


    const [loading, setLoading] = useState(false);

    // Function to close the history modal
    const closeModal = () => {
        setShowHistoryTable(false);
    };


    const handleClick = () => {
        router.push(`/production/${productionStep}/POListItemForm`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let response;
                const selectedCustomerPO = localStorage.getItem("selectedCustomerPO");
                const parsedCustomerPO = JSON.parse(selectedCustomerPO);

                if (selectedCustomerPO) {
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
                        _id: item._id,
                        poNo: parsedCustomerPO.poNo
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

    const handleEditClick = (_id, poNo, POListNo) => {
        router.push(
            `/production/po-list-item/POListItemFormUpdate?id=${_id}&poNo=${poNo}&POListNo=${POListNo}`
        );
    };

    const handleHistoryClick = async (poNo, POListNo) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customerPO/POListItemHistory/${poNo}/${POListNo}`
            );

            console.log("handleHistoryClick response", response.data);
            const historyData = response.data.historyRecords.map((record, index) => ({
                srNo: index + 1,
                poNo: record.poNo,
                listItemNo: record.previousData.listItemNo,
                POListNo: record.previousData.listItemNo,
                CreatedAt: new Date(record.previousData.createdAt).toLocaleString(
                    undefined,
                    { dateStyle: "long", timeStyle: "medium" }
                ), // Convert to pretty format
                UpdatedAt: new Date(record.previousData.updatedAt).toLocaleString(
                    undefined,
                    { dateStyle: "long", timeStyle: "medium" }
                ),
                CreatedBy: record.previousData.createdBy,
                historyId: record._id,
            }));
            setHistoryRowData(historyData);
        } catch (error) {
            console.error("Error fetching history data:", error);
            setHistoryRowData([]);
        } finally {
            setLoading(false);
            setShowHistoryTable(true);
        }
    };

    const CustomButtonComponent = (props) => {
        const data = props.data;
        return (
            <div className="flex flex-row items-center gap-2 pt-1 ag-theme-alpine">
                <button
                    onClick={() => handleEditClick(data._id, data.poNo, data.POListNo)}
                    className="p-2 text-green-600 bg-green-200 rounded-lg"
                >
                    <MdModeEdit />
                </button>
                {/* Delete Button */}
                <button className="p-2 text-red-600 bg-red-200 rounded-lg">
                    <RiDeleteBin5Line />
                </button>
                {/* History Button */}
                <button
                    onClick={() => handleHistoryClick(data.poNo, data.POListNo)}
                    className="p-2 text-red-600 bg-yellow-200 rounded-lg"
                >
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
        { headerName: "PO No", field: "poNo", flex: 1 },
        { headerName: "Order Date", field: "orderDate", flex: 1 },
        { headerName: "Created Date", field: "createdAt", flex: 1 },
        { headerName: "Created By", field: "createdBy", flex: 1 },
    ];

    const handleViewClick = (poNo, historyId, listItemNo) => {
        router.push(
            `/production/po-list-item/poListItemHistoryForm?poNo=${poNo}&historyId=${historyId}&listItemNo=${listItemNo}`
        );
    };

    const HistoryButton = (props) => {
        const data = props.data;
        console.log("HistoryButton", data);
        return (
            <div className="flex flex-row items-center gap-2 pt-1 ag-theme-alpine">
                {/* View Button */}
                <button
                    onClick={() => {
                        handleViewClick(data.poNo, data.historyId, data.listItemNo);
                    }}
                    className="p-2 text-red-600 bg-yellow-200 rounded-lg"
                >
                    <IoSearch />
                </button>
            </div>
        );
    };

    const HistoryColumnDefs = [
        { headerName: "Sr No", field: "srNo", minWidth: 50, maxWidth: 80 },
        { headerName: "POList No", field: "POListNo", flex: 1 },
        { headerName: "PO No", field: "poNo", flex: 1 },
        { headerName: "UpdatedAt Date", field: "UpdatedAt", flex: 1 },
        { headerName: "Created Date", field: "CreatedAt", flex: 1 },
        { headerName: "Created By", field: "createdBy", flex: 1 },
        {
            headerName: "Action",
            cellRenderer: HistoryButton,
            minWidth: 150,
            maxWidth: 200,
        },
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

export default POListItemTable;
