"use client";
import Container from "@/components/common/Container";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiFile, FiPrinter, FiSave } from "react-icons/fi";
import axios from "axios";

const ProductionForm = () => {
  const searchParams = useSearchParams();

  const CustomerPO = searchParams.get("CustomerPO");
  console.log("first", CustomerPO);

  const router = useRouter();
  const [customerName, setCustomerName] = useState("Vishal Doshi");
  const [poNo, setPoNo] = useState("");
  const [materialCode, setMaterialCode] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [itemGrade, setItemGrade] = useState("");
  const [diameter, setDiameter] = useState("");
  const [diameterDimension, setDiameterDimension] = useState("mm");
  const [thread, setThread] = useState("");
  const [length, setLength] = useState("");
  const [lengthDimension, setLengthDimension] = useState("mm");
  const [quantity, setQuantity] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/customerPO/${CustomerPO}`
          );
          setRowData(response);
          // router.push("/production");
          console.log("response", response);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  const saveFormData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/customerPO/createCustomerPO",
        {
          customerName,
          poNo,
          materialCode,
          itemDescription,
          selectedItem,
          itemGrade,
          size: {
            diameter: {
              value: diameter,
              dimension: diameterDimension,
            },
            thread,
            length: {
              value: length,
              dimension: lengthDimension,
            },
          },
          quantity,
        }
      );
      console.log("response ", response);
      router.push("/production");
    } catch (error) {
      console.log(error);
    }
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
              value={poNo}
              onChange={(e) => setPoNo(e.target.value)}
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
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Customer Name
            </span>
          </label>
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              id="materialCode"
              type="text"
              value={materialCode}
              onChange={(e) => setMaterialCode(e.target.value)}
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Material Code
            </span>
          </label>
        </div>

        <div className="flex items-center gap-2 my-4">
          <label className="relative cursor-pointer App">
            <input
              id="itemDescription"
              type="text"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Item Description
            </span>
          </label>
          <select
            id="selectedItem"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
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

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              id="itemGrade"
              type="text"
              value={itemGrade}
              onChange={(e) => setItemGrade(e.target.value)}
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Material Grade
            </span>
          </label>
        </div>

        {/* Size input */}
        <div className="flex items-center gap-2 my-4">
          <label htmlFor="size" className="text-[16px] mr-4">
            Size:
          </label>
          {/* Diameter with dimension */}
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
          {/* Diameter dimension */}
          <label
            htmlFor="dimension"
            className="relative flex items-center cursor-pointer App"
          >
            <select
              id="diameterUnit"
              value={diameterDimension}
              onChange={(e) => setDiameterDimension(e.target.value)}
              className="h-10 w-24 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
            >
              <option value="inch">Inch</option>
              <option value="mm">MM</option>
            </select>
          </label>
          {/* Thread */}
          <label className="relative cursor-pointer App">
            <input
              id="thread"
              type="text"
              value={thread}
              onChange={(e) => setThread(e.target.value)}
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
              value={length}
              onChange={(e) => setLength(e.target.value)}
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
              value={lengthDimension}
              onChange={(e) => setLengthDimension(e.target.value)}
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
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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

export default ProductionForm;
