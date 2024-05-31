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
import InputField from "@/components/common/InpuField";

const MPIReportForm = () => {
  const router = useRouter();
  const [mpirNo, setMpirNo] = useState("");
  const [productName, setProductName] = useState("");
  const [drawingNo, setDrawingNo] = useState("DRG-01");
  const [quantity, setQuantity] = useState("");
  const [materialType, setMaterialType] = useState("MACHINED STUDS");
  const [qaNO, setQaNO] = useState("");
  const [mpiNo, setMPINO] = useState("IEC/SOP/024");
  const [heatNo, setHeatNo] = useState("");
  const [acceptanceStandard, setAcceptanceStandard] = useState(
    "ASME SEC III NC 2545"
  );
  const [material, setMaterial] = useState("");
  const [materialSpecification, setMaterialSpecification] = useState("");
  const [surfaceCondition, setSurfaceCondition] = useState("DRY");
  const [testTemperature, setTestTemperature] = useState("AMBIENT");
  const [illumination, setIllumination] = useState("XXXX");
  const [equipmentName, setEquipmentName] = useState("AC Yoke");
  const [illuminationLocation, setIlluminationLocation] = useState("XXXX");
  const [technique, setTechnique] = useState("Wet Fluorescent");
  const [testweight, setTestweight] = useState("");
  const [magnetizingProcess, setMagnetizingProcess] = useState("");
  const [magnetizingCurrent, setMagnetizingCurrent] = useState("");
  const [method, setMethod] = useState("");
  const [magneticFieldIndicator, setMagneticFieldIndicator] = useState(
    "Bumah Castrol Strip"
  );
  const [blackLightIntensity, setBlackLightIntensity] = useState("XXXX");
  const [demagnetization, setDemagnetization] = useState("");
  const [powderConcertation, setPowderConcertation] = useState("XXXX");
  const [scopeOfWork, setScopeOfWork] = useState("XXXX");

  const [htrNo, setHtrNo] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [process, setProcess] = useState("Quenching and Tempering");
  const [testingInstrumentId, setTestingInstrumentId] = useState("HARDNESS");
  const [manufacturingEquipment, setManufacturingEquipment] =
    useState("PIT FURNANCE");

  const [requiredHardness, setRequiredHardness] = useState("");
  const [achieved, setAchieved] = useState("");
  const [hardeningProcessNot, setHardeningProcessNot] = useState(
    "Temp / Time and Quenching Media"
  );
  const [temperingProcessNot, setTemperingProcessNot] = useState(
    "Time /Temperature and Cooling media"
  );

  const [date, setDate] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

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
      selectedImages.forEach((image, index) => {
        formData.append(`image_${index}`, image);
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
      <div className="w-full p-8 mx-auto bg-white rounded shadow-md h-[85vh] overflow-y-auto">
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
            <InputField
              id="mpirNo"
              value={mpirNo}
              onChange={(e) => setMpirNo(e.target.value)}
              firstInput={true}
              placeholder="Input"
              label="MPIR No"
            />

            {/* Product Name */}
            <InputField
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Input"
              label="Product Name"
            />

            {/* QA NO */}
            <InputField
              id="qaNO"
              value={qaNO}
              onChange={(e) => setQaNO(e.target.value)}
              placeholder="Input"
              label="QA No"
            />

            {/* MPI NO */}
            <InputField
              id="mpiNo"
              value={mpiNo}
              onChange={(e) => setMPINO(e.target.value)}
              placeholder="Input"
              label="Magnetic Particle Inspection Procedure No."
            />

            {/* Acceptance Standard */}
            <InputField
              id="acceptanceStandard"
              value={acceptanceStandard}
              onChange={(e) => setAcceptanceStandard(e.target.value)}
              placeholder="Input"
              label="Acceptance Standard"
            />

            {/* Material Specification */}
            <InputField
              id="materialSpecification"
              value={materialSpecification}
              onChange={(e) => setMaterialSpecification(e.target.value)}
              placeholder="Input"
              label="Material Specification"
            />

            {/* Test Temperature */}
            <InputField
              id="testTemperature"
              value={testTemperature}
              onChange={(e) => setTestTemperature(e.target.value)}
              placeholder="Input"
              label="Test Temperature"
            />

            {/* Equipment Name */}
            <InputField
              id="equipmentName"
              value={equipmentName}
              onChange={(e) => setEquipmentName(e.target.value)}
              placeholder="Input"
              label="Equipment Name"
            />

            {/* Technique */}
            <InputField
              id="technique"
              value={technique}
              onChange={(e) => setTechnique(e.target.value)}
              placeholder="Input"
              label="Technique"
            />

            {/* Magnetizing Part */}
            {/* Magnetizing Process */}
            <div className="flex items-center gap-2 mb-4">
              <label>Magnetizing Process:-</label>
              <select
                id="selectedMagnetizingProcess"
                className="h-10 w-44 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
              >
                <option value="Continuous">Continuous</option>
                <option value="Residual">Residual</option>
              </select>
            </div>

            {/* Magnetizing */}
            <div className="flex items-center gap-2 mb-4">
              <label>Magnetizing Process:-</label>
              <select
                id="selectedMagnetizingProcess"
                className="h-10 w-44 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
              >
                <option value="Coil">Coil</option>
                <option value="Amp">Amp</option>
                <option value="Yoke">Yoke</option>
              </select>
            </div>

            {/* MagneticField Indicator */}
            <InputField
              id="magneticFieldIndicator"
              value={magneticFieldIndicator}
              onChange={(e) => setMagneticFieldIndicator(e.target.value)}
              placeholder="Input"
              label="MagneticField Indicator"
            />

            {/* Powder Concertation */}
            <InputField
              id="powderConcertation"
              value={powderConcertation}
              onChange={(e) => setPowderConcertation(e.target.value)}
              placeholder="Input"
              label="Powder Concertation"
            />

            {/* achieved */}
            <InputField
              id="achieved"
              value={achieved}
              onChange={(e) => setAchieved(e.target.value)}
              placeholder="Input"
              label="Achieved"
            />
          </div>

          {/* Second Column */}
          <div className="flex flex-col items-start">
            {/* DrawingNo */}
            <InputField
              id="drawingNo"
              value={drawingNo}
              onChange={(e) => setDrawingNo(e.target.value)}
              firstInput={true}
              placeholder="Input"
              label="Drawing No"
            />

            {/* Quantity */}
            <InputField
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Input"
              label="Quantity"
            />

            {/* Material Type */}
            <InputField
              id="materialType"
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
              placeholder="Input"
              label="Material Type"
            />

            {/* heatNo */}
            <InputField
              id="heatNo"
              value={heatNo}
              onChange={(e) => setHeatNo(e.target.value)}
              placeholder="Input"
              label="Heat No."
            />

            {/* Material */}
            <InputField
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Input"
              label="Material"
            />

            {/* Surface Condition */}
            <InputField
              id="surfaceCondition"
              value={surfaceCondition}
              onChange={(e) => setSurfaceCondition(e.target.value)}
              placeholder="Input"
              label="Surface Condition"
            />

            {/* Illumination */}
            <InputField
              id="illumination"
              value={illumination}
              onChange={(e) => setIllumination(e.target.value)}
              placeholder="Input"
              label="Illumination"
            />

            {/* Illumination Location */}
            <InputField
              id="illuminationLocation"
              value={illuminationLocation}
              onChange={(e) => setIlluminationLocation(e.target.value)}
              placeholder="Input"
              label="Illumination Location"
            />

            {/* Test Weight */}
            <InputField
              id="testweight"
              value={testweight}
              onChange={(e) => setTestweight(e.target.value)}
              placeholder="Input"
              label="Test Weight"
            />

            {/* Magnetizing Part */}
            {/* Magnetizing Current */}
            <div className="flex items-center gap-2 mb-4">
              <label>Magnetizing Current:-</label>
              <select
                id="selectedMagnetizingCurrent"
                className="h-10 w-44 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
              >
                <option value="Altemating">Altemating</option>
                <option value="HalfWave">Half Wave</option>
                <option value="Direct">Direct</option>
              </select>
            </div>

            {/* Method */}
            <div className="flex items-center gap-2 mb-4">
              <label>Method:-</label>
              <select
                id="selectedMagnetizingCurrent"
                className="h-10 w-44 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
              >
                <option value="Permanent">Permanent</option>
                <option value="DailyLiftCheck">Daily Lift Check</option>
              </select>
            </div>

            {/* Demagnetization */}
            <div className="flex items-center gap-2 mb-4">
              <label>Demagnetization:-</label>
              <select
                id="selectedMagnetizingCurrent"
                className="h-10 w-44 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Black Light Intensity */}
            <InputField
              id="blackLightIntensity"
              value={blackLightIntensity}
              onChange={(e) => setBlackLightIntensity(e.target.value)}
              placeholder="Input"
              label="Black Light Intensity"
            />

            {/* requiredHardness */}
            <InputField
              id="requiredHardness"
              value={requiredHardness}
              onChange={(e) => setRequiredHardness(e.target.value)}
              placeholder="Input"
              label="Required Hardness"
            />

            {/* Tempering ProcessNot */}
            <InputField
              id="temperingProcessNot"
              value={temperingProcessNot}
              onChange={(e) => setTemperingProcessNot(e.target.value)}
              placeholder="Input"
              label="Tempering Process"
            />
          </div>
        </div>

        {/* Second Form */}
        <div className="w-full ">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2">
            {/* First Column */}
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <label htmlFor="attachment" className="text-[16px]">
                  Attachment
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

export default MPIReportForm;
