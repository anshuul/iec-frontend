"use client";
import Container from "@/components/common/Container";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import ListItemInputs from "./ListItemInputs";
import axios from "axios";

const CreateListItemForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const poNo = searchParams.get("poNo");

  // Loading State
  const [loading, setLoading] = useState(false);

  // List Item Form State
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
      cuttingThread: "",
      cuttingLength: "",
      quantity: "",
      orderDate: new Date(),
    },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

  const userName = localStorage.getItem("userName");

  const handleGoBack = () => {
    router.back();
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
        throw new Error("Invalid length dimension. Must be 'mm' or 'inch'.");
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
        updatedListItems[index].cuttingThread = matchingObject.PITCH.toString();
        setListItems(updatedListItems);
      } else {
        console.log("No matching object found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const saveFormData = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      const listItem = listItems[0];

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
      formData.append("Cuttingsize[cuttingthread]", listItem.cuttingThread);
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customerPO/addListItemToPO/${poNo}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

        <div className="flex items-center">
          <div className="flex-grow px-2 overflow-x-auto border border-gray-200 rounded-md w-96">
            <ListItemInputs
              materialCode={listItems[0].materialCode}
              setMaterialCode={(value) =>
                setListItems((prev) => [{ ...prev[0], materialCode: value }])
              }
              selectedSurface={listItems[0].selectedSurface}
              setSelectedSurface={(value) =>
                setListItems((prev) => [{ ...prev[0], selectedSurface: value }])
              }
              studItemDescription={listItems[0].studItemDescription}
              setStudItemDescription={(value) =>
                setListItems((prev) => [
                  { ...prev[0], studItemDescription: value },
                ])
              }
              nutItemDescription={listItems[0].nutItemDescription}
              setNutItemDescription={(value) =>
                setListItems((prev) => [
                  { ...prev[0], nutItemDescription: value },
                ])
              }
              selectedItem={listItems[0].selectedItem}
              setSelectedItem={(value) =>
                setListItems((prev) => [{ ...prev[0], selectedItem: value }])
              }
              studGrade={listItems[0].studGrade}
              setStudGrade={(value) =>
                setListItems((prev) => [{ ...prev[0], studGrade: value }])
              }
              nutGrade={listItems[0].nutGrade}
              setNutGrade={(value) =>
                setListItems((prev) => [{ ...prev[0], nutGrade: value }])
              }
              diameter={listItems[0].diameter}
              setDiameter={(value) =>
                setListItems((prev) => [{ ...prev[0], diameter: value }])
              }
              diameterDimension={listItems[0].diameterDimension}
              setDiameterDimension={(value) =>
                setListItems((prev) => [
                  { ...prev[0], diameterDimension: value },
                ])
              }
              thread={listItems[0].thread}
              setThread={(value) =>
                setListItems((prev) => [{ ...prev[0], thread: value }])
              }
              length={listItems[0].length}
              setLength={(value) =>
                setListItems((prev) => [{ ...prev[0], length: value }])
              }
              lengthDimension={listItems[0].lengthDimension}
              setLengthDimension={(value) =>
                setListItems((prev) => [{ ...prev[0], lengthDimension: value }])
              }
              cuttingDiameter={listItems[0].cuttingDiameter}
              setCuttingDiameter={(value) =>
                setListItems((prev) => [{ ...prev[0], cuttingDiameter: value }])
              }
              cuttingThread={listItems[0].cuttingThread}
              setCuttingThread={(value) =>
                setListItems((prev) => [{ ...prev[0], cuttingThread: value }])
              }
              cuttingLength={listItems[0].cuttingLength}
              setCuttingLength={(value) =>
                setListItems((prev) => [{ ...prev[0], cuttingLength: value }])
              }
              quantity={listItems[0].quantity}
              setQuantity={(value) =>
                setListItems((prev) => [{ ...prev[0], quantity: value }])
              }
              getRawMaterialDia={() => getRawMaterialDia(0)}
              index={0}
              saveFormData={saveFormData}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateListItemForm;
