'use client';
import { useState } from "react";
import Container from "@/components/common/Container";
import { FiFile, FiSave, FiPrinter, FiArrowLeft } from 'react-icons/fi';
import { useRouter } from "next/navigation";

const ProductionSheetForm = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      // Optionally, you can display an error message or perform other actions here
      setSelectedFile(null);
      alert('Please select a PDF file.');
    }
  };

  const handleGoBack = () => {
    router.back();
  };
  
  return (
    <Container>
      <div className="w-full p-8 mx-auto bg-white rounded shadow-md">
        <button
          onClick={handleGoBack}
          className="flex items-center mb-4 text-lg font-bold text-black"
        >
          <FiArrowLeft className="mr-2" /> {/* Left arrow icon */}
          Back
        </button>

        <hr className="my-2 border-t border-gray-300" />

        <div className="grid grid-cols-2 gap-4">
          {/* First Column */}
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-4">
              <label htmlFor="itemDesc" className="w-32 mr-2 text-[16px]">
                Item Description:
              </label>
              <input
                type="text"
                id="itemDesc"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="materialIssue" className="w-32 mr-2 text-[16px]">
                Material Issue:
              </label>
              <input
                type="text"
                id="materialIssue"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="requiredResources" className="w-32 mr-2 text-[16px]">
                Required Resources:
              </label>
              <input
                type="text"
                id="requiredResources"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="productCustomer" className="w-32 mr-2 text-[16px]">
                Product and Customer:
              </label>
              <input
                type="text"
                id="productCustomer"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="legalApplicable" className="w-32 mr-2 text-[16px]">
                Legal and Applicable:
              </label>
              <input
                type="text"
                id="legalApplicable"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="contingencyPlanning" className="w-32 mr-2 text-[16px]">
                Contingency Planning:
              </label>
              <input
                type="text"
                id="contingencyPlanning"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="contingencyPlanning" className="w-32 mr-2 text-[16px]">
                Verification:
              </label>
              <input
                type="text"
                id="contingencyPlanning"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Second Column */}
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-4">
              <label htmlFor="validation" className="w-32 mr-2 text-[16px]">
                Validation:
              </label>
              <input
                type="text"
                id="validation"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="monitoring" className="w-32 mr-2 text-[16px]">
                Monitoring:
              </label>
              <input
                type="text"
                id="monitoring"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="measurement" className="w-32 mr-2 text-[16px]">
                Measurement:
              </label>
              <input
                type="text"
                id="measurement"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="inspection" className="w-32 mr-2 text-[16px]">
                Inspection:
              </label>
              <input
                type="text"
                id="inspection"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="management" className="w-32 mr-2 text-[16px]">
                Management:
              </label>
              <input
                type="text"
                id="management"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="recordsEvidence" className="w-32 mr-2 text-[16px]">
                Records Need to Provide Evidence:
              </label>
              <input
                type="text"
                id="recordsEvidence"
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
                onClick={() => document.getElementById('attachment').click()}
                className="flex items-center px-4 py-2 ml-2 text-black bg-gray-300 rounded"
              >
                Choose file
                <FiFile className="ml-2" /> {/* File icon */}
              </button>
              {selectedFile && <span className="ml-2">{selectedFile.name}</span>}
            </div>
            <p className="ml-2 text-sm text-red-600">
              Only PDF files are allowed and only one file can be selected.
            </p>
          </div>
        </div>

        <hr className="my-4 border-t border-gray-300" />

        {/* Second Form */}
        <div className="w-full ">
          <div className="grid grid-cols-2 gap-4">
            {/* First Column */}
            <div className="flex flex-col items-start">
              <h3 className="mb-4 text-[16px] font-semibold">Planning</h3>
              <div className="flex items-center mb-4">
                <label htmlFor="planningQuantity" className="w-32 mr-2 text-[16px]">
                  Quantity:
                </label>
                <input
                  type="text"
                  id="planningQuantity"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center mb-4">
                <label htmlFor="planningDate" className="w-32 mr-2 text-[16px]">
                  Date:
                </label>
                <input
                  type="date"
                  id="planningDate"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col items-start">
              <h3 className="mb-4 text-[16px] font-semibold">Achievement</h3>
              <div className="flex items-center mb-4">
                <label htmlFor="achievementQuantity" className="w-32 mr-2 text-[16px]">
                  Quantity:
                </label>
                <input
                  type="text"
                  id="achievementQuantity"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center mb-4">
                <label htmlFor="achievementDate" className="w-32 mr-2 text-[16px]">
                  Date:
                </label>
                <input
                  type="date"
                  id="achievementDate"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4 border-t border-gray-300" />
        <div className="flex justify-end">
          <button className="flex items-center px-4 py-2 mr-4 text-black bg-gray-300 rounded">
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

export default ProductionSheetForm;
