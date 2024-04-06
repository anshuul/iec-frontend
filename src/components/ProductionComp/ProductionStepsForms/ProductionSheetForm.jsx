"use client";
import { useEffect, useState } from "react";
import Container from "@/components/common/Container";
import { FiFile, FiSave, FiPrinter, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { RiAttachmentLine } from "react-icons/ri";

const ProductionSheetForm = () => {
  const router = useRouter();
  const [productionSheetName, setProductionSheetName] = useState("F-PR-00");
  // First COl Form
  const [itemDescription, setItemDescription] = useState("");
  const [materialIssue, setMaterialIssue] = useState("");
  const [requiredResources, setRequiredResources] = useState(
    "List Of M/C-F-MN-04, List Of Employees HR-04"
  );
  const [productAndCustomer, setProductAndCustomer] = useState("");
  const [legalAndApplicable, setLegalAndApplicable] = useState(
    "Lis Of Statutory & Regulatory - F-HR-01"
  );
  const [contingencyPlanning, setContingencyPlanning] = useState("P-QMS-03");
  const [verification, setVerification] = useState("As Per ITP");
  const [selectedFile, setSelectedFile] = useState(null);

  // Second col Form
  const [validation, setValidation] = useState("");
  const [monitoring, setMonitoring] = useState("As Per ITP");
  const [measurement, setMeasurement] = useState("As Per ITP");
  const [inspection, setInspection] = useState("As Per ITP");
  const [management, setManagement] = useState("N/A");
  const [recordsEvidence, setRecordsEvidence] = useState("Final MTC - F-QC-10");

  const [planningQuantity, setPlanningQuantity] = useState("");
  // const [planningDate, setPlanningDate] = useState("2024-04-08T08:00:00.000Z");
  const [planningDate, setPlanningDate] = useState("");
  const [achievementQuantity, setAchievementQuantity] = useState("");
  const [achievementDate, setAchievementDate] = useState("");
  // const [achievementDate, setAchievementDate] = useState(
  //   "2024-04-10T08:00:00.000Z"
  // );

  useEffect(() => {
    const selectedCustomerPOData = JSON.parse(
      localStorage.getItem("selectedCustomerPO")
    );
    if (selectedCustomerPOData) {
      // setProductionSheetName(selectedCustomerPOData.poNo || "");
      setItemDescription(selectedCustomerPOData.itemDescription || "");
      setMaterialIssue(selectedCustomerPOData.materialCode || "");
      setProductAndCustomer(
        `Size: ${selectedCustomerPOData.size.diameter} ${selectedCustomerPOData.size.unit}, Thread: ${selectedCustomerPOData.size.thread}` ||
          ""
      );
      setPlanningQuantity(selectedCustomerPOData.quantity || "");
      setAchievementQuantity(selectedCustomerPOData.quantity || "");
      // Set other fields accordingly
    }
  }, []);
  const handleSave = async () => {
    const selectedCustomerPODataForpoNo = JSON.parse(
      localStorage.getItem("selectedCustomerPO")
    );
    console.log(
      "selectedCustomerPOData.poNo",
      selectedCustomerPODataForpoNo.poNo
    );
    // Prepare data to send to the API
    const data = {
      poNo: selectedCustomerPODataForpoNo.poNo,
      productionSheetName,
      itemDescription,
      materialIssue,
      requiredResources,
      productAndCustomer,
      legalAndApplicable,
      contingencyPlanning,
      verification,
      selectedFile,
      validation,
      monitoring,
      measurement,
      inspection,
      management,
      recordsEvidence,
      planningQuantity,
      planningDate,
      achievementQuantity,
      achievementDate,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/production/createPlanningSheet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Assuming the response contains some data or confirmation message
      const responseData = await response.json();
      console.log("Response:", responseData);

      // Redirect or perform any other actions after successful save
      router.push("/production/production-planning-sheets");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Event handlers for input changes
  const handlePlanningQuantityChange = (e) => {
    setPlanningQuantity(e.target.value);
  };

  const handlePlanningDateChange = (e) => {
    const formattedDate = new Date(e.target.value).toISOString(); // Convert date to ISO format
    setPlanningDate(formattedDate);
  };

  const handleAchievementQuantityChange = (e) => {
    setAchievementQuantity(e.target.value);
  };

  const handleAchievementDateChange = (e) => {
    const formattedDate = new Date(e.target.value).toISOString(); // Convert date to ISO format
    setAchievementDate(formattedDate);
  };

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

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2">
          {/* First Column */}
          <div className="flex flex-col items-start">
            <div className="flex items-center my-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  placeholder="Input"
                  value={productionSheetName}
                  onChange={(e) => setProductionSheetName(e.target.value)}
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Production Sheet Name
                </span>
              </label>
            </div>
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  placeholder="Input"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Item Description
                </span>
              </label>
            </div>
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  placeholder="Input"
                  value={materialIssue}
                  onChange={(e) => setMaterialIssue(e.target.value)}
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Material Issue
                </span>
              </label>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  placeholder="Input"
                  value={requiredResources}
                  onChange={(e) => setRequiredResources(e.target.value)}
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Required Resources
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  placeholder="Input"
                  value={productAndCustomer}
                  onChange={(e) => setProductAndCustomer(e.target.value)}
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Product and Customer
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  placeholder="Input"
                  value={legalAndApplicable}
                  onChange={(e) => setLegalAndApplicable(e.target.value)}
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Legal and Applicable
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  placeholder="Input"
                  value={contingencyPlanning}
                  onChange={(e) => setContingencyPlanning(e.target.value)}
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Contingency Planning
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  placeholder="Input"
                  value={verification}
                  onChange={(e) => setVerification(e.target.value)}
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Verification
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
          </div>

          {/* Second Column */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 my-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  value={validation}
                  onChange={(e) => setValidation(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Validation
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  value={monitoring}
                  onChange={(e) => setMonitoring(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Monitoring
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  value={measurement}
                  onChange={(e) => setMeasurement(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Measurement
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  value={inspection}
                  onChange={(e) => setInspection(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Inspection
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  value={management}
                  onChange={(e) => setManagement(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Management
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  value={recordsEvidence}
                  onChange={(e) => setRecordsEvidence(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Records Need to Provide Evidence
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
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
                <FiFile className="ml-2" /> {/* File icon */}
              </button>
              {selectedFile && (
                <span className="ml-2">{selectedFile.name}</span>
              )}
            </div>
            <p className="ml-2 text-sm text-red-600">
              Only PDF files are allowed and only one file can be selected.
            </p>
          </div>
        </div>

        <hr className="my-4 border-t border-gray-300" />

        {/* Second Form */}
        <div className="w-full ">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2">
            {/* First Column */}
            <div className="flex flex-col items-start">
              <h3 className="mb-4 text-[16px] font-semibold">Planning</h3>
              <div className="flex items-center mb-4">
                <label className="relative cursor-pointer App">
                  <input
                    type="text"
                    value={planningQuantity}
                    onChange={handlePlanningQuantityChange}
                    placeholder="Input"
                    className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                  />
                  <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                    Quantity
                  </span>
                </label>
              </div>
              <div className="flex items-center mb-4">
                <label htmlFor="planningDate" className="w-32 mr-2 text-[16px]">
                  Date:
                </label>
                <input
                  type="date"
                  id="planningDate"
                  value={planningDate}
                  onChange={handlePlanningDateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col items-start">
              <h3 className="mb-4 text-[16px] font-semibold">Achievement</h3>
              <div className="flex items-center mb-4">
                <label className="relative cursor-pointer App">
                  <input
                    type="text"
                    value={achievementQuantity}
                    onChange={handleAchievementQuantityChange}
                    placeholder="Input"
                    className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                  />
                  <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                    Quantity
                  </span>
                </label>
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="achievementDate"
                  className="w-32 mr-2 text-[16px]"
                >
                  Date:
                </label>
                <input
                  type="date"
                  id="achievementDate"
                  value={achievementDate}
                  onChange={handleAchievementDateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4 border-t border-gray-300" />
        <div className="flex justify-end">
          <button
            onClick={handleSave}
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

export default ProductionSheetForm;
