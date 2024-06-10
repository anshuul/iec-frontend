"use client"

import { useEffect, useRef, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiFile } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ListItemModal = ({ onSave, onClose }) => {
    const [listItemNo, setListItemNo] = useState("1");
    const [materialCode, setMaterialCode] = useState("");
    const [studItemDescription, setStudItemDescription] = useState("");
    const [nutItemDescription, setNutItemDescription] = useState("");
    const [selectedSurface, setSelectedSurface] = useState("");
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleSave = () => {
        const formData = {
            materialCode,
            studItemDescription,
            nutItemDescription,
            selectedSurface,
        };

        onSave(formData);

        setMaterialCode("");
        setStudItemDescription("");
        setNutItemDescription("");
        setSelectedSurface("");

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <div
                    ref={modalRef}
                    className="inline-block w-full max-w-screen-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
                >
                    <div>
                        <h2 className="text-lg font-semibold">Add List Item</h2>
                        <div className="mt-4 space-y-4">
                            {/* List item No */}
                            <div className="w-full md:w-1/2 md:pr-4">
                                <label htmlFor="materialCode" className="block font-medium text-gray-700">List Item No.</label>
                                <input
                                    id="materialCode"
                                    type="text"
                                    value={listItemNo}
                                    onChange={(e) => setListItemNo(e.target.value)}
                                    readOnly // Add readOnly attribute here
                                    placeholder="Enter Material Code"
                                    className="h-10 w-full px-4 text-[16px] text-black bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500 placeholder-gray-400"
                                />
                            </div>

                            {/* Material Code */}
                            <div className="md:flex md:flex-row md:justify-between md:items-center">
                                <div className="w-full md:w-1/2 md:pr-4">
                                    <label htmlFor="materialCode" className="block font-medium text-gray-700">Material Code</label>
                                    <input
                                        id="materialCode"
                                        type="text"
                                        value={materialCode}
                                        onChange={(e) => setMaterialCode(e.target.value)}
                                        placeholder="Enter Material Code"
                                        className="h-10 w-full px-4 text-[16px] text-black bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500 placeholder-gray-400"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-4">
                                    <label htmlFor="selectedSurface" className="block font-medium text-gray-700">Surface Finish</label>
                                    <select
                                        id="selectedSurface"
                                        value={selectedSurface}
                                        onChange={(e) => setSelectedSurface(e.target.value)}
                                        className="h-10 w-full px-2 text-[16px] text-black bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                                    >
                                        <option value="select">Select Surface Finish</option>
                                        <option value="PhosphatingBlack">Phosphating (Black)</option>
                                        <option value="ZincPlating">Zinc Plating</option>
                                        <option value="HDG">Hot Dip Galvanizing (HDG)</option>
                                        <option value="PTFE">PTFE</option>
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="md:flex md:flex-row md:justify-between md:items-center">
                                {/* Stud Item Description */}
                                <div className="w-full md:w-1/2 md:pr-4">
                                    <label htmlFor="materialCode" className="block font-medium text-gray-700">Stud Description</label>
                                    <input
                                        id="materialCode"
                                        type="text"
                                        value={materialCode}
                                        onChange={(e) => setMaterialCode(e.target.value)}
                                        placeholder="Enter Material Code"
                                        className="h-10 w-full px-4 text-[16px] text-black bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500 placeholder-gray-400"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 md:pr-4">
                                    <label htmlFor="materialCode" className="block font-medium text-gray-700">Nut Description</label>
                                    <input
                                        id="materialCode"
                                        type="text"
                                        value={materialCode}
                                        onChange={(e) => setMaterialCode(e.target.value)}
                                        placeholder="Enter Material Code"
                                        className="h-10 w-full px-4 text-[16px] text-black bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500 placeholder-gray-400"
                                    />
                                </div>

                                <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-4">
                                    <label htmlFor="selectedSurface" className="block font-medium text-gray-700">Surface Finish</label>
                                    <select
                                        id="selectedSurface"
                                        // value={selectedSurface}
                                        // onChange={(e) => setSelectedSurface(e.target.value)}
                                        className="h-10 w-full px-2 text-[16px] text-black bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                                    >
                                        <option value="select">--select--</option>
                                        <option value="stud">Stud</option>
                                        <option value="studwith1nuts">stud X 1 Nuts</option>
                                        <option value="studwith2nuts">stud X 2 Nuts</option>
                                        <option value="studwith3nuts">stud X 3 Nuts</option>
                                        <option value="studwith4nuts">stud X 4 Nuts</option>
                                        <option value="nut">Nut</option>
                                    </select>
                                </div>
                            </div>

                            {/* Grade */}
                            <div className="md:flex md:flex-row md:justify-between md:items-center">
                                {/* Stud Item Description */}
                                <div className="w-full md:w-1/2 md:pr-4">
                                    <label htmlFor="materialCode" className="block font-medium text-gray-700">Stud Grade</label>
                                    <input
                                        id="materialCode"
                                        type="text"
                                        value={materialCode}
                                        onChange={(e) => setMaterialCode(e.target.value)}
                                        placeholder="Enter Material Code"
                                        className="h-10 w-full px-4 text-[16px] text-black bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500 placeholder-gray-400"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 md:pr-4">
                                    <label htmlFor="materialCode" className="block font-medium text-gray-700">Nut Grade</label>
                                    <input
                                        id="materialCode"
                                        type="text"
                                        value={materialCode}
                                        onChange={(e) => setMaterialCode(e.target.value)}
                                        placeholder="Enter Material Code"
                                        className="h-10 w-full px-4 text-[16px] text-black bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500 placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            {/* PO Size */}
                            <div className="flex flex-col flex-wrap items-start gap-2 my-4 md:items-center md:flex-row">
                                <label htmlFor="size" className="text-[16px] mr-4">
                                    PO Size:
                                </label>
                                {/* Diameter with dimension */}
                                <label className="relative cursor-pointer App">
                                    <input
                                        id="sizeFirstPart"
                                        type="text"
                                        // value={diameter}
                                        // onChange={(e) => setDiameter(e.target.value)}
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
                                        // value={diameterDimension}
                                        // onChange={(e) => setDiameterDimension(e.target.value)}
                                        className="h-10 w-24 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
                                    >
                                        {/* <option value="">-select-</option> */}
                                        <option value="inch">Inch</option>
                                        <option value="mm">MM</option>
                                    </select>
                                </label>
                                {/* Pitch */}
                                <label className="relative cursor-pointer App">
                                    <input
                                        id="thread"
                                        type="text"
                                        // value={thread}
                                        // onChange={(e) => setThread(e.target.value)}
                                        placeholder="Input"
                                        className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                                    />
                                    <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                                        Pitch
                                    </span>
                                </label>
                                {/* Length */}
                                <label className="relative cursor-pointer App">
                                    <input
                                        id="sizeFirstPart"
                                        type="text"
                                        // value={length}
                                        // onChange={(e) => setLength(e.target.value)}
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
                                        // value={lengthDimension}
                                        // onChange={(e) => setLengthDimension(e.target.value)}
                                        className="h-10 w-24 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
                                    >
                                        <option value="inch">Inch</option>
                                        <option value="mm">MM</option>
                                    </select>
                                </label>
                            </div>
                            <button
                                // onClick={getRawMaterialDia}
                                className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Get Cutting Size
                            </button>

                            {/* Cutting Size */}
                            <div className="flex flex-col flex-wrap items-start gap-2 my-4 md:items-center md:flex-row">
                                <label htmlFor="size" className="text-[16px] mr-4">
                                    Cutting Size:
                                </label>
                                {/* Diameter with dimension */}
                                <label className="relative cursor-pointer App">
                                    <input
                                        id="sizeFirstPart"
                                        type="text"
                                        // value={cuttingDiameter}
                                        // onChange={(e) => setCuttingDiameter(e.target.value)}
                                        placeholder="Input"
                                        className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                                    />
                                    <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                                        Diameter
                                    </span>
                                </label>

                                {/* Pitch */}
                                <label className="relative cursor-pointer App">
                                    <input
                                        id="thread"
                                        type="text"
                                        // value={cuttingthread}
                                        // onChange={(e) => setCuttingThread(e.target.value)}
                                        placeholder="Input"
                                        className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                                    />
                                    <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                                        Pitch
                                    </span>
                                </label>
                                {/* Length */}
                                <label className="relative cursor-pointer App">
                                    <input
                                        id="sizeFirstPart"
                                        type="text"
                                        // value={cuttingLength}
                                        // onChange={(e) => setCuttingLength(e.target.value)}
                                        placeholder="Input"
                                        className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                                    />
                                    <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                                        Length
                                    </span>
                                </label>
                            </div>

                            {/* Quantity */}
                            <div className="w-full md:w-1/2 md:pr-4">
                                <label htmlFor="materialCode" className="block font-medium text-gray-700">Quantity</label>
                                <input
                                    id="materialCode"
                                    type="text"
                                    value={materialCode}
                                    onChange={(e) => setMaterialCode(e.target.value)}
                                    placeholder="Enter Material Code"
                                    className="h-10 w-full px-4 text-[16px] text-black bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500 placeholder-gray-400"
                                />
                            </div>

                            {/* Order Date */}
                            <div className="flex items-center mb-4">
                                <label htmlFor="deliveryDate" className="w-auto mr-2 text-[16px]">
                                    Order Date:
                                </label>

                                <DatePicker
                                    // selected={orderDate}
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
                                    name="attachment"
                                    accept="application/pdf"
                                    // onChange={handleFileSelection}
                                />
                                <button
                                    onClick={() => document.getElementById("attachment").click()}
                                    className="flex items-center px-4 py-2 ml-2 text-black bg-gray-300 rounded"
                                >
                                    Choose file
                                    <FiFile className="ml-2" />
                                </button>
                                {/* {selectedFile && <span className="ml-2">{selectedFile.name}</span>} */}
                                {/* {selectedFile && (
                                    <>
                                        <span className="ml-2">{selectedFile.name}</span>
                                        <button
                                            // onClick={() => setSelectedFile(null)}
                                            className="flex items-center text-red-600 bg-none"
                                        >
                                            <IoIosCloseCircleOutline className="ml-2 text-2xl" />
                                        </button>
                                    </>
                                )} */}
                            </div>
                            <p className="ml-2 text-sm text-red-600">
                                Only PDF files are allowed and only one file can be selected.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col md:flex-row md:justify-between">
                        <button
                            onClick={onClose}
                            type="button"
                            className="flex justify-center mb-4 md:mb-0 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            type="button"
                            className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListItemModal;
