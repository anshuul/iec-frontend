"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiFile } from "react-icons/fi";
import Container from "@/components/common/Container";

const MaterialIssueSlipForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  console.log("first", id);

  const [materialIssueForm, setMaterialIssueForm] = useState({
    materialSlipName: "",
    itemDescription: "",
    materialGrade: "",
    diameter: "",
    length: "",
    quantityRequired: "",
    quantityIssued: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/production/get-materialIssueSlipByID/${id}`
        );
        const responseData = response.data;

        setMaterialIssueForm({
          poNo: responseData.poNo,
          materialSlipName: responseData.materialSlipName,
          itemDescription: responseData.itemDescription,
          materialGrade: responseData.materialGrade,
          diameter: responseData.diameter,
          length: responseData.length,
          quantityRequired: responseData.quantityRequired,
          quantityIssued: responseData.quantityIssued,
          attachment: responseData.attachment,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData(); // Fetch customer PO data when CustomerPO is available
    }
  }, [id]);

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

  const handlecalculate = () => {
    
  }

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
              value={materialIssueForm.materialSlipName}
              onChange={(e) =>
                setMaterialSlipName({
                  ...materialSlipName,
                  materialSlipName: e.target.value,
                })
              }
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Material Slip Name
            </span>
          </label>
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              value={materialIssueForm.itemDescription}
              onChange={(e) =>
                setMaterialSlipName({
                  ...itemDescription,
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
              type="text"
              value={materialIssueForm.materialGrade}
              onChange={(e) =>
                setMaterialSlipName({
                  ...materialGrade,
                  materialGrade: e.target.value,
                })
              }
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Material Grade
            </span>
          </label>
        </div>

        <div className="flex items-center my-4 gap-2">
          <label htmlFor="size" className="text-[16px] mr-4">
            Size:
          </label>
          {/* Diameter */}
          <label className="relative cursor-pointer App">
            <input
              id="sizeFirstPart"
              type="text"
              value={materialIssueForm.diameter}
              onChange={(e) =>
                setMaterialSlipName({
                  ...diameter,
                  diameter: e.target.value,
                })
              }
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Diameter
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
          {/* Length */}
          <label className="relative cursor-pointer App">
            <input
              id="sizeFirstPart"
              type="text"
              value={materialIssueForm.length}
              onChange={(e) =>
                setMaterialSlipName({
                  ...length,
                  length: e.target.value,
                })
              }
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Length
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

          {/* Calculate button */}
          <button
            onClick={handlecalculate}
            className="flex items-center px-4 py-2 ml-2 text-black bg-gray-300 rounded"
          >
            Calculation
          </button>
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              value={materialIssueForm.quantityRequired}
              onChange={(e) =>
                setMaterialSlipName({
                  ...quantityRequired,
                  quantityRequired: e.target.value,
                })
              }
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Quantity Required
            </span>
          </label>
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              value={materialIssueForm.quantityIssued}
              onChange={(e) =>
                setMaterialSlipName({
                  ...quantityIssued,
                  quantityIssued: e.target.value,
                })
              }
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Quantity Issued
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

export default MaterialIssueSlipForm;
