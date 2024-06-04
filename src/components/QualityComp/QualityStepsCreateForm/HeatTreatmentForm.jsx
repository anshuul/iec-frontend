"use client";
import axios from "axios";

import Container from "@/components/common/Container";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Icons
import { FiArrowLeft, FiFile, FiPrinter, FiSave } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TiPlus } from "react-icons/ti";
import { FcGallery } from "react-icons/fc";

// Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HeatTreatmentForm = () => {
  const router = useRouter();
  const [selectedCustomerPO, setSelectedCustomerPO] = useState(null);

  useEffect(() => {
    // Get data from localStorage when the component mounts
    const data = JSON.parse(localStorage.getItem("selectedCustomerPO"));
    setSelectedCustomerPO(data);
  }, []);

  console.log("selectedCustomerPO in heat treatment", selectedCustomerPO);

  const [htrNo, setHtrNo] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [process, setProcess] = useState("Quenching and Tempering");
  const [testingInstrumentId, setTestingInstrumentId] = useState("HARDNESS");
  const [manufacturingEquipment, setManufacturingEquipment] =
    useState("PIT FURNANCE");
  const [material, setMaterial] = useState("");

  const [heatNo, setHeatNo] = useState("");
  const [requiredHardness, setRequiredHardness] = useState("");
  const [achieved, setAchieved] = useState("");
  const [hardeningProcessNot, setHardeningProcessNot] = useState(
    "Temp / Time and Quenching Media"
  );
  const [temperingProcessNot, setTemperingProcessNot] = useState(
    "Time /Temperature and Cooling media"
  );

  const [date, setDate] = useState("");
  // For Image
  const [selectedImages, setSelectedImages] = useState([]);
  // For PDF
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 2) {
      alert("You can only select up to 2 images.");
      return;
    }
    const newSelectedImages = [...selectedImages, ...files].slice(0, 2);
    setSelectedImages(newSelectedImages);
    console.log("newSelectedImages", newSelectedImages);
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

  console.log("selectedFile in HeatTreatment", selectedFile);

  const handleChooseImageClick = () => {
    document.getElementById("attachment").click();
  };

  const removeImage = (index) => {
    const newSelectedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newSelectedImages);
  };

  const saveFormData = async () => {
    try {
      const formData = new FormData();
      formData.append("htrNo", htrNo);
      formData.append("itemDescription", itemDescription);
      formData.append("quantity", quantity);
      formData.append("process", process);
      formData.append("testingInstrumentId", testingInstrumentId);
      formData.append("manufacturingEquipment", manufacturingEquipment);
      formData.append("material", material);
      formData.append("heatNo", heatNo);
      formData.append("requiredHardness", requiredHardness);
      formData.append("achieved", achieved);
      formData.append("hardeningProcessNot", hardeningProcessNot);
      formData.append("temperingProcessNot", temperingProcessNot);
      formData.append("date", date);
      formData.append("attachmentPoNo", selectedCustomerPO.poNo);
      formData.append("processName", "HeatTreatment");
      selectedImages.forEach((image, index) => {
        formData.append(`newSelectedImages`, image);
      });

      // Call your API endpoint here with axios
      const response = await axios.post(
        "http://localhost:8000/api/quality/heatTreatment/create-heatTreatment-report",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response in quality module heat treat report", response);
      router.push("/quality/heat-treatment");
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
                  id="htrNo"
                  type="text"
                  value={htrNo}
                  onChange={(e) => setHtrNo(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  HTR No
                </span>
              </label>
            </div>

            {/* Process */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="process"
                  type="text"
                  value={process}
                  onChange={(e) => setProcess(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Process
                </span>
              </label>
            </div>

            {/* manufacturingEquipment */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="manufacturingEquipment"
                  type="text"
                  value={manufacturingEquipment}
                  onChange={(e) => setManufacturingEquipment(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Manufacturing Equipment With ID No.
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

            {/* hardeningProcessNot */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="hardeningProcessNot"
                  type="text"
                  value={hardeningProcessNot}
                  onChange={(e) => setHardeningProcessNot(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Hardening Process
                </span>
              </label>
            </div>

            {/* achieved */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="achieved"
                  type="text"
                  value={achieved}
                  onChange={(e) => setAchieved(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Achieved
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

            {/* TestingInstrumentId */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="testingInstrumentId"
                  type="text"
                  value={testingInstrumentId}
                  onChange={(e) => setTestingInstrumentId(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Testing Instrument with ID No
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

            {/* requiredHardness */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="requiredHardness"
                  type="text"
                  value={requiredHardness}
                  onChange={(e) => setRequiredHardness(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Required Hardness
                </span>
              </label>
            </div>

            {/* temperingProcessNot */}
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  id="temperingProcessNot"
                  type="text"
                  value={temperingProcessNot}
                  onChange={(e) => setTemperingProcessNot(e.target.value)}
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Tempering Process
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Second Form */}
        <div className="w-full ">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2">
            {/* First Column */}
            <div className="flex flex-col items-start">
              {/* Choose Image */}
              <div className="flex items-center mb-4">
                <label htmlFor="attachment" className="text-[16px]">
                  Choose Image
                </label>
                <input
                  type="file"
                  id="attachment"
                  className="hidden"
                  name="attachment"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelection}
                />
                <button
                  onClick={handleChooseImageClick}
                  className="flex items-center px-4 py-2 ml-2 text-black bg-gray-300 rounded"
                >
                  Choose Image
                  <FcGallery className="ml-2" />
                </button>
                <div className="flex flex-wrap ml-4">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="flex items-center mr-4 mb-2">
                      <span className="mr-2">{image.name}</span>
                      <button
                        onClick={() => removeImage(index)}
                        className="flex items-center text-red-600 bg-none p-0"
                      >
                        <IoIosCloseCircleOutline className="text-2xl cursor-pointer" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attach PDF */}
              <div className="flex items-center">
                <label htmlFor="attachPDF" className="text-[16px]">
                  Attachments
                </label>
                <input
                  type="file"
                  id="attachPDF"
                  className="hidden"
                  name="attachPDF"
                  accept=".pdf"
                  onChange={handleFileSelection}
                />
                <button
                  onClick={() => document.getElementById("attachPDF").click()}
                  className="flex items-center px-4 py-2 ml-2 text-black bg-gray-300 rounded"
                >
                  Choose file
                  <FcGallery className="ml-2" />
                </button>
                {selectedFile !== null && (
                  <>
                    <span className="ml-2">
                      {selectedFile.name || selectedFile.fileName}
                    </span>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="flex items-center text-red-600 bg-none"
                    >
                      <IoIosCloseCircleOutline className="ml-2 text-2xl" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col items-start">
              {/* Date */}
              <div className="flex items-center mb-4">
                <label
                  htmlFor="deliveryDate"
                  className="w-auto mr-2 text-[16px]"
                >
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
      </div>
    </Container>
  );
};

export default HeatTreatmentForm;
