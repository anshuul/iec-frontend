"use client";
import axios from "axios";

import Container from "@/components/common/Container";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Icons
import { FiArrowLeft, FiPrinter, FiSave } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FcGallery } from "react-icons/fc";

// Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputField from "@/components/common/InpuField";

const MPIReportForm = () => {
  const router = useRouter();
  const [selectedCustomerPO, setSelectedCustomerPO] = useState(null);

  useEffect(() => {
    // Get data from localStorage when the component mounts
    const data = JSON.parse(localStorage.getItem("selectedPOListItem"));
    setSelectedCustomerPO(data);
  }, []);

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

  const [selectedMagnetizingProcess, setSelectedMagnetizingProcess] =
    useState("Continuous");
  const [selectedMagnetizing, setSelectedMagnetizing] = useState("Coil");

  const handleMagnetizingProcessChange = (e) => {
    setSelectedMagnetizingProcess(e.target.value);
  };
  const handleMagnetizingChange = (e) => {
    setSelectedMagnetizing(e.target.value);
  };

  const [selectedMagnetizingCurrent, setSelectedMagnetizingCurrent] =
    useState("Altemating");
  const [selectedMethod, setSelectedMethod] = useState("Permanent");

  const handleMagnetizingCurrentChange = (e) => {
    setSelectedMagnetizingCurrent(e.target.value);
  };
  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const [selectedDemagnetization, setSelectedDemagnetization] = useState("Yes");

  const handleDemagnetizationChange = (e) => {
    setSelectedDemagnetization(e.target.value);
  };

  const [magneticFieldIndicator, setMagneticFieldIndicator] = useState(
    "Bumah Castrol Strip"
  );
  const [blackLightIntensity, setBlackLightIntensity] = useState("XXXX");
  const [powderConcertation, setPowderConcertation] = useState("XXXX");
  const [requiredHardness, setRequiredHardness] = useState("");
  const [achieved, setAchieved] = useState("");

  // State for "whiteContrastPaint MakeType"
  const [whiteContrastPaintMakeType, setWhiteContrastPaintMakeType] =
    useState("");
  const [whiteContrastPaintLotNo, setWhiteContrastPaintLotNo] = useState("");

  // State for "Black Magnetic ink"
  const [blackMagneticInkMakeType, setBlackMagneticInkMakeType] = useState("");
  const [blackMagneticInkLotNo, setBlackMagneticInkLotNo] = useState("");

  // State for "Wet Fluorescent"
  const [wetFluorescentMakeType, setWetFluorescentMakeType] = useState("");
  const [wetFluorescentLotNo, setWetFluorescentLotNo] = useState("");

  // State for "Dry Powder"
  const [dryPowderMakeType, setDryPowderMakeType] = useState("");
  const [dryPowderLotNo, setDryPowderLotNo] = useState("");

  // Scope Of Work
  const [scopeOfWork, setScopeOfWork] = useState("XXXX");
  const [component, setComponent] = useState("XXXX");
  const [componentResult, setComponentResult] = useState("XXXX");
  const [defect, setDefect] = useState("XXXX");
  const [observation, setObservation] = useState("XXXX");

  // Equipment Used During Inspection
  // State for "AC/DC Yoke"
  const [acdcYokeEquipmentID, setACDCYokeEquipmentID] = useState("");
  const [acdcYokeCalibrationValidity, setACDCYokeCalibrationValidity] =
    useState("");

  // State for Black Light
  const [blackLightEquipmentID, setBlackLightEquipmentID] = useState("");
  const [blackLightCalibrationValidity, setBlackLightCalibrationValidity] =
    useState("");

  // State for Lux Meter
  const [luxMeterEquipmentID, setLuxMeterEquipmentID] = useState("");
  const [luxMeterCalibrationValidity, setLuxMeterCalibrationValidity] =
    useState("");

  // State for Dry Powder
  const [dryPowderEquipmentID, setDryPowderEquipmentID] = useState("");
  const [dryPowderCalibrationValidity, setDryPowderCalibrationValidity] =
    useState("");

  // State for UV Meter
  const [uvMeterEquipmentID, setUVMeterEquipmentID] = useState("");
  const [uvMeterCalibrationValidity, setUVMeterCalibrationValidity] =
    useState("");

  // State for Pie Gauge
  const [pieGaugeEquipmentID, setPieGaugeEquipmentID] = useState("");
  const [pieGaugeCalibrationValidity, setPieGaugeCalibrationValidity] =
    useState("");

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
      formData.append("mpirNo", mpirNo);
      formData.append("productName", productName);
      formData.append("drawingNo", drawingNo);
      formData.append("quantity", quantity);
      formData.append("materialType", materialType);
      formData.append("qaNO", qaNO);
      formData.append("mpiNo", mpiNo);
      formData.append("heatNo", heatNo);
      formData.append("acceptanceStandard", acceptanceStandard);
      formData.append("material", material);
      formData.append("materialSpecification", materialSpecification);
      formData.append("surfaceCondition", surfaceCondition);
      formData.append("testTemperature", testTemperature);
      formData.append("illumination", illumination);
      formData.append("equipmentName", equipmentName);
      formData.append("illuminationLocation", illuminationLocation);
      formData.append("technique", technique);
      formData.append("testweight", testweight);
      formData.append("selectedMagnetizingProcess", selectedMagnetizingProcess);
      formData.append("selectedMagnetizing", selectedMagnetizing);
      formData.append("selectedMagnetizingCurrent", selectedMagnetizingCurrent);
      formData.append("selectedMethod", selectedMethod);
      formData.append("selectedDemagnetization", selectedDemagnetization);
      formData.append("magneticFieldIndicator", magneticFieldIndicator);
      formData.append("blackLightIntensity", blackLightIntensity);
      formData.append("powderConcertation", powderConcertation);
      formData.append("requiredHardness", requiredHardness);
      formData.append("achieved", achieved);
      formData.append("whiteContrastPaintMakeType", whiteContrastPaintMakeType);
      formData.append("whiteContrastPaintLotNo", whiteContrastPaintLotNo);
      formData.append("blackMagneticInkMakeType", blackMagneticInkMakeType);
      formData.append("blackMagneticInkLotNo", blackMagneticInkLotNo);
      formData.append("wetFluorescentMakeType", wetFluorescentMakeType);
      formData.append("wetFluorescentLotNo", wetFluorescentLotNo);
      formData.append("dryPowderMakeType", dryPowderMakeType);
      formData.append("dryPowderLotNo", dryPowderLotNo);
      formData.append("scopeOfWork", scopeOfWork);
      formData.append("component", component);
      formData.append("componentResult", componentResult);
      formData.append("defect", defect);
      formData.append("observation", observation);
      formData.append("acdcYokeEquipmentID", acdcYokeEquipmentID);
      formData.append(
        "acdcYokeCalibrationValidity",
        acdcYokeCalibrationValidity
      );
      formData.append("blackLightEquipmentID", blackLightEquipmentID);
      formData.append(
        "blackLightCalibrationValidity",
        blackLightCalibrationValidity
      );
      formData.append("luxMeterEquipmentID", luxMeterEquipmentID);
      formData.append(
        "luxMeterCalibrationValidity",
        luxMeterCalibrationValidity
      );
      formData.append("dryPowderEquipmentID", dryPowderEquipmentID);
      formData.append(
        "dryPowderCalibrationValidity",
        dryPowderCalibrationValidity
      );
      formData.append("uvMeterEquipmentID", uvMeterEquipmentID);
      formData.append("uvMeterCalibrationValidity", uvMeterCalibrationValidity);
      formData.append("pieGaugeEquipmentID", pieGaugeEquipmentID);
      formData.append(
        "pieGaugeCalibrationValidity",
        pieGaugeCalibrationValidity
      );
      formData.append("date", date);

      formData.append("poNo", selectedCustomerPO.poNo);
      formData.append("listItemNo", selectedCustomerPO.POListNo);
      formData.append("listItemID", selectedCustomerPO._id);

      formData.append("attachmentPoNo", selectedCustomerPO.poNo);
      formData.append("QualityProcessName", "MPIReport");
      selectedImages.forEach((image, index) => {
        formData.append(`newSelectedImages`, image);
      });

      // Call your API endpoint here with axios
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quality/mpi/create-mpi-report`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response in quality module heat treat report", response);
      router.push("/quality/magnetic-particle-inspection");
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
                value={selectedMagnetizingProcess}
                onChange={handleMagnetizingProcessChange}
                className="h-10 w-44 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
              >
                <option value="Continuous">Continuous</option>
                <option value="Residual">Residual</option>
              </select>
            </div>

            {/* Magnetizing */}
            <div className="flex items-center gap-2 mb-4">
              <label>Magnetizing:-</label>
              <select
                id="selectedMagnetizing"
                value={selectedMagnetizing}
                onChange={handleMagnetizingChange}
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
                value={selectedMagnetizingCurrent}
                onChange={handleMagnetizingCurrentChange}
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
                id="selectedMethod"
                value={selectedMethod}
                onChange={handleMethodChange}
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
                id="selectedDemagnetization"
                value={selectedDemagnetization}
                onChange={handleDemagnetizationChange}
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
          </div>
        </div>

        <hr className="my-2 border-t border-gray-300" />
        <h1 className="font-bold text-xl">Consumables</h1>
        {/* White Contrast Paint */}
        <div className="flex flex-row flex-wrap items-start space-x-0 md:space-x-4 mb-4">
          <InputField
            id="whiteContrastPaintMakeType"
            value={whiteContrastPaintMakeType}
            onChange={(e) => setWhiteContrastPaintMakeType(e.target.value)}
            placeholder="Input"
            label="Make / Type"
            text="White Contrast Paint"
            firstInput={true}
          />
          <InputField
            id="whiteContrastPaintLotNo"
            value={whiteContrastPaintLotNo}
            onChange={(e) => setWhiteContrastPaintLotNo(e.target.value)}
            placeholder="Input"
            label="Lot No / Batch No"
            firstInput={true}
          />
        </div>
        {/* Black Magnetic ink */}
        <div className="flex flex-row items-center space-x-4">
          <InputField
            id="blackMagneticInkMakeType"
            value={blackMagneticInkMakeType}
            onChange={(e) => setBlackMagneticInkMakeType(e.target.value)}
            placeholder="Input"
            label="Make / Type"
            text="Black Magnetic ink"
          />
          <InputField
            id="blackMagneticInkLotNo"
            value={blackMagneticInkLotNo}
            onChange={(e) => setBlackMagneticInkLotNo(e.target.value)}
            placeholder="Input"
            label="Lot No / Batch No"
          />
        </div>
        {/* Wet Fluorescent */}
        <div className="flex flex-row items-center space-x-4">
          <InputField
            id="wetFluorescentMakeType"
            value={wetFluorescentMakeType}
            onChange={(e) => setWetFluorescentMakeType(e.target.value)}
            placeholder="Input"
            label="Make / Type"
            text="Wet Fluorescent"
          />
          <InputField
            id="wetFluorescentLotNo"
            value={wetFluorescentLotNo}
            onChange={(e) => setWetFluorescentLotNo(e.target.value)}
            placeholder="Input"
            label="Lot No / Batch No"
          />
        </div>
        {/* Dry Powder */}
        <div className="flex flex-row items-center space-x-4">
          <InputField
            id="dryPowderMakeType"
            value={dryPowderMakeType}
            onChange={(e) => setDryPowderMakeType(e.target.value)}
            placeholder="Input"
            label="Make / Type"
            text="Dry Powder"
          />
          <InputField
            id="dryPowderLotNo"
            value={dryPowderLotNo}
            onChange={(e) => setDryPowderLotNo(e.target.value)}
            placeholder="Input"
            label="Lot No / Batch No"
          />
        </div>

        <hr className="my-2 border-t border-gray-300" />
        <h1 className="font-bold text-xl">Scope of Work</h1>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2">
          {/* First Column */}
          <div className="flex flex-col items-start">
            {/* Scope of Work */}
            <InputField
              id="scopeOfWork"
              value={scopeOfWork}
              onChange={(e) => setScopeOfWork(e.target.value)}
              placeholder="Input"
              label="Scope of Work"
              firstInput={true}
            />

            {/* Component */}
            <InputField
              id="component"
              value={component}
              onChange={(e) => setComponent(e.target.value)}
              placeholder="Input"
              label="Component"
            />

            {/* Comments / Result  */}
            <InputField
              id="componentResult"
              value={componentResult}
              onChange={(e) => setComponentResult(e.target.value)}
              placeholder="Input"
              label="Comments / Result"
            />
          </div>

          {/* Second Column */}
          <div className="flex flex-col items-start">
            {/* Defect */}
            <InputField
              id="defect"
              value={defect}
              onChange={(e) => setDefect(e.target.value)}
              placeholder="Input"
              label="Defect"
              firstInput={true}
            />

            {/* Observation */}
            <InputField
              id="observation"
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Input"
              label="Observation"
            />
          </div>
        </div>
        <hr className="my-2 border-t border-gray-300" />
        <h1 className="font-bold text-xl">Equipment Used During Inspection</h1>
        {/* AC/DC Yoke */}
        <div className="flex flex-row flex-wrap items-start space-x-0 md:space-x-4 mb-4">
          <InputField
            id="acdcYokeEquipmentID"
            value={acdcYokeEquipmentID}
            onChange={(e) => setACDCYokeEquipmentID(e.target.value)}
            placeholder="Input"
            label="Equipment ID No / Sr. No"
            text="AC/DC Yoke"
            firstInput={true}
          />
          <InputField
            id="acdcYokeCalibrationValidity"
            value={acdcYokeCalibrationValidity}
            onChange={(e) => setACDCYokeCalibrationValidity(e.target.value)}
            placeholder="Input"
            label="Calibration Validity"
            firstInput={true}
          />
        </div>
        {/* Black Light */}
        <div className="flex flex-row items-center space-x-4">
          <InputField
            id="blackLightEquipmentID"
            value={blackLightEquipmentID}
            onChange={(e) => setBlackLightEquipmentID(e.target.value)}
            placeholder="Input"
            label="Equipment ID No / Sr. No"
            text="Black Light"
          />
          <InputField
            id="blackLightCalibrationValidity"
            value={blackLightCalibrationValidity}
            onChange={(e) => setBlackLightCalibrationValidity(e.target.value)}
            placeholder="Input"
            label="Calibration Validity"
          />
        </div>
        {/* Lux Meter */}
        <div className="flex flex-row items-center space-x-4">
          <InputField
            id="luxMeterEquipmentID"
            value={luxMeterEquipmentID}
            onChange={(e) => setLuxMeterEquipmentID(e.target.value)}
            placeholder="Input"
            label="Equipment ID No / Sr. No"
            text="Lux Meter"
          />
          <InputField
            id="luxMeterCalibrationValidity"
            value={luxMeterCalibrationValidity}
            onChange={(e) => setLuxMeterCalibrationValidity(e.target.value)}
            placeholder="Input"
            label="Calibration Validity"
          />
        </div>
        {/* Dry Powder */}
        <div className="flex flex-row items-center space-x-4">
          <InputField
            id="dryPowderEquipmentID"
            value={dryPowderEquipmentID}
            onChange={(e) => setDryPowderEquipmentID(e.target.value)}
            placeholder="Input"
            label="Equipment ID No / Sr. No"
            text="Test Weight"
          />
          <InputField
            id="dryPowderCalibrationValidity"
            value={dryPowderCalibrationValidity}
            onChange={(e) => setDryPowderCalibrationValidity(e.target.value)}
            placeholder="Input"
            label="Calibration Validity"
          />
        </div>
        {/* UV meter */}
        <div className="flex flex-row items-center space-x-4">
          <InputField
            id="uvMeterEquipmentID"
            value={uvMeterEquipmentID}
            onChange={(e) => setUVMeterEquipmentID(e.target.value)}
            placeholder="Input"
            label="Equipment ID No / Sr. No"
            text="UV meter"
          />
          <InputField
            id="uvMeterCalibrationValidity"
            value={uvMeterCalibrationValidity}
            onChange={(e) => setUVMeterCalibrationValidity(e.target.value)}
            placeholder="Input"
            label="Calibration Validity"
          />
        </div>
        {/* Pie Gauge */}
        <div className="flex flex-row items-center space-x-4">
          <InputField
            id="pieGaugeEquipmentID"
            value={pieGaugeEquipmentID}
            onChange={(e) => setPieGaugeEquipmentID(e.target.value)}
            placeholder="Input"
            label="Equipment ID No / Sr. No"
            text="Pie Gauge"
          />
          <InputField
            id="pieGaugeCalibrationValidity"
            value={pieGaugeCalibrationValidity}
            onChange={(e) => setPieGaugeCalibrationValidity(e.target.value)}
            placeholder="Input"
            label="Calibration Validity"
          />
        </div>

        <hr className="my-2 border-t border-gray-300" />
        {/* Last part of  Form */}
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
