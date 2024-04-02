"use client";
import Container from "@/components/common/Container";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft, FiFile } from "react-icons/fi";

const ProductionForm = () => {
  const router = useRouter();
  const [materialSlipName, setMaterialSlipName] = useState(
    "Default Material Slip"
  );
  const [itemDescription, setItemDescription] = useState(
    "Default Item Description"
  );
  const [materialGrade, setMaterialGrade] = useState("Default Material Grade");
  const [sizeFirstPart, setSizeFirstPart] = useState("");
  const [sizeSecondPart, setSizeSecondPart] = useState("");
  const [sizeThirdPart, setSizeThirdPart] = useState("");
  const [quantityRequired, setQuantityRequired] = useState(
    "Default Quantity Required"
  );
  const [quantityIssued, setQuantityIssued] = useState(
    "Default Quantity Issued"
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      // Optionally, you can display an error message or perform other actions here
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
              Production Name
            </span>
          </label>
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
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
              type="text"
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Material Code
            </span>
          </label>
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Item Description
            </span>
          </label>
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Item Grade
            </span>
          </label>
        </div>

        {/* Size input divided into three parts */}
        <div className="flex items-center my-4 gap-2">
          <label htmlFor="size" className="text-[16px] mr-4">
            Size:
          </label>
          {/* Diameter */}
          <label className="relative cursor-pointer App">
            <input
              type="text"
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Diameter
            </span>
          </label>
          {/* Thread */}
          <label className="relative cursor-pointer App">
            <input
              type="text"
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Thread
            </span>
          </label>
          {/* Unit */}
          <label className="relative cursor-pointer App">
            <input
              type="text"
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Unit
            </span>
          </label>
          <label
            htmlFor="unit"
            className="relative cursor-pointer App flex items-center"
          >
            <select
              id="unit"
              className="h-10 w-24 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
            >
              <option value="inch">Inch</option>
              <option value="mm">MM</option>
            </select>
          </label>
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Quantity
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
            accept=".pdf"
            onChange={handleFileSelection}
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
      </div>
    </Container>
  );
};

export default ProductionForm;
