"use client";
import Container from "@/components/common/Container";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiFile, FiPrinter, FiSave } from "react-icons/fi";
import axios from "axios";

const CutomerPoHistoryForm = () => {
  const searchParams = useSearchParams();

  const poNo = searchParams.get("CustomerPO");
  const historyId = searchParams.get("historyId");
  console.log("poNo", poNo);
  console.log("historyId", historyId);

  const router = useRouter();
  const [customerPO, setCustomerPO] = useState({
    customerName: "",
    poNo: "",
    materialCode: "",
    itemDescription: "",
    itemGrade: "",
    size: {
      diameter: "",
      thread: "",
      unit: "",
    },
    quantity: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/customerPO/customerPOHistory/${poNo}/${historyId}`
        );
        
        setCustomerPO(response.data.historyRecord.previousData); // Set the customer PO data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (poNo && historyId) {
      fetchData(); // Fetch customer PO data when CustomerPO is available
    }
  }, [poNo, historyId]);

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
      const response = await axios.put(
        `http://localhost:8000/api/customerPO/update/${poNo}`,
        customerPO
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
              value={customerPO.poNo}
              onChange={(e) =>
                setCustomerPO({ ...customerPO, poNo: e.target.value })
              }
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
              onChange={(e) =>
                setCustomerPO({ ...customerPO, customerName: e.target.value })
              }
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
              value={customerPO.materialCode}
              onChange={(e) =>
                setCustomerPO({ ...customerPO, materialCode: e.target.value })
              }
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
              id="itemDescription"
              type="text"
              value={customerPO.itemDescription}
              onChange={(e) =>
                setCustomerPO({
                  ...customerPO,
                  itemDescription: e.target.value,
                })
              }
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
              id="itemGrade"
              type="text"
              value={customerPO.itemGrade}
              onChange={(e) =>
                setCustomerPO({ ...customerPO, itemGrade: e.target.value })
              }
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
              id="sizeFirstPart"
              type="text"
              value={customerPO.size.diameter}
              onChange={(e) =>
                setCustomerPO({
                  ...customerPO,
                  size: { ...customerPO.size, diameter: e.target.value },
                })
              }
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
              id="sizeFirstPart"
              type="text"
              value={customerPO.size.thread}
              onChange={(e) =>
                setCustomerPO({
                  ...customerPO,
                  size: { ...customerPO.size, thread: e.target.value },
                })
              }
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
              id="sizeFirstPart"
              type="text"
              value={customerPO.size.unit}
              onChange={(e) =>
                setCustomerPO({
                  ...customerPO,
                  size: { ...customerPO.size, unit: e.target.value },
                })
              }
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
              value={customerPO.quantity}
              onChange={(e) =>
                setCustomerPO({ ...customerPO, quantity: e.target.value })
              }
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

export default CutomerPoHistoryForm;
