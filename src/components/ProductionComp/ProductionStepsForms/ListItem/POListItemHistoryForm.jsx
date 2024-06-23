"use client"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { FiArrowLeft, FiFile, FiPrinter, FiSave } from "react-icons/fi";
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Container from "@/components/common/Container";


const POListItemHistoryForm = () => {
    const searchParams = useSearchParams();

    const poNo = searchParams.get("poNo");
    const historyId = searchParams.get("historyId");
    const listItemNo = searchParams.get("listItemNo");

    const router = useRouter();
    const [customerPO, setCustomerPO] = useState({
        customerName: "",
        poNo: "",
        materialCode: "",
        studItemDescription: "",
        nutItemDescription: "",
        selectedItem: "",
        studGrade: "",
        nutGrade: "",
        POsize: {
            diameter: { value: "", dimension: "" },
            thread: "",
            length: { value: "", dimension: "" },
        },
        Cuttingsize: {
            cuttingdiameter: { value: "" },
            cuttingthread: "",
            cuttinglength: { value: "" },
        },
        quantity: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customerPO/SinglePOListItemHistory/${historyId}`
                );
                console.log(
                    "response in history",
                    response.data.historyRecord.previousData
                );
                setCustomerPO(response.data.historyRecord.previousData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (poNo && historyId) {
            fetchData();
        }
    }, [poNo, historyId]);

    const handleGoBack = () => {
        router.back();
    };

    const getRawMaterialDia = async () => {
        try {
            let adjustedLength;

            const { POsize } = customerPO;

            if (POsize.length.dimension === "mm") {
                // If length dimension is in mm, simply add 5 to the length
                adjustedLength = parseFloat(POsize.length.value) + 5;
            } else if (POsize.length.dimension === "inch") {
                // Handle potential format "X.Y/Z inch"
                const parts = POsize.length.value.split("/");
                if (parts.length === 2) {
                    const numerator = parseFloat(parts[0]);
                    const denominator = parseFloat(parts[1]);
                    const lengthInInch = numerator / denominator;
                    adjustedLength = lengthInInch * 25.4 + 5;
                } else {
                    // If not in the format "X.Y/Z inch", assume plain inch value
                    adjustedLength = parseFloat(POsize.length.value) * 25.4 + 5;
                }
            } else {
                // Raise an error for invalid dimension
                throw new Error("Invalid length dimension. Must be 'mm' or 'inch'.");
            }

            // Set the adjusted length to the cuttingLength state
            setCustomerPO((prevState) => ({
                ...prevState,
                Cuttingsize: {
                    ...prevState.Cuttingsize,
                    cuttinglength: { value: adjustedLength.toString() },
                },
            }));

            let response;
            if (POsize.diameter.dimension === "mm") {
                response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/helperRoutes/cuttingRawDataMM`,
                    {
                        params: {
                            diameter: `${POsize.diameter.value}`,
                            thread: `${POsize.thread}`,
                        },
                    }
                );
            } else if (POsize.diameter.dimension === "inch") {
                response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/helperRoutes/cuttingRawDataInch`,
                    {
                        params: {
                            diameter: `${POsize.diameter.value}`,
                            thread: `${POsize.thread}`,
                        },
                    }
                );
            }

            const matchingObject = response.data.matchingObject;
            if (matchingObject) {
                setCustomerPO((prevState) => ({
                    ...prevState,
                    Cuttingsize: {
                        ...prevState.Cuttingsize,
                        cuttingdiameter: {
                            value: matchingObject.RAW_MATERIAL_DIA.toString(),
                        },
                        cuttingthread: { value: matchingObject.PITCH.toString() },
                    },
                }));
            } else {
                console.log("No matching object found.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleOrderDateChange = (date) => {
        setCustomerPO({ ...customerPO, orderDate: date });
    };

    return (
        <Container>
            <div className="w-full p-8 mx-auto bg-white rounded shadow-md">
                <button
                    onClick={handleGoBack}
                    className="flex items-center mb-4 text-lg font-bold text-black"
                >
                    <FiArrowLeft className="mr-2" />
                    Back
                </button>

                <hr className="my-2 border-t border-gray-300" />

                <div className="flex items-center my-4">
                    <label className="relative cursor-pointer App">
                        <input
                            id="poNo"
                            type="text"
                            value={customerPO.poNo}
                            // onChange={(e) =>
                            //   setCustomerPO({ ...customerPO, poNo: e.target.value })
                            // }
                            placeholder="Input"
                            className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                        />
                        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                            PO No
                        </span>
                    </label>
                </div>

                <div className="flex items-center my-4">
                    <label className="relative cursor-pointer App">
                        <input
                            id="ProductionName"
                            type="text"
                            placeholder="Input"
                            value={customerPO.customerName}
                            // onChange={(e) =>
                            //   setCustomerPO({ ...customerPO, customerName: e.target.value })
                            // }
                            className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                        />
                        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                            Customer Name
                        </span>
                    </label>
                </div>

                <div className="flex flex-col items-center gap-2 md:flex-row">
                    <label className="relative cursor-pointer App">
                        <input
                            id="materialCode"
                            type="text"
                            value={customerPO.materialCode}
                            // onChange={(e) =>
                            //   setCustomerPO({ ...customerPO, materialCode: e.target.value })
                            // }
                            placeholder="Input"
                            className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                        />
                        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                            Material Code
                        </span>
                    </label>
                    <select
                        id="selectedSurface"
                        value={customerPO.selectedSurface}
                        // onChange={(e) =>
                        //   setCustomerPO({
                        //     ...customerPO,
                        //     selectedSurface: e.target.value,
                        //   })
                        // }
                        className="h-10 w-44 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
                    >
                        <option value="select">Surface Finish</option>
                        <option value="PhosphatingBlack">Phosphating(Black)</option>
                        <option value="ZincPlating">Zinc Plating</option>
                        <option value="ZincNickel">Zinc - Nickel</option>
                        <option value="XYLAN1070">Xylan 1070</option>
                        <option value="XYLAR1070">Xylar2 + Xylan 1070.</option>
                        {/* <option value="HDG">HotDip Galvanizing(HDG)</option>
                <option value="PTFE">PTFE</option> */}
                    </select>
                </div>

                <div className="flex flex-col items-center gap-4 my-4 md:flex-row">
                    {/* Stud Item Description */}
                    <div className="flex flex-col items-center gap-2 md:flex-row">
                        <label className="relative cursor-pointer App">
                            <input
                                id="itemDescription"
                                type="text"
                                value={customerPO.studItemDescription}
                                // onChange={(e) =>
                                //   setCustomerPO({
                                //     ...customerPO,
                                //     studItemDescription: e.target.value,
                                //   })
                                // }
                                placeholder="Input"
                                className="h-10 w-96 xl:w-[400px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                            />
                            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                                Stud Description
                            </span>
                        </label>
                    </div>
                    {/* Nut Item Description */}
                    <div className="flex flex-col items-center gap-2 md:flex-row">
                        <label className="relative cursor-pointer App">
                            <input
                                id="nutItemDescription2"
                                type="text"
                                value={customerPO.nutItemDescription}
                                // onChange={(e) =>
                                //   setCustomerPO({
                                //     ...customerPO,
                                //     nutItemDescription: e.target.value,
                                //   })
                                // }
                                placeholder="Input"
                                className="h-10 w-96 xl:w-[400px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                            />
                            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                                Nut Description
                            </span>
                        </label>
                        <select
                            id="selectedItem"
                            value={customerPO.selectedItem}
                            // onChange={(e) =>
                            //   setCustomerPO({
                            //     ...customerPO,
                            //     selectedItem: e.target.value,
                            //   })
                            // }
                            className="h-10 w-44 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
                        >
                            <option value="inch">stud</option>
                            <option value="studwithnuts">stud X 1 Nuts</option>
                            <option value="studwith2nuts">stud X 2 Nuts</option>
                            <option value="studwith3nuts">stud X 3 Nuts</option>
                            <option value="studwith4nuts">stud X 4 Nuts</option>
                            <option value="nuts">Nuts</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2 my-4 md:flex-row">
                    {/* Stud Material Grade */}
                    <label className="relative cursor-pointer App">
                        <input
                            id="studGrade"
                            type="text"
                            value={customerPO.studGrade}
                            // onChange={(e) =>
                            //   setCustomerPO({ ...customerPO, studGrade: e.target.value })
                            // }
                            placeholder="Input"
                            className="h-10 w-96 xl:w-[400px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                        />
                        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                            Stud Grade
                        </span>
                    </label>

                    {/* Nut Material Grade */}
                    <label className="relative cursor-pointer App">
                        <input
                            id="nutGrade"
                            type="text"
                            value={customerPO.nutGrade}
                            // onChange={(e) =>
                            //   setCustomerPO({ ...customerPO, nutGrade: e.target.value })
                            // }
                            placeholder="Input"
                            className="h-10 w-96 xl:w-[400px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                        />
                        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                            Nut Grade
                        </span>
                    </label>
                </div>

                {/* PO Size input */}
                <div className="flex flex-col items-start gap-2 my-4 md:items-center md:flex-row">
                    <label htmlFor="size" className="text-[16px] mr-4">
                        Po Size:
                    </label>
                    {/* Diameter */}
                    <label className="relative cursor-pointer App">
                        <input
                            id="sizeFirstPart"
                            type="text"
                            // value={customerPO.size.diameter.value || customerPO.size.diameter}
                            value={customerPO.POsize.diameter.value}
                            // onChange={(e) =>
                            //   setCustomerPO({
                            //     ...customerPO,
                            //     POsize: {
                            //       ...customerPO.POsize,
                            //       diameter: {
                            //         ...customerPO.POsize.diameter,
                            //         value: e.target.value,
                            //       },
                            //     },
                            //   })
                            // }
                            placeholder="Input"
                            className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                        />
                        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                            Diameter
                        </span>
                    </label>
                    {/* Diameter dimension */}
                    <label
                        htmlFor="dimension"
                        className="relative flex items-center cursor-pointer App"
                    >
                        <select
                            id="diameterUnit"
                            value={customerPO.POsize.diameter.dimension}
                            // onChange={(e) =>
                            //   setCustomerPO({
                            //     ...customerPO,
                            //     POsize: {
                            //       ...customerPO.POsize,
                            //       diameter: {
                            //         ...customerPO.POsize.diameter,
                            //         dimension: e.target.value,
                            //       },
                            //     },
                            //   })
                            // }
                            className="h-10 w-24 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
                        >
                            <option value="inch">Inch</option>
                            <option value="mm">MM</option>
                        </select>
                    </label>
                    {/* Thread */}
                    <label className="relative cursor-pointer App">
                        <input
                            id="sizeFirstPart"
                            type="text"
                            value={customerPO.POsize.thread}
                            // onChange={(e) =>
                            //   setCustomerPO({
                            //     ...customerPO,
                            //     POsize: { ...customerPO.POsize, thread: e.target.value },
                            //   })
                            // }
                            placeholder="Input"
                            className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                        />
                        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                            Thread
                        </span>
                    </label>
                    {/* Length */}
                    <label className="relative cursor-pointer App">
                        <input
                            id="sizeFirstPart"
                            type="text"
                            value={customerPO.POsize.length.value}
                            // onChange={(e) =>
                            //   setCustomerPO({
                            //     ...customerPO,
                            //     POsize: {
                            //       ...customerPO.POsize,
                            //       length: {
                            //         ...customerPO.POsize.length,
                            //         value: e.target.value,
                            //       },
                            //     },
                            //   })
                            // }
                            placeholder="Input"
                            className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                        />
                        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                            Length
                        </span>
                    </label>
                    {/* Length dimension */}
                    <label
                        htmlFor="dimension"
                        className="relative flex items-center cursor-pointer App"
                    >
                        <select
                            id="lengthUnit"
                            value={customerPO.POsize.length.dimension}
                            // onChange={(e) =>
                            //   setCustomerPO({
                            //     ...customerPO,
                            //     POsize: {
                            //       ...customerPO.POsize,
                            //       length: {
                            //         ...customerPO.POsize.length,
                            //         dimension: e.target.value,
                            //       },
                            //     },
                            //   })
                            // }
                            className="h-10 w-24 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
                        >
                            <option value="inch">Inch</option>
                            <option value="mm">MM</option>
                        </select>
                    </label>
                </div>

                <button
                    onClick={getRawMaterialDia}
                    className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Get Cutting Size
                </button>

                {/* Cutting Size input */}
                <div className="flex flex-col items-start gap-2 my-4 md:items-center md:flex-row">
                    <label htmlFor="size" className="text-[16px] mr-4">
                        Cutting Size:
                    </label>
                    {/* Diameter */}
                    <label className="relative cursor-pointer App">
                        <input
                            id="sizeFirstPart"
                            type="text"
                            // value={customerPO.size.diameter.value || customerPO.size.diameter}
                            value={customerPO.Cuttingsize.cuttingdiameter.value}
                            // onChange={(e) =>
                            //   setCustomerPO({
                            //     ...customerPO,
                            //     Cuttingsize: {
                            //       ...customerPO.Cuttingsize,
                            //       diameter: {
                            //         ...customerPO.Cuttingsize.cuttingdiameter,
                            //         value: e.target.value,
                            //       },
                            //     },
                            //   })
                            // }
                            placeholder="Input"
                            className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                        />
                        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                            Diameter
                        </span>
                    </label>

                    {/* cuttingthread */}
                    <input
                        id="cuttingthread"
                        type="text"
                        value={customerPO.Cuttingsize.cuttingthread}
                        // onChange={(e) =>
                        //   setCustomerPO({
                        //     ...customerPO,
                        //     Cuttingsize: {
                        //       ...customerPO.Cuttingsize,
                        //       cuttingthread: {
                        //         ...customerPO.Cuttingsize.cuttingthread,
                        //         value: e.target.value,
                        //       },
                        //     },
                        //   })
                        // }
                        placeholder="Input"
                        className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                    />

                    {/* Length */}
                    <label className="relative cursor-pointer App">
                        <input
                            id="cuttinglength"
                            type="text"
                            value={customerPO.Cuttingsize.cuttinglength.value}
                            // onChange={(e) =>
                            //   setCustomerPO({
                            //     ...customerPO,
                            //     Cuttingsize: {
                            //       ...customerPO.Cuttingsize,
                            //       length: {
                            //         ...customerPO.Cuttingsize.cuttinglength,
                            //         value: e.target.value,
                            //       },
                            //     },
                            //   })
                            // }
                            placeholder="Input"
                            className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                        />
                        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                            Length
                        </span>
                    </label>
                </div>

                <div className="flex items-center my-4">
                    <label className="relative cursor-pointer App">
                        <input
                            type="text"
                            placeholder="Input"
                            value={customerPO.quantity}
                            // onChange={(e) =>
                            //   setCustomerPO({ ...customerPO, quantity: e.target.value })
                            // }
                            className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                        />
                        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                            Quantity
                        </span>
                    </label>
                </div>

                {/* Order Date */}
                <div className="flex items-center mb-4">
                    <label htmlFor="deliveryDate" className="w-auto mr-2 text-[16px]">
                        Order Date:
                    </label>

                    <DatePicker
                        selected={customerPO.orderDate}
                        // onChange={handleOrderDateChange}
                        dateFormat="dd/MM/yyyy"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="flex items-center">
                    <label htmlFor="attachment" className="text-[16px]">
                        Attachment
                    </label>
                    <input
                        type="file"
                        id="attachment"
                        className="hidden"
                        accept=".pdf"
                    // onChange={handleFileSelection}
                    />
                    <button
                        onClick={() => document.getElementById("attachment").click()}
                        className="flex items-center px-4 py-2 ml-2 text-black bg-gray-300 rounded"
                    >
                        Choose file
                        <FiFile className="ml-2" />
                    </button>
                    {selectedFile && <span className="ml-2">{selectedFile.name}</span>}
                </div>

                <p className="ml-2 text-sm text-red-600">
                    Only PDF files are allowed and only one file can be selected.
                </p>

                <hr className="my-4 border-t border-gray-300" />
                <div className="flex justify-end">
                    <button className="flex items-center px-4 py-2 text-black bg-gray-300 rounded">
                        Print
                        <FiPrinter className="ml-2" />
                    </button>
                </div>
            </div>
        </Container>
    );
};

export default POListItemHistoryForm