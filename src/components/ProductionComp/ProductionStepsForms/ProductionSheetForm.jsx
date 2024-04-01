import Container from "@/components/common/Container";
import React from "react";

const ProductionSheetForm = () => {
  return (
    <Container>
      <div className="w-full mx-auto bg-white rounded p-8 shadow-md">
        <h2 className="text-xl font-bold mb-4">Production Sheet Form</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* First Column */}
          <div className="flex items-start flex-col">
            <div className="flex items-center mb-4">
              <label htmlFor="itemDesc" className="mr-2 text-lg">
                Item Description:
              </label>
              <input
                type="text"
                id="itemDesc"
                className="w-1/2 border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="materialIssue" className="mr-2 text-lg">
                Material Issue:
              </label>
              <input
                type="text"
                id="materialIssue"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="requiredResources" className="mr-2 text-lg">
                Required Resources:
              </label>
              <input
                type="text"
                id="requiredResources"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="productCustomer" className="mr-2 text-lg">
                Product and Customer:
              </label>
              <input
                type="text"
                id="productCustomer"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="legalApplicable" className="mr-2 text-lg">
                Legal and Applicable:
              </label>
              <input
                type="text"
                id="legalApplicable"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="contingencyPlanning" className="mr-2 text-lg">
                Contingency Planning:
              </label>
              <input
                type="text"
                id="contingencyPlanning"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="contingencyPlanning" className="mr-2 text-lg">
                Verification:
              </label>
              <input
                type="text"
                id="contingencyPlanning"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Second Column */}
          <div className="flex items-start flex-col">
            <div className="flex items-center mb-4">
              <label htmlFor="validation" className="mr-2 text-lg">
                Validation:
              </label>
              <input
                type="text"
                id="validation"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="monitoring" className="mr-2 text-lg">
                Monitoring:
              </label>
              <input
                type="text"
                id="monitoring"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="measurement" className="mr-2 text-lg">
                Measurement:
              </label>
              <input
                type="text"
                id="measurement"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="inspection" className="mr-2 text-lg">
                Inspection:
              </label>
              <input
                type="text"
                id="inspection"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="management" className="mr-2 text-lg">
                Management:
              </label>
              <input
                type="text"
                id="management"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="recordsEvidence" className="mr-2 text-lg">
                Records Need to Provide Evidence:
              </label>
              <input
                type="text"
                id="recordsEvidence"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="recordsEvidence" className="mr-2 text-lg">
                Attachment
              </label>
              <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                Choose file
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductionSheetForm;
