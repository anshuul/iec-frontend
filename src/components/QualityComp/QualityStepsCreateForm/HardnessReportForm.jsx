"use client";
import axios from "axios";

import Container from "@/components/common/Container";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Icons
import { FiArrowLeft, FiPrinter, FiSave } from "react-icons/fi";

// Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HardnessReportForm = () => {
  const router = useRouter();

  const [hdrNo, setHdrNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPoNo, setCustomerPoNo] = useState("");
  const [soNo, setSoNo] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [heatNo, setHeatNo] = useState("");
  const [material, setMaterial] = useState("");
  const [acceptableHardness, setAcceptableHardness] = useState("");
  const [testMethod, setTestMethod] = useState("ASTM A370");
  const [instrumentName, setInstrumentName] = useState(
    "ROCKWELL HARDNESS TESTER"
  );
  const [instrumentID, setInstrumentID] = useState("2016/138  HT-03");
  const [acceptanceStandard, setAcceptanceStandard] =
    useState("ASTM A193/A193M");
  const [stageOfInspection, setStageOfInspection] = useState("FINAL");
  const [testResult, setTestResult] = useState("FOUND SATISFACTORY");
  const [date, setDate] = useState("");

  const saveFormData = async () => {
    try {
      //   const formData = new FormData();
      //   formData.append("hdrNo", hdrNo);
      //   formData.append("customerName", customerName);
      //   formData.append("customerPoNo", customerPoNo);
      //   formData.append("soNo", soNo);
      //   formData.append("itemDescription", itemDescription);
      //   formData.append("quantity", quantity);
      //   formData.append("heatNo", heatNo);
      //   formData.append("material", material);
      //   formData.append("acceptableHardness", acceptableHardness);
      //   formData.append("testMethod", testMethod);
      //   formData.append("instrumentName", instrumentName);
      //   formData.append("instrumentID", instrumentID);
      //   formData.append("acceptanceStandard", acceptanceStandard);
      //   formData.append("stageOfInspection", stageOfInspection);
      //   formData.append("testResult", testResult);
      //   formData.append("date", date);

      const formData = {
        hdrNo,
        customerName,
        customerPoNo,
        soNo,
        itemDescription,
        quantity,
        heatNo,
        material,
        acceptableHardness,
        testMethod,
        instrumentName,
        instrumentID,
        acceptanceStandard,
        stageOfInspection,
        testResult,
        date: date,
      };

      // Call your API endpoint here with axios
      const response = await axios.post(
        "${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quality/hardness/create-hardness-report",
        formData
      );
      console.log("response in quality module heat treat report", response);
      router.push("/quality");
    } catch (error) {
      console.error("Error occurred while saving form data:", error);
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
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
            {/* HTR NO */}
            <div className="flex items-center my-4">
              <label className="relative cursor-pointer App">
                <input
                  id="hdrNo"
                  type="text"
                  value={hdrNo}
                  onChange={(e) => setHdrNo(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  HDR No
                </span>
              </label>
            </div>

            {/* customerName */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="customerName"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  CustomerName
                </span>
              </label>
            </div>

            {/* itemDescription */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="itemDescription"
                  type="text"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Item Description
                </span>
              </label>
            </div>

            {/* heatNo */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="heatNo"
                  type="text"
                  value={heatNo}
                  onChange={(e) => setHeatNo(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Heat No.
                </span>
              </label>
            </div>

            {/* instrumentName */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="instrumentName"
                  type="text"
                  value={instrumentName}
                  onChange={(e) => setInstrumentName(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Instrument Name
                </span>
              </label>
            </div>

            {/* acceptableHardness */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="acceptableHardness"
                  type="text"
                  value={acceptableHardness}
                  onChange={(e) => setAcceptableHardness(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  AcceptableHardness
                </span>
              </label>
            </div>

            {/* acceptanceStandard */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="acceptanceStandard"
                  type="text"
                  value={acceptanceStandard}
                  onChange={(e) => setAcceptanceStandard(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  AcceptanceStandard
                </span>
              </label>
            </div>

            {/* testResult */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="testResult"
                  type="text"
                  value={testResult}
                  onChange={(e) => setTestResult(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Test Result
                </span>
              </label>
            </div>
          </div>

          {/* Second Column */}
          <div className="flex flex-col items-start">
            {/* Item Description */}
            <div className="flex items-center my-4">
              <label className="relative cursor-pointer App">
                <input
                  id="soNo"
                  type="text"
                  value={soNo}
                  onChange={(e) => setSoNo(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  SO No.
                </span>
              </label>
            </div>

            {/* CustomerPoNo */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="customerPoNo"
                  type="text"
                  value={customerPoNo}
                  onChange={(e) => setCustomerPoNo(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  CustomerPoNo
                </span>
              </label>
            </div>

            {/* Quantity */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="quantity"
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Quantity
                </span>
              </label>
            </div>

            {/* material */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="material"
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Testing Instrument with ID No
                </span>
              </label>
            </div>

            {/* Test Method */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="testMethod"
                  type="text"
                  value={testMethod}
                  onChange={(e) => setTestMethod(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Test Method
                </span>
              </label>
            </div>

            {/* instrumentID */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="instrumentID"
                  type="text"
                  value={instrumentID}
                  onChange={(e) => setInstrumentID(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Instrument ID
                </span>
              </label>
            </div>

            {/* stageOfInspection */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="stageOfInspection"
                  type="text"
                  value={stageOfInspection}
                  onChange={(e) => setStageOfInspection(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Stage Of Inspection
                </span>
              </label>
            </div>

            {/* Date */}
            <div className="flex items-center mb-4">
              <label htmlFor="deliveryDate" className="w-auto mr-2 text-[16px]">
                Date:
              </label>

              <DatePicker
                selected={date}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
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

export default HardnessReportForm;
