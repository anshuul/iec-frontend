"use client";
import Container from "@/components/common/Container";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiFile, FiPrinter, FiSave } from "react-icons/fi";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPlanningSheetData } from "@/utils/Planning-Sheet/getPlanningSheetData";
import { getMaterialIssueSlipData } from "@/utils/Material-Issue-Slip/getMaterialIssueSlipData";
import { getRoutingSheetData } from "@/utils/Routing-Sheet/getRoutingSheetData";
import { getProductionReportData } from "@/utils/Production-Report/getProductionReportData";

const EditCustomerForm = () => {
  const searchParams = useSearchParams();

  const poNo = searchParams.get("CustomerPO");
  console.log("first", poNo);

  const router = useRouter();
  const [customerPO, setCustomerPO] = useState({
    customerName: "",
    poNo: "",
    materialCode: "",
    studItemDescription: "",
    nutItemDescription: "",
    selectedItem: "",
    selectedSurface: "",
    studGrade: "",
    nutGrade: "",
    POsize: {
      diameter: { value: "", dimension: "" },
      thread: "",
      length: { value: "", dimension: "" },
    },
    Cuttingsize: {
      cuttingdiameter: { value: "" },
      cuttingthread: "",
      cuttinglength: { value: "" },
    },
    quantity: "",
    orderDate: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  console.log("customerPO: ", customerPO);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/customerPO/${poNo}`
        );
        console.log("response", response.data.customerPO);
        setCustomerPO(response.data.customerPO); // Set the customer PO data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (poNo) {
      fetchData(); // Fetch customer PO data when CustomerPO is available
    }
  }, [poNo]);

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

  const saveFormData = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/customerPO/update/${poNo}`,
        customerPO // Send the updated customer PO data
      );
      console.log("response noraml data ", response.data);
      console.log("response cutting data ", response.data.updatedCustomerPO);
      const updatedNewCustomerPo = response.data.updatedCustomerPO;
      console.log("updatedNewCustomerPo", updatedNewCustomerPo);

      let prefix;

      if (
        updatedNewCustomerPo?.selectedItem?.toLowerCase().startsWith("studwith")
      ) {
        prefix = ["Stud", "Nut"];
        console.log("prefixArray:", prefix);
      } else if (updatedNewCustomerPo?.selectedItem === "Stud") {
        prefix = ["Stud"];
        console.log("prefixArray For Stud:", prefix);
      } else if (updatedNewCustomerPo?.selectedItem === "Nut") {
        prefix = ["Nut"];
        console.log("prefixArray For Nut:", prefix);
      } else {
        console.log("selectedItem does not start with 'studwith'");
      }

      const {
        planningSheetID,
        selectedItem,
        selectedSurface,
        modifiedQuantity,
        customPoQuantity,
      } = await getPlanningSheetData(updatedNewCustomerPo);

      const updatePlanningSheetByID = await axios.put(
        `http://localhost:8000/api/production/update-GeneratePlanningSheets/${planningSheetID}`,
        {
          customerPO: updatedNewCustomerPo,
          selectedItem,
          selectedSurface,
          modifiedQuantity,
          customPoQuantity,
        }
      );
      console.log("updatePlanningSheetByID", updatePlanningSheetByID);

      const { MaterialIssueSlipId } = await getMaterialIssueSlipData(
        updatedNewCustomerPo
      );

      const updateMaterailIssueSliptByID = await axios.put(
        `http://localhost:8000/api/materialissueslip/update-GenerateMaterialIssueSlips/${MaterialIssueSlipId}`,
        {
          customerPO: updatedNewCustomerPo,
          selectedItem,
          modifiedQuantity,
          customPoQuantity,
        }
      );
      console.log("updateMaterailIssueSliptByID", updateMaterailIssueSliptByID);

      const { routingingSheetID } = await getRoutingSheetData(
        updatedNewCustomerPo
      );
      console.log("routingingSheetID in Update PO", routingingSheetID);
      const updateRoutingSheetByID = await axios.put(
        `http://localhost:8000/api/routingSheet/update-GeneratedRoutingSheetByIDs/${routingingSheetID}`,
        {
          newCustomerPo: updatedNewCustomerPo,
          selectedItem,
          modifiedQuantity,
          customPoQuantity,
        }
      );
      console.log("updateRoutingSheetByID", updateRoutingSheetByID);

      const { generatedProductionReportId } = await getProductionReportData(
        updatedNewCustomerPo,
        prefix
      );
      console.log(
        "generatedProductionReportId in PO",
        generatedProductionReportId
      );

      const id0 =
        generatedProductionReportId[0].generatedProductionReportData
          .generatedProductionReportId[0];
      const id1 =
        generatedProductionReportId[1].generatedProductionReportData
          .generatedProductionReportId[1];

      console.log("productionReportID at index 0:", id0);
      console.log("productionReportID at index 1:", id1);
      // Extract generatedProductionReportId values and store them in an array
      let productionReportIDs = [id0, id1];
      console.log("productionReportIDs", productionReportIDs);
      // Initialize an empty array to store the production report IDs
      // let productionReportIDs = [];

      // // Iterate over the array of objects
      // generatedProductionReportId.forEach((item) => {
      //   // Extract the generatedProductionReportId value from each object and push it to the productionReportIDs array
      //   productionReportIDs.push(item.generatedProductionReportId);
      // });

      // console.log("Production Report IDs:", productionReportIDs);

      localStorage.setItem("updatedNewCustomerPo", updatedNewCustomerPo);
      router.push("/production");
    } catch (error) {
      console.log(error);
    }
  };

  const getRawMaterialDia = async () => {
    try {
      let adjustedLength;

      const { POsize } = customerPO;

      if (POsize.length.dimension === "mm") {
        // If length dimension is in mm, simply add 5 to the length
        adjustedLength = parseFloat(POsize.length.value) + 5;
      } else if (POsize.length.dimension === "inch") {
        // Handle potential format "X.Y/Z inch"
        const parts = POsize.length.value.split("/");
        if (parts.length === 2) {
          const numerator = parseFloat(parts[0]);
          const denominator = parseFloat(parts[1]);
          const lengthInInch = numerator / denominator;
          adjustedLength = lengthInInch * 25.4 + 5;
        } else {
          // If not in the format "X.Y/Z inch", assume plain inch value
          adjustedLength = parseFloat(POsize.length.value) * 25.4 + 5;
        }
      } else {
        // Raise an error for invalid dimension
        throw new Error("Invalid length dimension. Must be 'mm' or 'inch'.");
      }

      // Set the adjusted length to the cuttingLength state
      setCustomerPO((prevState) => ({
        ...prevState,
        Cuttingsize: {
          ...prevState.Cuttingsize,
          cuttinglength: { value: adjustedLength.toString() },
        },
      }));

      let response;
      if (POsize.diameter.dimension === "mm") {
        response = await axios.get(
          `http://localhost:8000/api/helperRoutes/cuttingRawDataMM`,
          {
            params: {
              diameter: `${POsize.diameter.value}`,
              thread: `${POsize.thread}`,
            },
          }
        );
      } else if (POsize.diameter.dimension === "inch") {
        response = await axios.get(
          `http://localhost:8000/api/helperRoutes/cuttingRawDataInch`,
          {
            params: {
              diameter: `${POsize.diameter.value}`,
              thread: `${POsize.thread}`,
            },
          }
        );
      }

      const matchingObject = response.data.matchingObject;
      if (matchingObject) {
        setCustomerPO((prevState) => ({
          ...prevState,
          Cuttingsize: {
            ...prevState.Cuttingsize,
            cuttingdiameter: {
              value: matchingObject.RAW_MATERIAL_DIA.toString(),
            },
            cuttingthread: { value: matchingObject.PITCH.toString() },
          },
        }));
      } else {
        console.log("No matching object found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOrderDateChange = (date) => {
    setCustomerPO({ ...customerPO, orderDate: date });
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
              value={customerPO.poNo}
              onChange={(e) =>
                setCustomerPO({ ...customerPO, poNo: e.target.value })
              }
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
              value={customerPO.customerName}
              onChange={(e) =>
                setCustomerPO({ ...customerPO, customerName: e.target.value })
              }
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Customer Name
            </span>
          </label>
        </div>

        <div className="flex flex-col items-center gap-2 md:flex-row">
          <label className="relative cursor-pointer App">
            <input
              id="materialCode"
              type="text"
              value={customerPO.materialCode}
              onChange={(e) =>
                setCustomerPO({ ...customerPO, materialCode: e.target.value })
              }
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Material Code
            </span>
          </label>

          <select
            id="selectedSurface"
            value={customerPO.selectedSurface}
            onChange={(e) =>
              setCustomerPO({
                ...customerPO,
                selectedSurface: e.target.value,
              })
            }
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
                value={customerPO.studItemDescription}
                onChange={(e) =>
                  setCustomerPO({
                    ...customerPO,
                    studItemDescription: e.target.value,
                  })
                }
                placeholder="Input"
                className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
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
                value={customerPO.nutItemDescription}
                onChange={(e) =>
                  setCustomerPO({
                    ...customerPO,
                    nutItemDescription: e.target.value,
                  })
                }
                placeholder="Input"
                className="h-10 w-96 xl:w-[400px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
              />
              <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                Nut Description
              </span>
            </label>
            <select
              id="selectedItem"
              value={customerPO.selectedItem}
              onChange={(e) =>
                setCustomerPO({
                  ...customerPO,
                  selectedItem: e.target.value,
                })
              }
              className="h-10 w-44 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
            >
              <option value="inch">stud</option>
              <option value="studwithnuts">stud X 1 Nuts</option>
              <option value="studwith2nuts">stud X 2 Nuts</option>
              <option value="studwith3nuts">stud X 3 Nuts</option>
              <option value="studwith4nuts">stud X 4 Nuts</option>
              <option value="nuts">Nuts</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 my-4 md:flex-row">
          {/* Stud Material Grade */}
          <label className="relative cursor-pointer App">
            <input
              id="studGrade"
              type="text"
              value={customerPO.studGrade}
              onChange={(e) =>
                setCustomerPO({ ...customerPO, studGrade: e.target.value })
              }
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Stud Grade
            </span>
          </label>

          {/* Nut Material Grade */}
          <label className="relative cursor-pointer App">
            <input
              id="nutGrade"
              type="text"
              value={customerPO.nutGrade}
              onChange={(e) =>
                setCustomerPO({ ...customerPO, nutGrade: e.target.value })
              }
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Nut Grade
            </span>
          </label>
        </div>

        {/* PO Size input */}
        <div className="flex flex-col items-start gap-2 my-4 md:items-center md:flex-row">
          <label htmlFor="size" className="text-[16px] mr-4">
            Po Size:
          </label>
          {/* Diameter */}
          <label className="relative cursor-pointer App">
            <input
              id="sizeFirstPart"
              type="text"
              // value={customerPO.size.diameter.value || customerPO.size.diameter}
              value={customerPO.POsize.diameter.value}
              onChange={(e) =>
                setCustomerPO({
                  ...customerPO,
                  POsize: {
                    ...customerPO.POsize,
                    diameter: {
                      ...customerPO.POsize.diameter,
                      value: e.target.value,
                    },
                  },
                })
              }
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
              value={customerPO.POsize.diameter.dimension}
              onChange={(e) =>
                setCustomerPO({
                  ...customerPO,
                  POsize: {
                    ...customerPO.POsize,
                    diameter: {
                      ...customerPO.POsize.diameter,
                      dimension: e.target.value,
                    },
                  },
                })
              }
              className="h-10 w-24 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
            >
              <option value="inch">Inch</option>
              <option value="mm">MM</option>
            </select>
          </label>
          {/* Thread */}
          <label className="relative cursor-pointer App">
            <input
              id="sizeFirstPart"
              type="text"
              value={customerPO.POsize.thread}
              onChange={(e) =>
                setCustomerPO({
                  ...customerPO,
                  POsize: { ...customerPO.POsize, thread: e.target.value },
                })
              }
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Thread
            </span>
          </label>
          {/* Length */}
          <label className="relative cursor-pointer App">
            <input
              id="sizeFirstPart"
              type="text"
              value={customerPO.POsize.length.value}
              onChange={(e) =>
                setCustomerPO({
                  ...customerPO,
                  POsize: {
                    ...customerPO.POsize,
                    length: {
                      ...customerPO.POsize.length,
                      value: e.target.value,
                    },
                  },
                })
              }
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
              value={customerPO.POsize.length.dimension}
              onChange={(e) =>
                setCustomerPO({
                  ...customerPO,
                  POsize: {
                    ...customerPO.POsize,
                    length: {
                      ...customerPO.POsize.length,
                      dimension: e.target.value,
                    },
                  },
                })
              }
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
          {/* Diameter */}
          <label className="relative cursor-pointer App">
            <input
              id="sizeFirstPart"
              type="text"
              // value={customerPO.size.diameter.value || customerPO.size.diameter}
              value={customerPO.Cuttingsize.cuttingdiameter.value}
              onChange={(e) =>
                setCustomerPO({
                  ...customerPO,
                  Cuttingsize: {
                    ...customerPO.Cuttingsize,
                    diameter: {
                      ...customerPO.Cuttingsize.cuttingdiameter,
                      value: e.target.value,
                    },
                  },
                })
              }
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Diameter
            </span>
          </label>

          {/* cuttingthread */}
          <input
            id="cuttingthread"
            type="text"
            value={customerPO.Cuttingsize.cuttingthread.value}
            onChange={(e) =>
              setCustomerPO({
                ...customerPO,
                Cuttingsize: {
                  ...customerPO.Cuttingsize,
                  cuttingthread: {
                    ...customerPO.Cuttingsize.cuttingthread,
                    value: e.target.value,
                  },
                },
              })
            }
            placeholder="Input"
            className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
          />

          {/* Length */}
          <label className="relative cursor-pointer App">
            <input
              id="cuttinglength"
              type="text"
              value={customerPO.Cuttingsize.cuttinglength.value}
              onChange={(e) =>
                setCustomerPO({
                  ...customerPO,
                  Cuttingsize: {
                    ...customerPO.Cuttingsize,
                    length: {
                      ...customerPO.Cuttingsize.cuttinglength,
                      value: e.target.value,
                    },
                  },
                })
              }
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
              type="text"
              placeholder="Input"
              value={customerPO.quantity}
              onChange={(e) =>
                setCustomerPO({ ...customerPO, quantity: e.target.value })
              }
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
            selected={customerPO.orderDate}
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
            accept=".pdf"
            onChange={handleFileSelection}
          />
          <button
            onClick={() => document.getElementById("attachment").click()}
            className="flex items-center px-4 py-2 ml-2 text-black bg-gray-300 rounded"
          >
            Choose file
            <FiFile className="ml-2" />
          </button>
          {selectedFile && <span className="ml-2">{selectedFile.name}</span>}
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

export default EditCustomerForm;
