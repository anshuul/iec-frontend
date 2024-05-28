"use client";
import { useEffect, useState } from "react";
import Container from "@/components/common/Container";
import { FiFile, FiSave, FiPrinter, FiArrowLeft } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { RiAttachmentLine } from "react-icons/ri";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProductionPlanning from "@/components/PDF/ProductionPlanning/ProductionPlanning";
import { IoIosCloseCircleOutline } from "react-icons/io";
import DownloadAllPdf from "./DownloadAllPdf";

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
    deliveryDate: "",
    orderDate: "",
  });

  const [attachments, setAttachments] = useState({
    resourcesAttachment: null,
    productAndCustomerAttachment: null,
    legalAndApplicableAttachment: null,
    contingencyPlanningAttachment: null,
    verificationAttachment: null,
    validationAttachment: null,
    monitoringAttachment: null,
    measurementAttachment: null,
    inspectionAttachment: null,
    managementAttachment: null,
    recordsEvidenceAttachment: null,
  });

  const [selectedFile, setSelectedFile] = useState(null);

  // Function to format date in ISO format (yyyy-mm-dd)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
    // return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/production/get-planningSheetById/${id}`
        );
        const responseData = response.data;
        console.log("responseData", responseData);
        const formattedPlanningDate = formatDate(responseData.planningDate);
        console.log("formattedPlanningDate", formattedPlanningDate);
        const formattedAchievementDate = formatDate(
          responseData.achievementDate
        );
        console.log("formattedAchievementDate", formattedAchievementDate);
        const formattedDeliveryDate = formatDate(responseData.deliveryDate);
        console.log("formattedDeliveryDate", formattedDeliveryDate);
        const formattedOrderDate = formatDate(responseData.orderDate);
        console.log("formattedOrderDate", formattedOrderDate);

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
          deliveryDate: formattedDeliveryDate,
          orderDate: formattedOrderDate,
          attachment: responseData.attachment,
          poNo: responseData.poNo,
        }); // Set the customer PO data in state

        // Set attachments
        setAttachments({
          resourcesAttachment: responseData.resourcesAttachment,
          productAndCustomerAttachment:
            responseData.productAndCustomerAttachment,
          legalAndApplicableAttachment:
            responseData.legalAndApplicableAttachment,
          contingencyPlanningAttachment:
            responseData.contingencyPlanningAttachment,
          verificationAttachment: responseData.verificationAttachment,
          validationAttachment: responseData.validationAttachment,
          monitoringAttachment: responseData.monitoringAttachment,
          measurementAttachment: responseData.measurementAttachment,
          inspectionAttachment: responseData.inspectionAttachment,
          managementAttachment: responseData.managementAttachment,
          recordsEvidenceAttachment: responseData.recordsEvidenceAttachment,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData(); // Fetch customer PO data when CustomerPO is available
    }
  }, [id]);

  const handleFileSelection = (name, file) => {
    if (file && file.type === "application/pdf") {
      setAttachments((prevAttachments) => ({
        ...prevAttachments,
        [name]: file,
      }));
    } else {
      alert("Please select a PDF file.");
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const saveFormData = async () => {
    const formData = new FormData();
    Object.keys(planningSheetForm).forEach((key) => {
      formData.append(key, planningSheetForm[key]);
    });
    // Append the attachmentPoNo to the formData
    formData.append("attachmentPoNo", planningSheetForm.poNo);
    Object.keys(attachments).forEach((key) => {
      if (attachments[key]) {
        formData.append(key, attachments[key]);
      }
    });
    try {
      const response = await axios.put(
        `http://localhost:8000/api/production/update-planningSheet/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response ", response);
      router.push("/production/production-planning-sheets");
    } catch (error) {
      console.log(error);
    }
  };

  const printFormData = () => {
    console.log("Print", planningSheetForm);
  };

  console.log("attachments in planning sheet", attachments);

  const attachmentPaths = Object.values(attachments).map(
    (attachment) => `http://localhost:8000/${attachment?.path}`
  );
  console.log("attachmentPaths in planning sheet", attachmentPaths);

  const handleDownloadAll = async () => {
    try {
      for (const path of attachmentPaths) {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = path.split("/").pop(); // Set the file name
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
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
              <input
                type="file"
                id="resourcesAttachment"
                className="hidden"
                name="resourcesAttachment"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileSelection("resourcesAttachment", e.target.files[0])
                }
              />
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() =>
                  document.getElementById("resourcesAttachment").click()
                }
              >
                <RiAttachmentLine className="text-white" />
              </button>
              {attachments.resourcesAttachment && (
                <>
                  <span className="ml-2">
                    {attachments.resourcesAttachment.name ||
                      attachments.resourcesAttachment.fileName}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachments((prevAttachments) => ({
                        ...prevAttachments,
                        resourcesAttachment: null,
                      }))
                    }
                    className="flex items-center text-red-600 bg-none"
                  >
                    <IoIosCloseCircleOutline className="ml-2 text-2xl" />
                  </button>
                </>
              )}
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
              <input
                type="file"
                id="productAndCustomerAttachment"
                className="hidden"
                name="productAndCustomerAttachment"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileSelection(
                    "productAndCustomerAttachment",
                    e.target.files[0]
                  )
                }
              />
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() =>
                  document
                    .getElementById("productAndCustomerAttachment")
                    .click()
                }
              >
                <RiAttachmentLine className="text-white" />
              </button>
              {attachments.productAndCustomerAttachment && (
                <>
                  <span className="ml-2">
                    {/* {attachments.productAndCustomerAttachment.fileName} */}
                    {/* {attachments.productAndCustomerAttachment.name} */}
                    {attachments.productAndCustomerAttachment.name ||
                      attachments.productAndCustomerAttachment.fileName}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachments((prevAttachments) => ({
                        ...prevAttachments,
                        productAndCustomerAttachment: null,
                      }))
                    }
                    className="flex items-center text-red-600 bg-none"
                  >
                    <IoIosCloseCircleOutline className="ml-2 text-2xl" />
                  </button>
                </>
              )}
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
              <input
                type="file"
                id="legalAndApplicableAttachment"
                className="hidden"
                name="legalAndApplicableAttachment"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileSelection(
                    "legalAndApplicableAttachment",
                    e.target.files[0]
                  )
                }
              />
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() =>
                  document
                    .getElementById("legalAndApplicableAttachment")
                    .click()
                }
              >
                <RiAttachmentLine className="text-white" />
              </button>
              {attachments.legalAndApplicableAttachment && (
                <>
                  <span className="ml-2">
                    {attachments.legalAndApplicableAttachment.name ||
                      attachments.legalAndApplicableAttachment.fileName}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachments((prevAttachments) => ({
                        ...prevAttachments,
                        legalAndApplicableAttachment: null,
                      }))
                    }
                    className="flex items-center text-red-600 bg-none"
                  >
                    <IoIosCloseCircleOutline className="ml-2 text-2xl" />
                  </button>
                </>
              )}
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
              <input
                type="file"
                id="contingencyPlanningAttachment"
                className="hidden"
                name="contingencyPlanningAttachment"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileSelection(
                    "contingencyPlanningAttachment",
                    e.target.files[0]
                  )
                }
              />
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() =>
                  document
                    .getElementById("contingencyPlanningAttachment")
                    .click()
                }
              >
                <RiAttachmentLine className="text-white" />
              </button>
              {attachments.contingencyPlanningAttachment && (
                <>
                  <span className="ml-2">
                    {attachments.contingencyPlanningAttachment.name ||
                      attachments.contingencyPlanningAttachment.fileName}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachments((prevAttachments) => ({
                        ...prevAttachments,
                        contingencyPlanningAttachment: null,
                      }))
                    }
                    className="flex items-center text-red-600 bg-none"
                  >
                    <IoIosCloseCircleOutline className="ml-2 text-2xl" />
                  </button>
                </>
              )}
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
              <input
                type="file"
                id="verificationAttachment"
                className="hidden"
                name="verificationAttachment"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileSelection(
                    "verificationAttachment",
                    e.target.files[0]
                  )
                }
              />
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() =>
                  document.getElementById("verificationAttachment").click()
                }
              >
                <RiAttachmentLine className="text-white" />
              </button>
              {attachments.verificationAttachment && (
                <>
                  <span className="ml-2">
                    {attachments.verificationAttachment.name ||
                      attachments.verificationAttachment.fileName}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachments((prevAttachments) => ({
                        ...prevAttachments,
                        verificationAttachment: null,
                      }))
                    }
                    className="flex items-center text-red-600 bg-none"
                  >
                    <IoIosCloseCircleOutline className="ml-2 text-2xl" />
                  </button>
                </>
              )}
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
              <input
                type="file"
                id="validationAttachment"
                className="hidden"
                name="validationAttachment"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileSelection("validationAttachment", e.target.files[0])
                }
              />
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() =>
                  document.getElementById("validationAttachment").click()
                }
              >
                <RiAttachmentLine className="text-white" />
              </button>
              {attachments.validationAttachment && (
                <>
                  <span className="ml-2">
                    {attachments.validationAttachment.name ||
                      attachments.validationAttachment.fileName}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachments((prevAttachments) => ({
                        ...prevAttachments,
                        validationAttachment: null,
                      }))
                    }
                    className="flex items-center text-red-600 bg-none"
                  >
                    <IoIosCloseCircleOutline className="ml-2 text-2xl" />
                  </button>
                </>
              )}
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
              <input
                type="file"
                id="monitoringAttachment"
                className="hidden"
                name="monitoringAttachment"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileSelection("monitoringAttachment", e.target.files[0])
                }
              />
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() =>
                  document.getElementById("monitoringAttachment").click()
                }
              >
                <RiAttachmentLine className="text-white" />
              </button>
              {attachments.monitoringAttachment && (
                <>
                  <span className="ml-2">
                    {attachments.monitoringAttachment.name ||
                      attachments.monitoringAttachment.fileName}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachments((prevAttachments) => ({
                        ...prevAttachments,
                        monitoringAttachment: null,
                      }))
                    }
                    className="flex items-center text-red-600 bg-none"
                  >
                    <IoIosCloseCircleOutline className="ml-2 text-2xl" />
                  </button>
                </>
              )}
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
              <input
                type="file"
                id="measurementAttachment"
                className="hidden"
                name="measurementAttachment"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileSelection(
                    "measurementAttachment",
                    e.target.files[0]
                  )
                }
              />
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() =>
                  document.getElementById("measurementAttachment").click()
                }
              >
                <RiAttachmentLine className="text-white" />
              </button>
              {attachments.measurementAttachment && (
                <>
                  <span className="ml-2">
                    {attachments.measurementAttachment.name ||
                      attachments.measurementAttachment.fileName}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachments((prevAttachments) => ({
                        ...prevAttachments,
                        measurementAttachment: null,
                      }))
                    }
                    className="flex items-center text-red-600 bg-none"
                  >
                    <IoIosCloseCircleOutline className="ml-2 text-2xl" />
                  </button>
                </>
              )}
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
              <input
                type="file"
                id="inspectionAttachment"
                className="hidden"
                name="inspectionAttachment"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileSelection("inspectionAttachment", e.target.files[0])
                }
              />
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() =>
                  document.getElementById("inspectionAttachment").click()
                }
              >
                <RiAttachmentLine className="text-white" />
              </button>
              {attachments.inspectionAttachment && (
                <>
                  <span className="ml-2">
                    {attachments.inspectionAttachment.name ||
                      attachments.inspectionAttachment.fileName}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachments((prevAttachments) => ({
                        ...prevAttachments,
                        inspectionAttachment: null,
                      }))
                    }
                    className="flex items-center text-red-600 bg-none"
                  >
                    <IoIosCloseCircleOutline className="ml-2 text-2xl" />
                  </button>
                </>
              )}
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
              <input
                type="file"
                id="managementAttachment"
                className="hidden"
                name="managementAttachment"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileSelection("managementAttachment", e.target.files[0])
                }
              />
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() =>
                  document.getElementById("managementAttachment").click()
                }
              >
                <RiAttachmentLine className="text-white" />
              </button>
              {attachments.managementAttachment && (
                <>
                  <span className="ml-2">
                    {attachments.managementAttachment.name ||
                      attachments.managementAttachment.fileName}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachments((prevAttachments) => ({
                        ...prevAttachments,
                        managementAttachment: null,
                      }))
                    }
                    className="flex items-center text-red-600 bg-none"
                  >
                    <IoIosCloseCircleOutline className="ml-2 text-2xl" />
                  </button>
                </>
              )}
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
              <input
                type="file"
                id="recordsEvidenceAttachment"
                className="hidden"
                name="recordsEvidenceAttachment"
                accept="application/pdf"
                onChange={(e) =>
                  handleFileSelection(
                    "recordsEvidenceAttachment",
                    e.target.files[0]
                  )
                }
              />
              <button
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-lg"
                onClick={() =>
                  document.getElementById("recordsEvidenceAttachment").click()
                }
              >
                <RiAttachmentLine className="text-white" />
              </button>
              {attachments.recordsEvidenceAttachment && (
                <>
                  <span className="ml-2">
                    {attachments.recordsEvidenceAttachment.name ||
                      attachments.recordsEvidenceAttachment.fileName}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachments((prevAttachments) => ({
                        ...prevAttachments,
                        recordsEvidenceAttachment: null,
                      }))
                    }
                    className="flex items-center text-red-600 bg-none"
                  >
                    <IoIosCloseCircleOutline className="ml-2 text-2xl" />
                  </button>
                </>
              )}
            </div>
            {/* <div className="flex items-center">
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
              {selectedFile && (
                <span className="ml-2">{selectedFile.name}</span>
              )}
            </div>
            <p className="ml-2 text-sm text-red-600">
              Only PDF files are allowed and only one file can be selected.
            </p> */}
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
                <DatePicker
                  selected={planningSheetForm.planningDate}
                  onChange={(date) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      planningDate: date,
                    })
                  }
                  dateFormat="dd/MM/yyyy"
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
                <DatePicker
                  selected={planningSheetForm.achievementDate}
                  onChange={(date) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      achievementDate: date,
                    })
                  }
                  dateFormat="dd/MM/yyyy"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4 border-t border-gray-300" />

        <div className="w-full ">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2">
            {/* First Column */}
            <div className="flex flex-col items-start">
              <h3 className="mb-4 text-[16px] font-semibold">Order Date</h3>
              <div className="flex items-center mb-4">
                <label htmlFor="orderDate" className="w-32 mr-2 text-[16px]">
                  Order Date:
                </label>
                <DatePicker
                  selected={planningSheetForm.orderDate}
                  onChange={(date) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      orderDate: date,
                    })
                  }
                  dateFormat="dd/MM/yyyy"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col items-start">
              <h3 className="mb-4 text-[16px] font-semibold">Delivery Date</h3>

              <div className="flex items-center mb-4">
                <label htmlFor="deliveryDate" className="w-32 mr-2 text-[16px]">
                  Delivery Date:
                </label>
                <DatePicker
                  selected={planningSheetForm.deliveryDate}
                  onChange={(date) =>
                    setPlanningSheetForm({
                      ...planningSheetForm,
                      deliveryDate: date,
                    })
                  }
                  dateFormat="dd/MM/yyyy"
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
            className="flex items-center px-4 py-2 mr-4 text-black bg-gray-300 rounded"
          >
            Save
            <FiSave className="ml-2" />
          </button>

          {/* <DownloadAllPdf attachmentPaths={attachmentPaths} /> */}

          <PDFDownloadLink
            document={
              <ProductionPlanning
                data={planningSheetForm}
                attachmentPaths={attachmentPaths}
              />
            }
            fileName={`productionPlanning_${id}.pdf`}
            onClick={handleDownloadAll}
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

export default ProductionSheetFormUpdate;
