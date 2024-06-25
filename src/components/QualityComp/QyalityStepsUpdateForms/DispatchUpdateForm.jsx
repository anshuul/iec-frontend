"use client";
import axios from "axios";

import Container from "@/components/common/Container";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Icons
import { FiArrowLeft, FiPrinter, FiSave } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FcGallery } from "react-icons/fc";

// Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputField from "@/components/common/InpuField";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DispatchAdvise from "../../PDF/DispatchAdvise/DispatchAdvise";

const DispatchDispatchUpdateForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [daNo, setDANo] = useState("");
  const [soNO, setSONO] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPONO, setCustomerPONO] = useState("");
  const [productionDescription, setProductionDescription] = useState("");
  const [InspectionReleaseNoteNo, setInspectionReleaseNoteNo] = useState("");
  const [customerPartylnspReportNo, setCustomerPartylnspReportNo] =
    useState("");
  const [modeOfDispatch, setModeOfDispatch] = useState("");
  const [typeOfPacking, setTypeOfPacking] = useState("");
  const [bubblesheet, setBubblesheet] = useState("");

  // Check List Prior to Dispatch
  const [visualInspection, setVisualInspection] = useState("");
  const [cleaningDone, setCleaningDone] = useState("");
  const [xyz, setXYZ] = useState("");

  // Item Dispatched
  const [itemDescription, setItemDescription] = useState("");
  const [sNo, setSNo] = useState("");
  const [quantity, setQuantity] = useState("");

  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quality/dispatch/getByID/${id}`
          );
          const responseData = response.data;

          setDANo(responseData.daNo);
          setSONO(responseData.soNO);
          setCustomerName(responseData.customerName);
          setCustomerPONO(responseData.customerPONO);
          setProductionDescription(responseData.productionDescription);
          setInspectionReleaseNoteNo(responseData.InspectionReleaseNoteNo); // Note the capitalization here
          setCustomerPartylnspReportNo(responseData.customerPartylnspReportNo);
          setModeOfDispatch(responseData.modeOfDispatch);
          setTypeOfPacking(responseData.typeOfPacking);
          setBubblesheet(responseData.bubblesheet);

          // Check List Prior to Dispatch
          if (responseData.checkListPriorToDispatch) {
            setVisualInspection(
              responseData.checkListPriorToDispatch.visualInspection
            );
            setCleaningDone(responseData.checkListPriorToDispatch.cleaningDone);
            setXYZ(responseData.checkListPriorToDispatch.xyz);
          }

          // Item Dispatched
          if (responseData.itemDispatched) {
            setItemDescription(responseData.itemDispatched.itemDescription);
            setSNo(responseData.itemDispatched.sNo);
            setQuantity(responseData.itemDispatched.quantity);
          }

          setDate(new Date(responseData.date));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const saveFormData = async () => {
    try {
      const formData = {
        daNo,
        soNO,
        customerName,
        customerPONO,
        productionDescription,
        InspectionReleaseNoteNo,
        customerPartylnspReportNo,
        modeOfDispatch,
        typeOfPacking,
        bubblesheet,
        checkListPriorToDispatch: {
          visualInspection,
          cleaningDone,
          xyz,
        },
        itemDispatched: {
          itemDescription,
          sNo,
          quantity,
        },
        date,
      };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quality/dispatch/update-dispatch-report/${id}`,
        formData
      );

      console.log("Response after updating Dispatch:", response.data);

      // Redirect to another page after successful update
      router.push("/quality/dispatch");
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
            {/* DA No */}
            <InputField
              id="daNo"
              value={daNo}
              onChange={(e) => setDANo(e.target.value)}
              firstInput={true}
              placeholder="Input"
              label="DA No"
            />
            {/* Customer PO No */}
            <InputField
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Input"
              label="Customer Name"
            />
            {/* Production Description */}
            <InputField
              id="productionDescription"
              value={productionDescription}
              onChange={(e) => setProductionDescription(e.target.value)}
              placeholder="Input"
              label="Production Description"
            />
            {/* Customer/3rd Party lnsp. Report No */}
            <InputField
              id="customerPartylnspReportNo"
              value={customerPartylnspReportNo}
              onChange={(e) => setCustomerPartylnspReportNo(e.target.value)}
              placeholder="Input"
              label="Customer/3rd Party lnsp. Report No"
            />
            <InputField
              id="typeOfPacking"
              value={typeOfPacking}
              onChange={(e) => setTypeOfPacking(e.target.value)}
              placeholder="Input"
              label="Type of Packing"
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
            {/* Inspection Release Note No */}
            <InputField
              id="InspectionReleaseNoteNo"
              value={InspectionReleaseNoteNo}
              onChange={(e) => setInspectionReleaseNoteNo(e.target.value)}
              placeholder="Input"
              label="Inspection Release Note No"
            />
            {/* Mode of Dispatch */}
            <InputField
              id="modeOfDispatch"
              value={modeOfDispatch}
              onChange={(e) => setModeOfDispatch(e.target.value)}
              placeholder="Input"
              label="Mode of Dispatch"
            />
            {/* All items Wrapped with Bubble sheet */}
            <InputField
              id="bubblesheet"
              value={bubblesheet}
              onChange={(e) => setBubblesheet(e.target.value)}
              placeholder="Input"
              label="All items Wrapped with Bubble sheet"
            />
          </div>
        </div>

        <hr className="my-2 border-t border-gray-300" />
        <h1 className="font-bold text-xl">Check List Prior to Dispatch</h1>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2">
          {/* First Column */}
          <div className="flex flex-col items-start">
            {/* Visual Inspection */}
            <InputField
              id="visualInspection"
              value={visualInspection}
              onChange={(e) => setVisualInspection(e.target.value)}
              firstInput={true}
              placeholder="Input"
              label="Visual Inspection"
            />
            {/* Cleaning Done */}
            <InputField
              id="cleaningDone"
              value={cleaningDone}
              onChange={(e) => setCleaningDone(e.target.value)}
              placeholder="Input"
              label="Cleaning Done"
            />
          </div>

          {/* Second Column */}
          <div className="flex flex-col items-start">
            {/* Lot No */}
            <InputField
              id="xyz"
              value={xyz}
              onChange={(e) => setXYZ(e.target.value)}
              firstInput={true}
              placeholder="Input"
              label="Lot No"
            />
            {/* material */}
            <InputField
              id="xyz"
              value={xyz}
              onChange={(e) => setXYZ(e.target.value)}
              placeholder="Input"
              label="Material"
            />
          </div>
        </div>

        <hr className="my-2 border-t border-gray-300" />
        <h1 className="font-bold text-xl">Item Dispatched</h1>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2">
          {/* First Column */}
          <div className="flex flex-col items-start">
            {/* Item Description */}
            <InputField
              id="itemDescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              placeholder="Input"
              firstInput={true}
              label="Item Description"
            />
            {/* S / NO */}
            <InputField
              id="sNo"
              value={sNo}
              onChange={(e) => setSNo(e.target.value)}
              placeholder="Input"
              label="S/No"
            />
            {/* Quantity */}
            <InputField
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Input"
              label="Quantity"
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
                  Choose file
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
            <PDFDownloadLink
              document={
                <DispatchAdvise
                  data={{
                    daNo,
                    soNO,
                    customerName,
                    customerPONO,
                    productionDescription,
                    InspectionReleaseNoteNo,
                    customerPartylnspReportNo,
                    modeOfDispatch,
                    typeOfPacking,
                    bubblesheet,
                    checkListPriorToDispatch: {
                      visualInspection,
                      cleaningDone,
                      xyz,
                    },
                    itemDispatched: {
                      itemDescription,
                      sNo,
                      quantity,
                    },
                    date,
                  }}
                />
              }
              fileName={`DispatchAdvise_${id}.pdf`}
            >
              <button className="flex items-center px-4 py-2 text-black bg-gray-300 rounded">
                Print
                <FiPrinter className="ml-2" />
              </button>
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DispatchDispatchUpdateForm;
