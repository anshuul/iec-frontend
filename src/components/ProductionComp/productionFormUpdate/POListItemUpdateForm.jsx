"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import ListItemInputs from "../ProductionStepsForms/ListItem/ListItemInputs";
import Container from "@/components/common/Container";
import { getPlanningSheetData } from "@/utils/Planning-Sheet/getPlanningSheetData";

const POListItemUpdateForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const poNo = searchParams.get("poNo");
  const POListNo = searchParams.get("POListNo");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    materialCode: "",
    selectedSurface: "select",
    studItemDescription: "",
    nutItemDescription: "",
    selectedItem: "select",
    studGrade: "",
    nutGrade: "",
    diameter: "",
    diameterDimension: "inch",
    thread: "",
    length: "",
    lengthDimension: "inch",
    cuttingDiameter: "",
    cuttingThread: "",
    cuttingLength: "",
    quantity: "",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchPOListItem = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customerPO/get-listItemByID/${poNo}/${id}`
        );
        const data = response.data.listItem;

        setFormData({
          materialCode: data.materialCode || "",
          selectedSurface: data.selectedSurface || "select",
          studItemDescription: data.studItemDescription || "",
          nutItemDescription: data.nutItemDescription || "",
          selectedItem: data.selectedItem || "select",
          studGrade: data.studGrade || "",
          nutGrade: data.nutGrade || "",
          diameter: data.POsize?.diameter?.value || "",
          diameterDimension: data.POsize?.diameter?.dimension || "inch",
          thread: data.POsize?.thread || "",
          length: data.POsize?.length?.value || "",
          lengthDimension: data.POsize?.length?.dimension || "inch",
          cuttingDiameter: data.Cuttingsize?.cuttingdiameter?.value || "",
          cuttingThread: data.Cuttingsize?.cuttingthread || "",
          cuttingLength: data.Cuttingsize?.cuttinglength?.value || "",
          quantity: data.quantity || "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPOListItem();
  }, [id]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customerPO/UpdateCustomerPOListItem/${poNo}/${POListNo}`,
        formData
      );

      const updatedNewCustomerPo = response.data.updatedListItem;
      console.log("updatedNew In POListItem", updatedNewCustomerPo);

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
      } = await getPlanningSheetData(updatedNewCustomerPo, poNo);

      console.log("getPlanningSheetData in POListItem", {
        planningSheetID,
        selectedItem,
        selectedSurface,
        modifiedQuantity,
        customPoQuantity,
      })

      setSaved(true);
      router.push(`/production/po-list-item`);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="w-full p-8 mx-auto bg-white rounded shadow-md">
        <h1 className="my-4 text-2xl font-bold">Update PO List Item</h1>
        <div className="flex items-center">
          <div className="flex-grow px-2 overflow-x-auto border border-gray-200 rounded-md w-96">

            <ListItemInputs
              materialCode={formData.materialCode}
              setMaterialCode={(value) =>
                setFormData((prev) => ({ ...prev, materialCode: value }))
              }
              selectedSurface={formData.selectedSurface}
              setSelectedSurface={(value) =>
                setFormData((prev) => ({ ...prev, selectedSurface: value }))
              }
              studItemDescription={formData.studItemDescription}
              setStudItemDescription={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  studItemDescription: value,
                }))
              }
              nutItemDescription={formData.nutItemDescription}
              setNutItemDescription={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  nutItemDescription: value,
                }))
              }
              selectedItem={formData.selectedItem}
              setSelectedItem={(value) =>
                setFormData((prev) => ({ ...prev, selectedItem: value }))
              }
              studGrade={formData.studGrade}
              setStudGrade={(value) =>
                setFormData((prev) => ({ ...prev, studGrade: value }))
              }
              nutGrade={formData.nutGrade}
              setNutGrade={(value) =>
                setFormData((prev) => ({ ...prev, nutGrade: value }))
              }
              diameter={formData.diameter}
              setDiameter={(value) =>
                setFormData((prev) => ({ ...prev, diameter: value }))
              }
              diameterDimension={formData.diameterDimension}
              setDiameterDimension={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  diameterDimension: value,
                }))
              }
              thread={formData.thread}
              setThread={(value) =>
                setFormData((prev) => ({ ...prev, thread: value }))
              }
              length={formData.length}
              setLength={(value) =>
                setFormData((prev) => ({ ...prev, length: value }))
              }
              lengthDimension={formData.lengthDimension}
              setLengthDimension={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  lengthDimension: value,
                }))
              }
              cuttingDiameter={formData.cuttingDiameter}
              setCuttingDiameter={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  cuttingDiameter: value,
                }))
              }
              cuttingThread={formData.cuttingThread}
              setCuttingThread={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  cuttingThread: value,
                }))
              }
              cuttingLength={formData.cuttingLength}
              setCuttingLength={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  cuttingLength: value,
                }))
              }
              quantity={formData.quantity}
              setQuantity={(value) =>
                setFormData((prev) => ({ ...prev, quantity: value }))
              }
              getRawMaterialDia={() => { }}
              saveListItem={handleSave}
              saved={saved}
              index={1}
              saveFormData={handleSave}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default POListItemUpdateForm;
