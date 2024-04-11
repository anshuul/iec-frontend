"use client";
import { useEffect, useState } from "react";
import Container from "@/components/common/Container";
import { FiFile, FiSave, FiPrinter, FiArrowLeft } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { RiAttachmentLine } from "react-icons/ri";
import axios from "axios";

const ProductionSheetFormUpdate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  console.log("first", id);

  const [planningSheetForm, setPlanningSheetForm] = useState({
    productionSheetName: "",
    itemDescription: "",
    materialIssue: "",
    requiredResources: "",
    productAndCustomer: "",
    legalAndApplicable: "",
    contingencyPlanning: "",
    verification: "",
    validation: "",
    monitoring: "",
    measurement: "",
    inspection: "",
    management: "",
    recordsEvidence: "",
    planningQuantity: "",
    planningDate: "",
    achievementQuantity: "",
    achievementDate: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/production/get-planningSheetById/${id}`
        );
        const responseData = response.data;
        console.log("responseData", responseData)
        const formattedPlanningDate = new Date(responseData.planningDate)
          .toISOString()
          .split("T")[0];
        const formattedAchievementDate = new Date(responseData.achievementDate)
          .toISOString()
          .split("T")[0];
        console.log("formattedAchievementDate", formattedAchievementDate);

        console.log("responseData.planningQuantity", responseData.planningDate);
        setPlanningSheetForm({
          ...planningSheetForm,
          productionSheetName: responseData.productionSheetName,
          itemDescription: responseData.itemDescription,
          materialIssue: responseData.materialIssue,
          requiredResources: responseData.requiredResources,
          productAndCustomer: responseData.productAndCustomer,
          legalAndApplicable: responseData.legalAndApplicable,
          contingencyPlanning: responseData.contingencyPlanning,
          verification: responseData.verification,
          validation: responseData.validation,
          monitoring: responseData.monitoring,
          measurement: responseData.measurement,
          inspection: responseData.inspection,
          management: responseData.management,
          recordsEvidence: responseData.recordsEvidence,
          planningQuantity: responseData.planningQuantity,
          planningDate: formattedPlanningDate,
          achievementQuantity: responseData.achievementQuantity,
          achievementDate: formattedAchievementDate,
          attachment: responseData.attachment,
          poNo: responseData.poNo,
        }); // Set the customer PO data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData(); // Fetch customer PO data when CustomerPO is available
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
      const response = await axios.put(
        `http://localhost:8000/api/production/update-planningSheet/${id}`,
        planningSheetForm
      );
      console.log("response ", response);
      router.push("/production/production-planning-sheets");
    } catch (error) {
      console.log(error);
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

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2">
          {/* First Column */}
          <div className="flex flex-col items-start">
            <div className="flex items-center my-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  placeholder="Input"
                  value={planningSheetForm.productionSheetName}
                  onChange={(e) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      productionSheetName: e.target.value,
                    })
                  }
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Production Sheet Name
                </span>
              </label>
            </div>
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  placeholder="Input"
                  value={planningSheetForm.itemDescription}
                  onChange={(e) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      itemDescription: e.target.value,
                    })
                  }
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Item Description
                </span>
              </label>
            </div>
            <div className="flex items-center mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  placeholder="Input"
                  value={planningSheetForm.materialIssue}
                  onChange={(e) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      materialIssue: e.target.value,
                    })
                  }
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Material Grade
                </span>
              </label>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  placeholder="Input"
                  value={planningSheetForm.requiredResources}
                  onChange={(e) =>
                    setPlanningSheetForm({
                      ...requiredResources,
                      materialIssue: e.target.value,
                    })
                  }
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Required Resources
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  placeholder="Input"
                  value={planningSheetForm.productAndCustomer}
                  onChange={(e) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      productAndCustomer: e.target.value,
                    })
                  }
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Product and Customer
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  placeholder="Input"
                  value={planningSheetForm.legalAndApplicable}
                  onChange={(e) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      legalAndApplicable: e.target.value,
                    })
                  }
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Legal and Applicable
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  placeholder="Input"
                  value={planningSheetForm.contingencyPlanning}
                  onChange={(e) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      contingencyPlanning: e.target.value,
                    })
                  }
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Contingency Planning
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  placeholder="Input"
                  value={planningSheetForm.verification}
                  onChange={(e) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      verification: e.target.value,
                    })
                  }
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Verification
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
          </div>

          {/* Second Column */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 my-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  value={planningSheetForm.validation}
                  onChange={(e) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      validation: e.target.value,
                    })
                  }
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Validation
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  value={planningSheetForm.monitoring}
                  onChange={(e) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      monitoring: e.target.value,
                    })
                  }
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Monitoring
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  value={planningSheetForm.measurement}
                  onChange={(e) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      measurement: e.target.value,
                    })
                  }
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Measurement
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  value={planningSheetForm.inspection}
                  onChange={(e) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      inspection: e.target.value,
                    })
                  }
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Inspection
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  value={planningSheetForm.management}
                  onChange={(e) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      management: e.target.value,
                    })
                  }
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Management
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="relative cursor-pointer App">
                <input
                  type="text"
                  value={planningSheetForm.recordsEvidence}
                  onChange={(e) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      recordsEvidence: e.target.value,
                    })
                  }
                  placeholder="Input"
                  className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                  Records Need to Provide Evidence
                </span>
              </label>
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() => document.getElementById("attachment").click()}
              >
                <RiAttachmentLine className="text-white" />
              </button>
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
                <FiFile className="ml-2" /> {/* File icon */}
              </button>
              {selectedFile && (
                <span className="ml-2">{selectedFile.name}</span>
              )}
            </div>
            <p className="ml-2 text-sm text-red-600">
              Only PDF files are allowed and only one file can be selected.
            </p>
          </div>
        </div>

        <hr className="my-4 border-t border-gray-300" />

        {/* Second Form */}
        <div className="w-full ">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2">
            {/* First Column */}
            <div className="flex flex-col items-start">
              <h3 className="mb-4 text-[16px] font-semibold">Planning</h3>
              <div className="flex items-center mb-4">
                <label className="relative cursor-pointer App">
                  <input
                    type="text"
                    value={planningSheetForm.planningQuantity}
                    onChange={(e) =>
                      setPlanningSheetForm({
                        ...planningSheetForm,
                        planningQuantity: e.target.value,
                      })
                    }
                    placeholder="Input"
                    className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                  />
                  <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                    Quantity
                  </span>
                </label>
              </div>
              <div className="flex items-center mb-4">
                <label htmlFor="planningDate" className="w-32 mr-2 text-[16px]">
                  Date:
                </label>
                <input
                  type="date"
                  id="planningDate"
                  value={planningSheetForm.planningDate}
                  onChange={(e) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      planningDate: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col items-start">
              <h3 className="mb-4 text-[16px] font-semibold">Achievement</h3>
              <div className="flex items-center mb-4">
                <label className="relative cursor-pointer App">
                  <input
                    type="text"
                    value={planningSheetForm.achievementQuantity}
                    onChange={(e) =>
                      setPlanningSheetForm({
                        ...planningSheetForm,
                        achievementQuantity: e.target.value,
                      })
                    }
                    placeholder="Input"
                    className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                  />
                  <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                    Quantity
                  </span>
                </label>
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="achievementDate"
                  className="w-32 mr-2 text-[16px]"
                >
                  Date:
                </label>
                <input
                  type="date"
                  id="achievementDate"
                  value={planningSheetForm.achievementDate}
                  onChange={(e) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      achievementDate: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4 border-t border-gray-300" />
        <div className="flex justify-end">
          <button
            onClick={saveFormData}
            className="flex items-center px-4 py-2 mr-4 text-black bg-gray-300 rounded">
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

export default ProductionSheetFormUpdate;
