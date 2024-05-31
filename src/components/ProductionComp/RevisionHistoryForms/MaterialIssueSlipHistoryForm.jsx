"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiFile, FiPrinter, FiSave } from "react-icons/fi";
import Container from "@/components/common/Container";
import MaterialIssueSlip from "@/components/PDF/MaterialSlip/MaterialIssueSlip";
import { PDFDownloadLink } from "@react-pdf/renderer";

const MaterialIssueSlipHistoryForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const historyId = searchParams.get("historyId");
  console.log("historyId material history", historyId);
  const id = historyId;

  const [materialIssueForm, setMaterialIssueForm] = useState({
    materialSlipName: "",
    itemDescription: "",
    materialGrade: "",
    diameter: { value: "", dimension: "" }, // Set as an object with 'value' and 'dimension' fields
    length: { value: "", dimension: "" },
    quantityRequired: "",
    quantityIssued: "",
    studquantity: "",
    nutquantity: "",
    size: "",
    id: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("start");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/materialissueslip/materialIssueSlipHistory-single/${id}`
        );
        console.log("response.data material", response.data);
        console.log("response history material", response.data[0].previousData);
        setMaterialIssueForm(response.data[0].previousData);
        console.log("endt");
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

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setMaterialIssueForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  console.log("materialIssueForm.materialSlipName", materialIssueForm);

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
                setMaterialIssueForm({
                  ...materialIssueForm,
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
                setMaterialIssueForm({
                  ...materialIssueForm,
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
                setMaterialIssueForm({
                  ...materialIssueForm,
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

        <div className="flex items-center gap-2 my-4">
          <label htmlFor="size" className="text-[16px] mr-4">
            Size:
          </label>
          {/* Diameter */}
          <label className="relative cursor-pointer App">
            <input
              id="sizeFirstPart"
              type="text"
              value={materialIssueForm.diameter}
              onChange={(e) => handleInputChange(e, "diameter")}
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Diameter
            </span>
          </label>
          <label
            htmlFor="diameterDimension"
            className="relative flex items-center cursor-pointer App"
          >
            <select
              id="diameterDimension"
              value={materialIssueForm.diameterDimension}
              onChange={(e) => handleInputChange(e, "diameterDimension")}
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
              onChange={(e) => handleInputChange(e, "length")}
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Length
            </span>
          </label>
          <label
            htmlFor="lengthDimension"
            className="relative flex items-center cursor-pointer App"
          >
            <select
              id="lengthDimension"
              value={materialIssueForm.lengthDimension}
              onChange={(e) => handleInputChange(e, "lengthDimension")}
              className="h-10 w-24 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
            >
              <option value="inch">Inch</option>
              <option value="mm">MM</option>
            </select>
          </label>

          {/* Calculate button */}
          {/* <button
            onClick={handleCalculate}
            className="flex items-center px-4 py-2 ml-2 text-black bg-gray-300 rounded"
          >
            Calculation
          </button> */}
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              value={
                typeof materialIssueForm.size === "number"
                  ? materialIssueForm.size.toFixed(3)
                  : materialIssueForm.quantityRequired
              }
              onChange={(e) => handleInputChange(e, "size")}
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
              value={
                typeof materialIssueForm.size === "number"
                  ? materialIssueForm.size.toFixed(3)
                  : materialIssueForm.quantityIssued
              }
              onChange={(e) => handleInputChange(e, "size")}
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
          {/* <PDFDownloadLink
            document={<MaterialIssueSlip data={materialIssueForm} />}
            fileName={`MaterialIssueSlip_${id}.pdf`}
          >
            <button className="flex items-center px-4 py-2 text-black bg-gray-300 rounded">
              Print
              <FiPrinter className="ml-2" />
            </button>
        </PDFDownloadLink> */}
          <button className="flex items-center px-4 py-2 text-black bg-gray-300 rounded">
            Print
            <FiPrinter className="ml-2" />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default MaterialIssueSlipHistoryForm;
