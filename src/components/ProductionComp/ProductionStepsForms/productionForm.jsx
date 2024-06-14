"use client";
import Container from "@/components/common/Container";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiFile, FiPrinter, FiSave } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";

import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TiMinus, TiPlus } from "react-icons/ti";
import ListItemInputs from "./ListItem/ListItemInputs";

const ProductionForm = () => {
  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  const [poNo, setPoNo] = useState("");
  const [orderDate, setOrderDate] = useState(new Date());
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  // State for managing list items
  const [listItems, setListItems] = useState([
    {
      materialCode: "",
      studItemDescription: "",
      nutItemDescription: "",
      selectedItem: "",
      selectedSurface: "",
      studGrade: "",
      nutGrade: "",
      diameter: "",
      diameterDimension: "mm",
      thread: "",
      length: "",
      lengthDimension: "mm",
      cuttingDiameter: "",
      cuttingthread: "",
      cuttingLength: "",
      quantity: "",
      orderDate: new Date(),
    },
  ]);

  const [savedItems, setSavedItems] = useState(
    Array(listItems.length).fill(false)
  );

  const addNewListItem = () => {
    setListItems([
      ...listItems,
      {
        materialCode: "",
        studItemDescription: "",
        nutItemDescription: "",
        selectedItem: "",
        selectedSurface: "",
        studGrade: "",
        nutGrade: "",
        diameter: "",
        diameterDimension: "mm",
        thread: "",
        length: "",
        lengthDimension: "mm",
        cuttingDiameter: "",
        cuttingthread: "",
        cuttingLength: "",
        quantity: "",
      },
    ]);
  };

  const removeListItem = (index) => {
    if (listItems.length > 1) {
      const updatedListItems = listItems.filter((_, i) => i !== index);
      setListItems(updatedListItems);
    }
  };

  const saveListItem = async (index) => {
    setLoading(true);
    try {
      const listItem = listItems[index];
      const formData = new FormData();
      formData.append("materialCode", listItem.materialCode);
      formData.append("studItemDescription", listItem.studItemDescription);
      formData.append("nutItemDescription", listItem.nutItemDescription);
      formData.append("selectedItem", listItem.selectedItem);
      formData.append("selectedSurface", listItem.selectedSurface);
      formData.append("studGrade", listItem.studGrade);
      formData.append("nutGrade", listItem.nutGrade);
      formData.append("POsize[diameter][value]", listItem.diameter);
      formData.append(
        "POsize[diameter][dimension]",
        listItem.diameterDimension
      );
      formData.append("POsize[thread]", listItem.thread);
      formData.append("POsize[length][value]", listItem.length);
      formData.append("POsize[length][dimension]", listItem.lengthDimension);
      formData.append(
        "Cuttingsize[cuttingdiameter][value]",
        listItem.cuttingDiameter
      );
      formData.append("Cuttingsize[cuttingthread]", listItem.cuttingthread);
      formData.append(
        "Cuttingsize[cuttinglength][value]",
        listItem.cuttingLength
      );
      formData.append("quantity", listItem.quantity);
      formData.append("createdBy", userName);

      if (selectedFile) {
        formData.append("attachment", selectedFile);
      }

      await axios.post(
        `http://localhost:8000/api/customerPO/addListItemToPO/${poNo}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const newSavedItems = [...savedItems];
      newSavedItems[index] = true;
      setSavedItems(newSavedItems);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const userName = localStorage.getItem("userName");

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert("Please select a PDF file.");
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const generateReport = async (e) => {
    e.preventDefault();
    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customerPO/automateReport/${poNo}`
      );
      router.push("/production");
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  const saveFormData = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("poNo", poNo);
      formData.append("customerName", customerName);
      formData.append("orderDate", orderDate.toISOString());
      formData.append("createdBy", userName);

      listItems.forEach((item, index) => {
        formData.append(`listItem[${index}][materialCode]`, item.materialCode);
        formData.append(
          `listItem[${index}][studItemDescription]`,
          item.studItemDescription
        );
        formData.append(
          `listItem[${index}][nutItemDescription]`,
          item.nutItemDescription
        );
        formData.append(`listItem[${index}][selectedItem]`, item.selectedItem);
        formData.append(
          `listItem[${index}][selectedSurface]`,
          item.selectedSurface
        );
        formData.append(`listItem[${index}][studGrade]`, item.studGrade);
        formData.append(`listItem[${index}][nutGrade]`, item.nutGrade);
        formData.append(`listItem[${index}][diameter]`, item.diameter);
        formData.append(
          `listItem[${index}][diameterDimension]`,
          item.diameterDimension
        );
        formData.append(`listItem[${index}][thread]`, item.thread);
        formData.append(`listItem[${index}][length]`, item.length);
        formData.append(
          `listItem[${index}][lengthDimension]`,
          item.lengthDimension
        );
        formData.append(
          `listItem[${index}][cuttingDiameter]`,
          item.cuttingDiameter
        );
        formData.append(
          `listItem[${index}][cuttingthread]`,
          item.cuttingthread
        );
        formData.append(
          `listItem[${index}][cuttingLength]`,
          item.cuttingLength
        );
        formData.append(`listItem[${index}][quantity]`, item.quantity);
        formData.append(
          `listItem[${index}][orderDate]`,
          item.orderDate.toISOString()
        );
      });

      if (selectedFile) {
        formData.append("attachment", selectedFile);
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customerPO/createCustomerPO`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderDateChange = (date, index) => {
    const newListItems = [...listItems];
    newListItems[index].orderDate = date;
    setListItems(newListItems);
  };

  const getRawMaterialDia = async (index) => {
    try {
      const listItem = listItems[index];
      let adjustedLength;

      if (listItem.lengthDimension === "mm") {
        // If length dimension is in mm, simply add 5 to the length
        adjustedLength = parseFloat(listItem.length) + 5;
      } else if (listItem.lengthDimension === "inch") {
        // Handle potential format "X.Y/Z inch"
        const parts = listItem.length.split("/");
        if (parts.length === 2) {
          const numerator = parseFloat(parts[0]);
          const denominator = parseFloat(parts[1]);
          const lengthInInch = numerator / denominator;
          adjustedLength = lengthInInch * 25.4 + 5;
        } else {
          // If not in the format "X.Y/Z inch", assume plain inch value
          adjustedLength = parseFloat(listItem.length) * 25.4 + 5;
        }
      } else {
        // Raise an error for invalid dimension
        throw new ValueError(
          "Invalid length dimension. Must be 'mm' or 'inch'."
        );
      }

      // Set the adjusted length to the cuttingLength state
      const updatedListItems = [...listItems];
      updatedListItems[index].cuttingLength = adjustedLength.toString();
      setListItems(updatedListItems);

      let response;
      if (listItem.diameterDimension === "mm") {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/helperRoutes/cuttingRawDataMM`,
          {
            params: {
              diameter: `${listItem.diameter}`,
              thread: `${listItem.thread}`,
            },
          }
        );
      } else if (listItem.diameterDimension === "inch") {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/helperRoutes/cuttingRawDataInch`,
          {
            params: {
              diameter: `${listItem.diameter}`,
              thread: `${listItem.thread}`,
            },
          }
        );
      }

      const matchingObject = response.data.matchingObject;
      if (matchingObject) {
        const updatedListItems = [...listItems];
        updatedListItems[index].cuttingDiameter =
          matchingObject.RAW_MATERIAL_DIA.toString();
        updatedListItems[index].cuttingthread = matchingObject.PITCH.toString();
        setListItems(updatedListItems);
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

        {/* Add list item button */}
        <button
          onClick={addNewListItem}
          className="flex items-center px-4 py-2 mb-2 text-lg font-bold text-black"
        >
          <TiPlus className="mr-2" />
          Add New List
        </button>

        <div className="space-y-2">
          {listItems.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <button
                  onClick={() => removeListItem(index)}
                  className="flex items-center p-2 text-lg mx-2 font-bold text-red-500 bg-red-200 rounded-full"
                >
                  <TiMinus className="" />
                </button>
              )}
              <div className="overflow-x-auto border w-96 border-gray-200 rounded-md px-2 flex-grow">
                <ListItemInputs
                  materialCode={item.materialCode}
                  setMaterialCode={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].materialCode = value;
                    setListItems(newListItems);
                  }}
                  studItemDescription={item.studItemDescription}
                  setStudItemDescription={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].studItemDescription = value;
                    setListItems(newListItems);
                  }}
                  nutItemDescription={item.nutItemDescription}
                  setNutItemDescription={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].nutItemDescription = value;
                    setListItems(newListItems);
                  }}
                  selectedItem={item.selectedItem}
                  setSelectedItem={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].selectedItem = value;
                    setListItems(newListItems);
                  }}
                  studGrade={item.studGrade}
                  setStudGrade={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].studGrade = value;
                    setListItems(newListItems);
                  }}
                  nutGrade={item.nutGrade}
                  setNutGrade={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].nutGrade = value;
                    setListItems(newListItems);
                  }}
                  selectedSurface={item.selectedSurface}
                  setSelectedSurface={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].selectedSurface = value;
                    setListItems(newListItems);
                  }}
                  diameter={item.diameter}
                  setDiameter={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].diameter = value;
                    setListItems(newListItems);
                  }}
                  diameterDimension={item.diameterDimension}
                  setDiameterDimension={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].diameterDimension = value;
                    setListItems(newListItems);
                  }}
                  thread={item.thread}
                  setThread={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].thread = value;
                    setListItems(newListItems);
                  }}
                  convertedLength={item.convertedLength}
                  setConvertedLength={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].convertedLength = value;
                    setListItems(newListItems);
                  }}
                  length={item.length}
                  setLength={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].length = value;
                    setListItems(newListItems);
                  }}
                  lengthDimension={item.lengthDimension}
                  setLengthDimension={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].lengthDimension = value;
                    setListItems(newListItems);
                  }}
                  cuttingDiameter={item.cuttingDiameter}
                  setCuttingDiameter={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].cuttingDiameter = value;
                    setListItems(newListItems);
                  }}
                  cuttingThread={item.cuttingthread}
                  setCuttingThread={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].cuttingthread = value;
                    setListItems(newListItems);
                  }}
                  cuttingLength={item.cuttingLength}
                  setCuttingLength={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].cuttingLength = value;
                    setListItems(newListItems);
                  }}
                  quantity={item.quantity}
                  setQuantity={(value) => {
                    const newListItems = [...listItems];
                    newListItems[index].quantity = value;
                    setListItems(newListItems);
                  }}
                  saveListItem={() => saveListItem(index)}
                  getRawMaterialDia={() => getRawMaterialDia(index)}
                  orderDate={item.orderDate}
                  handleOrderDateChange={(date) =>
                    handleOrderDateChange(date, index)
                  }
                  saved={savedItems[index]}
                  index={index}
                  saveFormData={saveFormData}
                  loading={loading}
                />
              </div>
            </div>
          ))}
        </div>

        {/* <div className="flex items-center gap-2 my-4">
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

        <div className="flex flex-col flex-wrap items-center gap-4 my-4 md:flex-row">
          
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

        <div className="flex flex-col flex-wrap items-center my-4 md:flex-row">
          
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

        
        <div className="flex flex-col flex-wrap items-start gap-2 my-4 md:items-center md:flex-row">
          <label htmlFor="size" className="text-[16px] mr-4">
            PO Size:
          </label>
          
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
              
              <option value="inch">Inch</option>
              <option value="mm">MM</option>
            </select>
          </label>
          
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

        
        <div className="flex flex-col flex-wrap items-start gap-2 my-4 md:items-center md:flex-row">
          <label htmlFor="size" className="text-[16px] mr-4">
            Cutting Size:
          </label>
          
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
        </p> */}

        <hr className="my-4 border-t border-gray-300" />
        <div className="flex justify-end">
          <button
            onClick={generateReport}
            className={`flex items-center px-4 py-2 mr-4 text-black bg-gray-300 rounded ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
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
