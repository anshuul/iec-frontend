"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiFile, FiPrinter, FiSave } from "react-icons/fi";
import Container from "@/components/common/Container";
import MaterialIssueSlip from "@/components/PDF/MaterialSlip/MaterialIssueSlip";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { IoIosCloseCircleOutline } from "react-icons/io";

const MaterialIssueSlipForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  console.log("first", id);

  const [materialIssueForm, setMaterialIssueForm] = useState({
    materialSlipName: "",
    itemDescription: "",
    materialGrade: "",
    lotNumber: "",
    diameter: { value: "", dimension: "mm" },
    length: { value: "", dimension: "mm" },
    thread: "",
    quantityRequired: "",
    quantityIssued: "",
    studquantity: "",
    nutquantity: "",
    size: "",
    id: "",
    prefix: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const selectedFilePath =
    selectedFile && `http://localhost:8000/${selectedFile.path}`;
  console.log("selectedFilePath", selectedFilePath);

  const handleDownloadSelected = async () => {
    try {
      const response = await fetch(selectedFilePath);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement("a");
      a.href = url;
      a.download = selectedFilePath.split("/").pop(); // Set the file name
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/materialissueslip/get-materialIssueSlipByID/${id}`
        );
        const responseData = response.data;
        console.log("responseData", responseData);

        setMaterialIssueForm((prevState) => ({
          ...prevState, // Spread previous state
          materialSlipName: responseData.materialSlipName,
          itemDescription: responseData.itemDescription,
          materialGrade: responseData.materialGrade,
          lotNumber: responseData.lotNumber,
          diameter: responseData.size.diameter
            ? responseData.size.diameter.value
            : "",
          diameterDimension: responseData.size.diameter
            ? responseData.size.diameter.dimension
            : "",
          thread: responseData.size.thread,
          length: responseData.size.length
            ? responseData.size.length.value
            : "",
          lengthDimension: responseData.size.length
            ? responseData.size.length.dimension
            : "",
          quantityRequired: responseData.quantityRequired,
          quantityIssued: responseData.quantityIssued,
          studquantity: responseData.studquantity,
          nutquantity: responseData.nutquantity,
          size: responseData.size,
          id: responseData._id,
          prefix: responseData.prefix,
        }));
        // Set selected file data if attachment exists
        if (responseData.attachment) {
          setSelectedFile({
            path: responseData.attachment.path,
            fileName: responseData.attachment.fileName,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData(); // Fetch data when id is available
    }
  }, [id]);

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
      const newCustomerPO = JSON.parse(
        localStorage.getItem("selectedCustomerPO")
      );
      console.log("newCustomerPO in material", newCustomerPO);
      const selectedItem = newCustomerPO.selectedItem;
      console.log("selectedItem", selectedItem);

      const formData = new FormData();

      formData.append("poNo", newCustomerPO.poNo);
      formData.append("materialSlipName", materialIssueForm.materialSlipName);
      formData.append("itemDescription", materialIssueForm.itemDescription);
      formData.append("materialGrade", materialIssueForm.materialGrade);
      formData.append("lotNumber", materialIssueForm.lotNumber);
      formData.append("diameterValue", materialIssueForm.diameter.value);
      formData.append(
        "diameterDimension",
        materialIssueForm.diameter.dimension
      );
      formData.append("lengthValue", materialIssueForm.length.value);
      formData.append("lengthDimension", materialIssueForm.length.dimension);
      formData.append("thread", materialIssueForm.thread);
      formData.append("quantityRequired", materialIssueForm.quantityRequired);
      formData.append("quantityIssued", materialIssueForm.quantityIssued);
      formData.append("studquantity", materialIssueForm.studquantity);
      formData.append("nutquantity", materialIssueForm.nutquantity);
      formData.append("size", materialIssueForm.size);
      formData.append("id", materialIssueForm.id);
      formData.append("prefix", materialIssueForm.prefix);

      formData.append("attachmentPoNo", newCustomerPO.poNo);

      // Append the file if selected
      if (selectedFile) {
        formData.append("attachment", selectedFile);
      }

      const response = await axios.put(
        `http://localhost:8000/api/materialissueslip/update-materialIssueSlip/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response in material", response.data);
      const UpdatedMaterialIssueSlipData = response.data;
      console.log("UpdatedMaterialIssueSlipData", UpdatedMaterialIssueSlipData);

      localStorage.setItem(
        "UpdatedMaterialIssueSlipData",
        JSON.stringify(UpdatedMaterialIssueSlipData)
      );

      const LatestMaterialIssueSlipData = JSON.parse(
        localStorage.getItem("UpdatedMaterialIssueSlipData")
      );

      const fetchProductionReportId = await axios.get(
        `http://localhost:8000/api/productionReport/get-generatedProductionReportId/${UpdatedMaterialIssueSlipData.poNo}/${UpdatedMaterialIssueSlipData.prefix}`
      );
      console.log("fetchProductionReportId", fetchProductionReportId.data);
      const productionReportId =
        fetchProductionReportId.data.generatedProductionReportData
          .generatedProductionReportId;
      console.log("productionReportId", productionReportId);

      const nutsCountMatch = selectedItem.match(/\d+nuts/);

      let modifiedQuantity = newCustomerPO.quantity;
      let customPoQuantity = newCustomerPO.quantity;

      if (nutsCountMatch) {
        const nutsCount = parseInt(nutsCountMatch[0].replace("nuts", ""));
        if (!isNaN(nutsCount)) {
          modifiedQuantity *= nutsCount; // Increment quantity based on the number of nuts
        } else {
          throw new Error("Invalid selectedItem format");
        }
      }

      // Update or Create Production Report
      // const productionReportId2 = "66406b92d772d81ea3a03e52";
      const updateProductionReport = await axios.put(
        `http://localhost:8000/api/productionReport/create-updateGenerateProductionReport/${productionReportId}`,
        {
          newCustomerPo: newCustomerPO,
          UpdatedMaterialIssueSlipData: UpdatedMaterialIssueSlipData,
          selectedItem: selectedItem,
          modifiedQuantity: modifiedQuantity,
          customPoQuantity: customPoQuantity,
        }
      );
      console.log("updateProductionReport", updateProductionReport);
      router.push("/production/material-issue-slip");
    } catch (error) {
      console.log(error);
    }
  };
  console.log("materialIssueForm in Form", materialIssueForm);

  const handleCalculate = () => {
    const {
      diameter,
      diameterDimension,
      length,
      lengthDimension,
      studquantity,
      nutquantity,
      materialSlipName,
    } = materialIssueForm;

    // Convert diameter from inches to millimeters if dimension is "inch"
    let diameterInMM = diameter;
    if (diameterDimension === "inch") {
      const parts = diameter.split("/");
      if (parts.length === 2) {
        const numerator = parseFloat(parts[0]);
        const denominator = parseFloat(parts[1]);
        const diameterInInch = numerator / denominator;
        diameterInMM = diameterInInch * 25.4; // Convert inches to millimeters
      }
    }

    // Convert length from inches to millimeters if dimension is "inch"
    let lengthInMM = length;
    if (lengthDimension === "inch") {
      const parts = length.split("/");
      if (parts.length === 2) {
        const numerator = parseFloat(parts[0]);
        const denominator = parseFloat(parts[1]);
        const lengthInInch = numerator / denominator;
        lengthInMM = lengthInInch * 25.4; // Convert inches to millimeters
      }
    }

    let quantityToUse = null;
    if (materialSlipName.startsWith("Nut") && nutquantity) {
      quantityToUse = nutquantity; // Use nutquantity if materialSlipName starts with "Nut"
    } else if (materialSlipName.startsWith("Stud") && studquantity) {
      quantityToUse = studquantity; // Use studquantity if materialSlipName starts with "Stud"
    }

    if (diameterInMM && lengthInMM && quantityToUse) {
      console.log("calculated data", {
        diameterInMM,
        lengthInMM,
        quantityToUse,
      });
      // Perform the calculation
      const calculatedSize =
        (parseFloat(diameterInMM) *
          parseFloat(diameterInMM) *
          parseFloat(lengthInMM)) /
        162000;
      console.log("calculatedSize in material", calculatedSize);
      // Multiply calculatedSize by quantityToUse
      const totalSize = calculatedSize * quantityToUse;
      console.log("totalSize", totalSize);
      // Update the size value in the materialIssueForm state
      setMaterialIssueForm((prevState) => ({
        ...prevState,
        size: totalSize.toFixed(3), // Update the size
        quantityRequired: totalSize.toFixed(3), // Update the Quantity Required in KG
        quantityIssued: totalSize.toFixed(3),
      }));
    } else {
      // If any of the required fields are missing, reset the size to the default quantityRequired
      setMaterialIssueForm((prevState) => ({
        ...prevState,
        size: prevState.quantityRequired, // Reset the size to default quantityRequired
      }));
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setMaterialIssueForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));
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
              id="materialSlipName"
              type="text"
              placeholder="Input"
              value={materialIssueForm.materialSlipName}
              onChange={(e) =>
                setMaterialIssueForm({
                  ...materialIssueForm,
                  materialSlipName: e.target.value,
                })
              }
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Material Slip Name
            </span>
          </label>
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              value={materialIssueForm.itemDescription}
              onChange={(e) =>
                setMaterialIssueForm({
                  ...materialIssueForm,
                  itemDescription: e.target.value,
                })
              }
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Item Description
            </span>
          </label>
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              value={materialIssueForm.materialGrade}
              onChange={(e) =>
                setMaterialIssueForm({
                  ...materialIssueForm,
                  materialGrade: e.target.value,
                })
              }
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Material Grade
            </span>
          </label>
        </div>

        {/* lotNumber */}
        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              value={materialIssueForm.lotNumber}
              onChange={(e) =>
                setMaterialIssueForm({
                  ...materialIssueForm,
                  lotNumber: e.target.value,
                })
              }
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Lot Number
            </span>
          </label>
        </div>

        <div className="flex items-center gap-2 my-4">
          <label htmlFor="size" className="text-[16px] mr-4">
            Size:
          </label>
          {/* Diameter */}
          <label className="relative cursor-pointer App">
            <input
              id="sizeFirstPart"
              type="text"
              value={materialIssueForm.diameter}
              onChange={(e) => handleInputChange(e, "diameter")}
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Diameter
            </span>
          </label>
          {/* <label
            htmlFor="diameterDimension"
            className="relative flex items-center cursor-pointer App"
          >
            <select
              id="diameterDimension"
              value={materialIssueForm.diameterDimension}
              onChange={(e) => handleInputChange(e, "diameterDimension")}
              className="h-10 w-24 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
            >
              <option value="inch">Inch</option>
              <option value="mm">MM</option>
            </select>
          </label> */}

          {/* Pitch */}
          {/* <label className="relative cursor-pointer App">
            <input
              id="thread"
              type="text"
              value={materialIssueForm.thread}
              onChange={(e) => handleInputChange(e, "thread")}
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Pitch
            </span>
          </label> */}
          {/* Length */}
          <label className="relative cursor-pointer App">
            <input
              id="sizeFirstPart"
              type="text"
              value={materialIssueForm.length}
              onChange={(e) => handleInputChange(e, "length")}
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Length
            </span>
          </label>
          {/* <label
            htmlFor="lengthDimension"
            className="relative flex items-center cursor-pointer App"
          >
            <select
              id="lengthDimension"
              value={materialIssueForm.lengthDimension}
              onChange={(e) => handleInputChange(e, "lengthDimension")}
              className="h-10 w-24 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
            >
              <option value="inch">Inch</option>
              <option value="mm">MM</option>
            </select>
          </label> */}

          {/* Calculate button */}
          <button
            onClick={handleCalculate}
            className="flex items-center px-4 py-2 ml-2 text-black bg-gray-300 rounded"
          >
            Calculation
          </button>
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              value={
                typeof materialIssueForm.size === "number"
                  ? materialIssueForm.size.toFixed(3)
                  : materialIssueForm.quantityRequired
              }
              onChange={(e) => handleInputChange(e, "size")}
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Quantity Required in KG
            </span>
          </label>
        </div>

        <div className="flex items-center my-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              value={
                typeof materialIssueForm.size === "number"
                  ? materialIssueForm.size.toFixed(3)
                  : materialIssueForm.quantityIssued
              }
              onChange={(e) => handleInputChange(e, "size")}
              placeholder="Input"
              className="h-10 w-96 xl:w-[800px] px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Quantity Issued in KG
            </span>
          </label>
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
          {/* {selectedFile && <span className="ml-2">{selectedFile.name}</span>} */}
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
          <PDFDownloadLink
            document={<MaterialIssueSlip data={materialIssueForm} />}
            fileName={`MaterialIssueSlip_${id}.pdf`}
            onClick={handleDownloadSelected}
          >
            <button className="flex items-center px-4 py-2 text-black bg-gray-300 rounded">
              Print
              <FiPrinter className="ml-2" />
            </button>
          </PDFDownloadLink>
        </div>
      </div>
    </Container>
  );
};

export default MaterialIssueSlipForm;
