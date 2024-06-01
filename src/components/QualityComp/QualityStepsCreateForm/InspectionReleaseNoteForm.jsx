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

const InspectionReleaseNoteForm = () => {
  const router = useRouter();
  const [irnNo, setIRNNo] = useState("");
  const [soNO, setSONO] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPONO, setCustomerPONO] = useState("");
  const [productionItemDescription, setProductionItemDescription] =
    useState("");

  // Item Info
  const [size, setSize] = useState("");
  const [bslType, setBSLType] = useState("");
  const [rawMaterialHeatNo, setRawMaterialHeatNo] = useState("");
  const [lotNO, setLotNO] = useState("");
  const [material, setMaterial] = useState("");
  const [poSrNO, setPOSrNO] = useState("");
  const [quantity, setQuantity] = useState("");

  // Applicable Standard
  const [applicableStandard, setApplicableStandard] = useState("");
  const [mpiExaminationReport, setMPIExaminationReport] = useState("");
  const [utTestReport, setUTTestReport] = useState("");
  const [visualInspection, setVisualInspection] = useState("");
  const [markingMonogramme, setMarkingMonogramme] = useState("");
  const [MTC, setMTC] = useState("");
  const [heatTreatment, setHeatTreatment] = useState("");
  const [coating, setCoating] = useState("");
  const [visualAndPhysicalInspection, setVisualAndPhysicalInspection] =
    useState("");

  const [date, setDate] = useState("");

  const saveFormData = async () => {};

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
            {/* COC No */}
            <InputField
              id="irnNo"
              value={irnNo}
              onChange={(e) => setIRNNo(e.target.value)}
              firstInput={true}
              placeholder="Input"
              label="IRN No"
            />
            {/* Customer PO No */}
            <InputField
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Input"
              label="Customer Name"
            />
            {/* Production Item Description */}
            <InputField
              id="productionItemDescription"
              value={productionItemDescription}
              onChange={(e) => setProductionItemDescription(e.target.value)}
              placeholder="Input"
              label="Production Item Description"
            />
          </div>

          {/* Second Column */}
          <div className="flex flex-col items-start">
            {/* SO. NO. */}
            <InputField
              id="soNO"
              value={soNO}
              onChange={(e) => setSONO(e.target.value)}
              firstInput={true}
              placeholder="Input"
              label="SO. No"
            />
            {/* Customer PONO */}
            <InputField
              id="customerPONO"
              value={customerPONO}
              onChange={(e) => setCustomerPONO(e.target.value)}
              placeholder="Input"
              label="Customer PO No"
            />
          </div>
        </div>

        <hr className="my-2 border-t border-gray-300" />
        <h1 className="font-bold text-xl">Item Info</h1>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2">
          {/* First Column */}
          <div className="flex flex-col items-start">
            {/* size */}
            <InputField
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              firstInput={true}
              placeholder="Input"
              label="Size"
            />
            {/* BSL Type */}
            <InputField
              id="bslType"
              value={bslType}
              onChange={(e) => setBSLType(e.target.value)}
              placeholder="Input"
              label="BSL Type"
            />
            {/* Raw material Heat No */}
            <InputField
              id="rawMaterialHeatNo"
              value={rawMaterialHeatNo}
              onChange={(e) => setRawMaterialHeatNo(e.target.value)}
              placeholder="Input"
              label="Raw material Heat No"
            />
            {/* quantity */}
            <InputField
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Input"
              label="Quantity"
            />
          </div>

          {/* Second Column */}
          <div className="flex flex-col items-start">
            {/* Lot No */}
            <InputField
              id="lotNO"
              value={lotNO}
              onChange={(e) => setLotNO(e.target.value)}
              firstInput={true}
              placeholder="Input"
              label="Lot No"
            />
            {/* material */}
            <InputField
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Input"
              label="Material"
            />
            {/* poSrNO */}
            <InputField
              id="poSrNO"
              value={poSrNO}
              onChange={(e) => setPOSrNO(e.target.value)}
              placeholder="Input"
              label="PO Sr. No"
            />
          </div>
        </div>

        <hr className="my-2 border-t border-gray-300" />
        <h1 className="font-bold text-xl">Applicable Standard</h1>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2">
          {/* First Column */}
          <div className="flex flex-col items-start">
            {/* Applicable Standard */}
            <InputField
              id="applicableStandard"
              value={applicableStandard}
              onChange={(e) => setApplicableStandard(e.target.value)}
              firstInput={true}
              placeholder="Input"
              label="Applicable Standard"
            />
            {/* MPI Examination Report */}
            <InputField
              id="mpiExaminationReport"
              value={mpiExaminationReport}
              onChange={(e) => setMPIExaminationReport(e.target.value)}
              placeholder="Input"
              label="MPI Examination Report"
            />
            {/* UT Test Report */}
            <InputField
              id="utTestReport"
              value={utTestReport}
              onChange={(e) => setUTTestReport(e.target.value)}
              placeholder="Input"
              label="UT Test Report"
            />
            {/* Visual Inspection */}
            <InputField
              id="visualInspection"
              value={visualInspection}
              onChange={(e) => setVisualInspection(e.target.value)}
              placeholder="Input"
              label="Visual Inspection"
            />
          </div>

          {/* Second Column */}
          <div className="flex flex-col items-start">
            {/* Marking Monogramme */}
            <InputField
              id="markingMonogramme"
              value={markingMonogramme}
              onChange={(e) => setMarkingMonogramme(e.target.value)}
              firstInput={true}
              placeholder="Input"
              label="Marking Monogramme"
            />
            {/* MTC */}
            <InputField
              id="MTC"
              value={MTC}
              onChange={(e) => setMTC(e.target.value)}
              placeholder="Input"
              label="MTC"
            />
            {/* Heat Treatment */}
            <InputField
              id="heatTreatment"
              value={heatTreatment}
              onChange={(e) => setHeatTreatment(e.target.value)}
              placeholder="Input"
              label="Heat Treatment"
            />
            {/* Coating */}
            <InputField
              id="coating"
              value={coating}
              onChange={(e) => setCoating(e.target.value)}
              placeholder="Input"
              label="Coating"
            />
            {/* Visual and Physical Inspection */}
            <InputField
              id="visualAndPhysicalInspection"
              value={visualAndPhysicalInspection}
              onChange={(e) => setVisualAndPhysicalInspection(e.target.value)}
              placeholder="Input"
              label="Visual and Physical Inspection"
            />
          </div>
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
                  //   onChange={handleImageSelection}
                />
                <button
                  //   onClick={handleChooseImageClick}
                  className="flex items-center px-4 py-2 ml-2 text-black bg-gray-300 rounded"
                >
                  Choose Image
                  <FcGallery className="ml-2" />
                </button>
                <div className="flex flex-wrap ml-4">
                  {/* {selectedImages.map((image, index) => (
                    <div key={index} className="flex items-center mr-4 mb-2">
                      <span className="mr-2">{image.name}</span>
                      <button
                        onClick={() => removeImage(index)}
                        className="flex items-center text-red-600 bg-none p-0"
                      >
                        <IoIosCloseCircleOutline className="text-2xl cursor-pointer" />
                      </button>
                    </div>
                  ))} */}
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

export default InspectionReleaseNoteForm;
