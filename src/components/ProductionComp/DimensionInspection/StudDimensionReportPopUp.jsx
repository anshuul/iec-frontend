const StudDimensionReportPopUp = ({
  showPopup,
  inputValues,
  handleInputChange,
  handleSubmit,
  closePopup,
}) => {
  // Regular expression for validating numbers with optional decimal places
  const numberRegex = /^\d*\.?\d*$/;

  // Function to handle input changes with number validation
  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    // Check if the input value matches the number format
    if (value === "" || numberRegex.test(value)) {
      handleInputChange(e);
    }
  };

  return showPopup ? (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-xl mb-4">Report Parameters</h2>
        <div className="flex items-center gap-2 mb-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              name="percentage"
              value={inputValues.percentage}
              onChange={handleNumberInputChange}
              className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Random Sampling Percentage
            </span>
          </label>
        </div>

        {/* Tolerance Inputs */}
        <div className="flex items-center gap-2 my-4">
          <label htmlFor="size" className="text-[16px] mr-4">
            Tolerance (mm):
          </label>
          {/* Diameter */}
          <label className="relative cursor-pointer App">
            <input
              type="text"
              name="tolerancemin"
              value={inputValues.tolerancemin}
              onChange={handleNumberInputChange}
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              {`Tolerance(Min)`}
            </span>
          </label>

          {/* Length */}
          <label className="relative cursor-pointer App">
            <input
              type="text"
              name="tolerancemax"
              value={inputValues.tolerancemax}
              onChange={handleNumberInputChange}
              placeholder="Input"
              className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              {`Tolerance(Max)`}
            </span>
          </label>
        </div>
        <div className="flex items-center gap-2 my-4">
          <input
            type="text"
            name="studstartvalue"
            value={inputValues.studstartvalue}
            onChange={handleNumberInputChange}
            className="w-full px-3 py-2 mb-3 border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500"
            placeholder="Parameter 2"
          />
          <input
            type="text"
            name="studendvalue"
            value={inputValues.studendvalue}
            onChange={handleNumberInputChange}
            className="w-full px-3 py-2 mb-3 border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500"
            placeholder="Parameter 3"
          />
        </div>
        {/* Operator Name */}
        <div className="flex items-center gap-2 mb-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              name="operatorName"
              value={inputValues.operatorName}
              onChange={handleInputChange}
              className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Operator Name
            </span>
          </label>
        </div>

        {/* Instruments Used */}
        <div className="flex items-center gap-2 mb-4">
          <label className="relative cursor-pointer App">
            <input
              type="text"
              name="instrucmentUsed"
              value={inputValues.instrucmentUsed}
              onChange={handleInputChange}
              className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            />
            <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
              Instruments Used
            </span>
          </label>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg"
            onClick={closePopup}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default StudDimensionReportPopUp;
