"use client";
import Container from "@/components/common/Container";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiFile, FiPrinter, FiSave } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";

import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProductionForm = () => {
  const searchParams = useSearchParams();

  const CustomerPO = searchParams.get("CustomerPO");
  console.log("first", CustomerPO);

  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  // const [createdBy, setCreatedBy] = useState("");
  const [poNo, setPoNo] = useState("");
  const [materialCode, setMaterialCode] = useState("");
  const [studItemDescription, setStudItemDescription] = useState("");
  const [nutItemDescription, setNutItemDescription] = useState("");

  const [selectedItem, setSelectedItem] = useState("");
  const [selectedSurface, setSelectedSurface] = useState("");

  const [studGrade, setStudGrade] = useState("");
  const [nutGrade, setNutGrade] = useState("");

  const [diameter, setDiameter] = useState("");
  const [cuttingDiameter, setCuttingDiameter] = useState("");
  const [diameterDimension, setDiameterDimension] = useState("mm");
  const [thread, setThread] = useState("");
  const [cuttingthread, setCuttingThread] = useState("");
  const [length, setLength] = useState("");
  const [cuttingLength, setCuttingLength] = useState("");
  const [lengthDimension, setLengthDimension] = useState("mm");
  const [quantity, setQuantity] = useState("");
  const [orderDate, setOrderDate] = useState(new Date());
  const [selectedFile, setSelectedFile] = useState(null);

  const userName = localStorage.getItem("userName");

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/customerPO/${CustomerPO}`
          );
          setRowData(response);
          // router.push("/production");
          console.log("response", response);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
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

  const saveFormData = async () => {
    try {
      const formData = new FormData();
      formData.append("customerName", customerName);
      formData.append("poNo", poNo);
      formData.append("materialCode", materialCode);
      formData.append("studItemDescription", studItemDescription);
      formData.append("nutItemDescription", nutItemDescription);
      formData.append("selectedItem", selectedItem);
      formData.append("selectedSurface", selectedSurface);
      formData.append("studGrade", studGrade);
      formData.append("nutGrade", nutGrade);
      formData.append("POsize[diameter][value]", diameter);
      formData.append("POsize[diameter][dimension]", diameterDimension);
      formData.append("POsize[thread]", thread);
      formData.append("POsize[length][value]", length);
      formData.append("POsize[length][dimension]", lengthDimension);
      formData.append("Cuttingsize[cuttingdiameter][value]", cuttingDiameter);
      formData.append("Cuttingsize[cuttingthread]", cuttingthread);
      formData.append("Cuttingsize[cuttinglength][value]", cuttingLength);
      formData.append("quantity", quantity);
      formData.append("orderDate", orderDate);
      formData.append("createdBy", userName);

      // Append poNo to the formData
      formData.append("attachmentPoNo", poNo);
      if (selectedFile) {
        formData.append("attachment", selectedFile);
      }

      const response = await axios.post(
        "http://localhost:8000/api/customerPO/createCustomerPO",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart form data
          },
        }
      );
      console.log("response ", response);
      router.push("/production");
    } catch (error) {
      console.log(error);
    }
  };

  // const saveFormData = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/customerPO/createCustomerPO",
  //       {
  //         customerName,
  //         poNo,
  //         materialCode,
  //         studItemDescription,
  //         nutItemDescription,
  //         selectedItem,
  //         selectedSurface,
  //         studGrade,
  //         nutGrade,
  //         POsize: {
  //           diameter: {
  //             value: diameter,
  //             dimension: diameterDimension,
  //           },
  //           thread,
  //           length: {
  //             value: length,
  //             dimension: lengthDimension,
  //           },
  //         },

  //         Cuttingsize: {
  //           cuttingdiameter: {
  //             value: cuttingDiameter,
  //           },
  //           cuttingthread,
  //           cuttinglength: {
  //             value: cuttingLength,
  //           },
  //         },
  //         quantity,
  //         orderDate,
  //       }
  //     );
  //     console.log("response ", response);
  //     router.push("/production");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleOrderDateChange = (date) => {
    setOrderDate(date);
  };

  // Function to convert inches to millimeters
  const inchToMm = (inches) => {
    const mmPerInch = 25.4;
    return inches * mmPerInch;
  };

  const getRawMaterialDia = async () => {
    try {
      let adjustedLength;

      if (lengthDimension === "mm") {
        // If length dimension is in mm, simply add 5 to the length
        adjustedLength = parseFloat(length) + 5;
      } else if (lengthDimension === "inch") {
        // Handle potential format "X.Y/Z inch"
        const parts = length.split("/");
        if (parts.length === 2) {
          const numerator = parseFloat(parts[0]);
          console.log("numerator", numerator);
          const denominator = parseFloat(parts[1]);
          console.log("denominator", denominator);
          const lengthInInch = numerator / denominator;
          console.log("lengthInInch", lengthInInch);
          adjustedLength = lengthInInch * 25.4 + 5;
          console.log("adjustedLength", adjustedLength);
        } else {
          // If not in the format "X.Y/Z inch", assume plain inch value
          adjustedLength = parseFloat(length) * 25.4 + 5;
        }
      } else {
        // Raise an error for invalid dimension
        throw new ValueError(
          "Invalid length dimension. Must be 'mm' or 'inch'."
        );
      }

      // Set the adjusted length to the cuttingLength state
      setCuttingLength(adjustedLength.toString());

      let response;
      if (diameterDimension === "mm") {
        response = await axios.get(
          `http://localhost:8000/api/helperRoutes/cuttingRawDataMM`,
          {
            params: {
              diameter: `${diameter}`,
              thread: `${thread}`,
            },
          }
        );
      } else if (diameterDimension === "inch") {
        response = await axios.get(
          `http://localhost:8000/api/helperRoutes/cuttingRawDataInch`,
          {
            params: {
              diameter: `${diameter}`,
              thread: `${thread}`,
            },
          }
        );
      }

      const matchingObject = response.data.matchingObject;
      if (matchingObject) {
        setCuttingDiameter(matchingObject.RAW_MATERIAL_DIA.toString());
        setCuttingThread(matchingObject.PITCH.toString());
      } else {
        console.log("No matching object found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              id="poNo"
              type="text"
              value={poNo}
              onChange={(e) => setPoNo(e.target.value)}
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              PO No
            </span>
          </label>
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              id="ProductionName"
              type="text"
              placeholder="Input"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Customer Name
            </span>
          </label>
        </div>

        <div className="flex items-center gap-2 my-4">
          <label className="relative cursor-pointer App">
            <input
              id="materialCode"
              type="text"
              value={materialCode}
              onChange={(e) => setMaterialCode(e.target.value)}
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Material Code
            </span>
          </label>
          <select
            id="selectedSurface"
            value={selectedSurface}
            onChange={(e) => setSelectedSurface(e.target.value)}
            className="h-10 w-44 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
          >
            <option value="select">Surface Finish</option>
            <option value="PhosphatingBlack">Phosphating(Black)</option>
            <option value="ZincPlating">Zinc Plating</option>
            <option value="HDG">HotDip Galvanizing(HDG)</option>
            <option value="PTFE">PTFE</option>
          </select>
        </div>

        <div className="flex flex-col items-center gap-4 my-4 md:flex-row">
          {/* Stud Item Description */}
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <label className="relative cursor-pointer App">
              <input
                id="studItemDescription"
                type="text"
                value={studItemDescription}
                onChange={(e) => setStudItemDescription(e.target.value)}
                placeholder="Input"
                className="h-10 w-96 xl:w-[400px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
              />
              <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                Stud Description
              </span>
            </label>
          </div>

          {/* Nut Item Description */}
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <label className="relative cursor-pointer App">
              <input
                id="nutItemDescription2"
                type="text"
                value={nutItemDescription}
                onChange={(e) => setNutItemDescription(e.target.value)}
                placeholder="Input"
                className="h-10 w-96 xl:w-[400px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
              />
              <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                Nut Description
              </span>
            </label>
            <select
              id="selectedItem"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="h-10 w-44 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
            >
              <option value="select">--select--</option>
              <option value="stud">Stud</option>
              <option value="studwith1nuts">stud X 1 Nuts</option>
              <option value="studwith2nuts">stud X 2 Nuts</option>
              <option value="studwith3nuts">stud X 3 Nuts</option>
              <option value="studwith4nuts">stud X 4 Nuts</option>
              <option value="nut">Nut</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col items-center my-4 md:flex-row">
          {/* Stud Material Grade */}
          <label className="relative mb-4 cursor-pointer App md:mr-4 md:mb-0">
            <input
              id="StudGrade"
              type="text"
              value={studGrade}
              onChange={(e) => setStudGrade(e.target.value)}
              placeholder="Input"
              className="h-10 w-48 xl:w-[400px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Stud Grade
            </span>
          </label>

          {/* Nut Material Grade */}
          <label className="relative cursor-pointer">
            <input
              id="itemGrade2"
              type="text"
              value={nutGrade}
              onChange={(e) => setNutGrade(e.target.value)}
              placeholder="Input"
              className="h-10 w-48 xl:w-[400px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Nut Grade
            </span>
          </label>
        </div>

        {/* PO Size input */}
        <div className="flex flex-col items-start gap-2 my-4 md:items-center md:flex-row">
          <label htmlFor="size" className="text-[16px] mr-4">
            PO Size:
          </label>
          {/* Diameter with dimension */}
          <label className="relative cursor-pointer App">
            <input
              id="sizeFirstPart"
              type="text"
              value={diameter}
              onChange={(e) => setDiameter(e.target.value)}
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Diameter
            </span>
          </label>
          {/* Diameter dimension */}
          <label
            htmlFor="dimension"
            className="relative flex items-center cursor-pointer App"
          >
            <select
              id="diameterUnit"
              value={diameterDimension}
              onChange={(e) => setDiameterDimension(e.target.value)}
              className="h-10 w-24 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
            >
              {/* <option value="">-select-</option> */}
              <option value="inch">Inch</option>
              <option value="mm">MM</option>
            </select>
          </label>
          {/* Pitch */}
          <label className="relative cursor-pointer App">
            <input
              id="thread"
              type="text"
              value={thread}
              onChange={(e) => setThread(e.target.value)}
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Pitch
            </span>
          </label>
          {/* Length */}
          <label className="relative cursor-pointer App">
            <input
              id="sizeFirstPart"
              type="text"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Length
            </span>
          </label>
          {/* Length dimension */}
          <label
            htmlFor="dimension"
            className="relative flex items-center cursor-pointer App"
          >
            <select
              id="lengthUnit"
              value={lengthDimension}
              onChange={(e) => setLengthDimension(e.target.value)}
              className="h-10 w-24 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
            >
              <option value="inch">Inch</option>
              <option value="mm">MM</option>
            </select>
          </label>
        </div>

        <button
          onClick={getRawMaterialDia}
          className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Get Cutting Size
        </button>

        {/* Cutting Size input */}
        <div className="flex flex-col items-start gap-2 my-4 md:items-center md:flex-row">
          <label htmlFor="size" className="text-[16px] mr-4">
            Cutting Size:
          </label>
          {/* Diameter with dimension */}
          <label className="relative cursor-pointer App">
            <input
              id="sizeFirstPart"
              type="text"
              value={cuttingDiameter}
              onChange={(e) => setCuttingDiameter(e.target.value)}
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Diameter
            </span>
          </label>

          {/* Pitch */}
          <label className="relative cursor-pointer App">
            <input
              id="thread"
              type="text"
              value={cuttingthread}
              onChange={(e) => setCuttingThread(e.target.value)}
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Pitch
            </span>
          </label>
          {/* Length */}
          <label className="relative cursor-pointer App">
            <input
              id="sizeFirstPart"
              type="text"
              value={cuttingLength}
              onChange={(e) => setCuttingLength(e.target.value)}
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Length
            </span>
          </label>
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="text"
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Quantity
            </span>
          </label>
        </div>

        {/* Order Date */}
        <div className="flex items-center mb-4">
          <label htmlFor="deliveryDate" className="w-auto mr-2 text-[16px]">
            Order Date:
          </label>

          <DatePicker
            selected={orderDate}
            onChange={handleOrderDateChange}
            dateFormat="dd/MM/yyyy"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="attachment" className="text-[16px]">
            Attachment
          </label>
          <input
            type="file"
            id="attachment"
            className="hidden"
            name="attachment"
            accept="application/pdf"
            onChange={handleFileSelection}
          />
          <button
            onClick={() => document.getElementById("attachment").click()}
            className="flex items-center px-4 py-2 ml-2 text-black bg-gray-300 rounded"
          >
            Choose file
            <FiFile className="ml-2" />
          </button>
          {/* {selectedFile && <span className="ml-2">{selectedFile.name}</span>} */}
          {selectedFile && (
            <>
              <span className="ml-2">{selectedFile.name}</span>
              <button
                onClick={() => setSelectedFile(null)}
                className="flex items-center text-red-600 bg-none"
              >
                <IoIosCloseCircleOutline className="ml-2 text-2xl" />
              </button>
            </>
          )}
        </div>
        <p className="ml-2 text-sm text-red-600">
          Only PDF files are allowed and only one file can be selected.
        </p>

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

export default ProductionForm;
