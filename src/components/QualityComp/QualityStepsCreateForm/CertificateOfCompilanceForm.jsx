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

const CertificateOfCompilanceForm = () => {
  const router = useRouter();
  const [cocNo, setCOCNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPONO, setCustomerPONO] = useState("");
  const [soNO, setSONO] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [inspectionReleaseNoteNo, setInspectionReleaseNoteNo] = useState("");

  // Item Info
  const [size, setSize] = useState("");
  const [bslType, setBSLType] = useState("");
  const [rawMaterialHeatNo, setRawMaterialHeatNo] = useState("");
  const [lotNO, setLotNO] = useState("");
  const [material, setMaterial] = useState("");
  const [poSrNO, setPOSrNO] = useState("");
  const [quantity, setQuantity] = useState("");

  const [date, setDate] = useState("");

  const saveFormData = async () => {
    console.log("start save form data for coc quality module");
    try {
      const selectedCustomerPO = JSON.parse(
        localStorage.getItem("selectedPOListItem")
      );

      console.log("selectedCustomerPO in coc", selectedCustomerPO);

      const formData = {
        cocNo,
        customerName,
        customerPONO,
        soNO,
        itemDescription,
        inspectionReleaseNoteNo,
        size,
        bslType,
        rawMaterialHeatNo,
        lotNO,
        material,
        poSrNO,
        quantity,
        poNo: selectedCustomerPO.poNo,
        listItemNo: selectedCustomerPO.POListNo,
        listItemID: selectedCustomerPO._id,
        date: date,
      };

      console.log("formData in coc", formData);

      // Call your API endpoint here with axios
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quality/coc/create-coc-report`,
        formData
      );
      console.log("response in quality module COC treat report", response);
      router.push("/quality/certificate-compliance");
    } catch (error) {}
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
            {/* COC No */}
            <InputField
              id="cocNo"
              value={cocNo}
              onChange={(e) => setCOCNo(e.target.value)}
              firstInput={true}
              placeholder="Input"
              label="COC No"
            />
            {/* Customer PO No */}
            <InputField
              id="customerPONO"
              value={customerPONO}
              onChange={(e) => setCustomerPONO(e.target.value)}
              placeholder="Input"
              label="Customer PO No"
            />
            {/* Item Description */}
            <InputField
              id="itemDescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              placeholder="Input"
              label="Item Description"
            />
          </div>

          {/* Second Column */}
          <div className="flex flex-col items-start">
            {/* Customer name */}
            <InputField
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              firstInput={true}
              placeholder="Input"
              label="Customer name"
            />
            {/* SO No */}
            <InputField
              id="soNO"
              value={soNO}
              onChange={(e) => setSONO(e.target.value)}
              placeholder="Input"
              label="SO No"
            />
            {/* Inspection Release Note No */}
            <InputField
              id="inspectionReleaseNoteNo"
              value={inspectionReleaseNoteNo}
              onChange={(e) => setInspectionReleaseNoteNo(e.target.value)}
              placeholder="Input"
              label="Inspection Release Note No"
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

export default CertificateOfCompilanceForm;
