"use client";
import Container from "@/components/common/Container";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiFile, FiPrinter, FiSave } from "react-icons/fi";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";

const MaterialIssueForm = () => {
  const router = useRouter();
  const [materialSlipName, setMaterialSlipName] = useState(
    "Default Material Slip"
  );
  const [itemDescription, setItemDescription] = useState("");
  const [materialGrade, setMaterialGrade] = useState("Default Material Grade");
  const [lotNumber, setLotNumber] = useState("");
  const [diameter, setDiameter] = useState("");
  const [diameterDimension, setDiameterDimension] = useState("mm");
  const [length, setLength] = useState("");
  const [lengthDimension, setLengthDimension] = useState("mm");
  const [size, setSize] = useState("");
  const [quantityRequired, setQuantityRequired] = useState(
    "Default Quantity Required"
  );
  const [quantityIssued, setQuantityIssued] = useState(
    "Default Quantity Issued"
  );
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    handleCalculate();
  }, [diameter, length]);

  const handleCalculate = () => {
    if (diameter && length) {
      const calculatedSize =
        (parseFloat(diameter) * parseFloat(diameter) * parseFloat(length)) /
        162000;
      setSize(calculatedSize.toFixed(3));
    } else {
      setSize("");
    }
  };
  console.log("size", size);
  useEffect(() => {
    const selectedCustomerPOData = JSON.parse(
      localStorage.getItem("selectedCustomerPO")
    );
    if (selectedCustomerPOData) {
      // setProductionSheetName(selectedCustomerPOData.poNo || "");
      setItemDescription(selectedCustomerPOData.itemDescription || "");
      setMaterialGrade(selectedCustomerPOData.itemGrade || "");
      // Set other fields accordingly
    }
  }, []);

  const saveFormData = async () => {
    const selectedCustomerPODataForpoNo = JSON.parse(
      localStorage.getItem("selectedCustomerPO")
    );
    try {
      const formData = new FormData();
      formData.append("poNo", selectedCustomerPODataForpoNo.poNo);
      formData.append("materialSlipName", materialSlipName);
      formData.append("itemDescription", itemDescription);
      formData.append("materialGrade", materialGrade);
      formData.append("lotNumber", lotNumber);
      formData.append("size", size);
      formData.append("diameterValue", diameter);
      formData.append("diameterDimension", diameterDimension);
      formData.append("lengthValue", length);
      formData.append("lengthDimension", lengthDimension);
      formData.append("quantityRequired", quantityRequired);
      formData.append("quantityIssued", quantityIssued);

      // Append poNo to the formData
      formData.append("attachmentPoNo", selectedCustomerPODataForpoNo.poNo);

      // Append the file if selected
      if (selectedFile) {
        formData.append("attachment", selectedFile);
      }

      const response = await axios.post(
        "http://localhost:8000/api/materialissueslip/createMaterialIssueSlip",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response", response);
      router.push("/production/material-issue-slip");
    } catch (error) {
      console.error("Error occurred while saving form data:", error);
    }
  };

  // Function to convert inches to millimeters
  const convertToMillimeters = (value) => {
    return (parseFloat(value) * 25.4).toFixed(3);
  };

  // Event handler for diameter dimension change
  const handleDiameterDimensionChange = (e) => {
    setDiameterDimension(e.target.value);
    if (e.target.value === 'inch') {
      setDiameter(convertToMillimeters(diameter));
    }
  };

  // Event handler for length dimension change
  const handleLengthDimensionChange = (e) => {
    setLengthDimension(e.target.value);
    if (e.target.value === 'inch') {
      setLength(convertToMillimeters(length));
    }
  };

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert("Please select a PDF file.");
    }
  };

  const handleGoBack = () => {
    router.back();
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
              id="materialSlipName"
              type="text"
              placeholder="Input"
              value={materialSlipName}
              onChange={(e) => setMaterialSlipName(e.target.value)}
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Material Slip Name
            </span>
          </label>
        </div>

        <div className="flex flex-col items-center gap-4 my-4 md:flex-row">
          {/* Stud Item Description */}
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <label className="relative cursor-pointer App">
              <input
                type="text"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder="Input"
                className="h-10 w-96 xl:w-[400px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
              />
              <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                Item Description
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-col items-center my-4 md:flex-row">
          {/* Stud Grade */}
          <label className="relative mb-4 cursor-pointer App md:mr-4 md:mb-0">
            <input
              id="StudGrade"
              type="text"
              value={materialGrade}
              onChange={(e) => setMaterialGrade(e.target.value)}
              placeholder="Input"
              className="h-10 w-48 xl:w-[400px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Grade
            </span>
          </label>
        </div>
        {/* lotNumber */}
        <div className="flex flex-col items-center my-4 md:flex-row">
          {/* Stud Grade */}
          <label className="relative mb-4 cursor-pointer App md:mr-4 md:mb-0">
            <input
              id="StudGrade"
              type="text"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
              placeholder="Input"
              className="h-10 w-48 xl:w-[400px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Lot Number
            </span>
          </label>
        </div>



        {/* Cutting Size */}
        <div className="flex flex-col items-start gap-2 my-4 md:items-center md:flex-row">
          <label htmlFor="size" className="text-[16px] mr-4">
            Cutting Size:
          </label>
          {/* Diameter */}
          <label className="relative cursor-pointer App">
            <input
              id="sizeFirstPart"
              type="text"
              value={diameter}
              onChange={(e) => setDiameter(e.target.value)}
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Diameter
            </span>
          </label>
          <label
            htmlFor="unit"
            className="relative flex items-center cursor-pointer App"
          >
            <select
              id="unit"
              className="h-10 w-24 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
              value={diameterDimension}
              onChange={(e) => setDiameterDimension(e.target.value)}
            // onChange={handleDiameterDimensionChange}
            >
              <option value="inch">Inch</option>
              <option value="mm">MM</option>
            </select>
          </label>
          {/* Unit */}
          <label className="relative cursor-pointer App">
            <input
              id="sizeFirstPart"
              type="text"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Length
            </span>
          </label>
          <label
            htmlFor="unit"
            className="relative flex items-center cursor-pointer App"
          >
            <select
              id="unit"
              className="h-10 w-24 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
              value={lengthDimension}
              onChange={(e) => setLengthDimension(e.target.value)}
            // onChange={handleLengthDimensionChange}
            >
              <option value="inch">Inch</option>
              <option value="mm">MM</option>
            </select>
          </label>

          {/* Calculate button */}
          <button
            onClick={handleCalculate}
            className="flex items-center px-4 py-2 ml-2 text-black bg-gray-300 rounded"
          >
            Calculation
          </button>
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              value={size}
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Quantity Required in KG
            </span>
          </label>
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              value={size}
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Quantity Issued in KG
            </span>
          </label>
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
            onChange={handleFileSelection}
          />
          <button
            onClick={() => document.getElementById("attachment").click()}
            className="flex items-center px-4 py-2 ml-2 text-black bg-gray-300 rounded"
          >
            Choose file
            <FiFile className="ml-2" />
          </button>
          {selectedFile && (
            <>
              <span className="ml-2">{selectedFile.name}</span>
              <button
                onClick={() => setSelectedFile(null)}
                className="flex items-center text-red-600 bg-none"
              >
                <IoIosCloseCircleOutline className="ml-2 text-2xl" />
              </button>
            </>
          )}
        </div>
        <p className="ml-2 text-sm text-red-600">
          Only PDF files are allowed and only one file can be selected.
        </p>

        <hr className="my-4 border-t border-gray-300" />
        <div className="flex justify-end">
          <button
            onClick={saveFormData}
            className="flex items-center px-4 py-2 mr-4 text-black bg-gray-300 rounded"
          >
            Save
            <FiSave className="ml-2" />
          </button>
          <button className="flex items-center px-4 py-2 text-black bg-gray-300 rounded">
            Print
            <FiPrinter className="ml-2" />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default MaterialIssueForm;
