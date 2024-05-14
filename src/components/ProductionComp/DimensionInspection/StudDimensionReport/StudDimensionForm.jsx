const StudDimensionForm = ({
  parsedSelectedPO,
  parsedRoutingSheet,
  dimensionReportResponse,
}) => {
  const mmToInch = (mm) => {
    return mm / 25.4; // Conversion factor
  };

  // Destructure fields from dimensionReportResponse
  const {
    studendvalue,
    studstartvalue,
    tolerancemax,
    tolerancemin,
    instrumentUsed,
    operatorName,
    percentage,
  } = dimensionReportResponse || {};

  console.log("dimensionReportResponse in stud", dimensionReportResponse);

  // Set default values for studendvalue and studstartvalue if tolerancemax and tolerancemin are null
  const defaultStudEndValue = tolerancemax ? tolerancemax : studendvalue;
  const defaultStudStartValue = tolerancemin ? tolerancemin : studstartvalue;

  return (
    <div className="w-full px-8 mx-auto bg-white rounded shadow-md">
      <h2 className="mb-4 text-xl">StudDimension Form</h2>

      {/* {parsedSelectedPO && ( */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2">
        {/* First Column */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 mb-4">
            <label className="relative cursor-pointer App">
              <input
                type="text"
                name="itemDescription"
                value={
                  parsedRoutingSheet.RoutingSheets.startsWith("Stud")
                    ? parsedSelectedPO.studItemDescription
                    : parsedSelectedPO.nutItemDescription
                }
                className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                readOnly
              />
              <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                Item Description
              </span>
            </label>
          </div>

          {/* Required Dim(mm) */}
          <div className="flex items-center gap-2 mb-4">
            <label className="relative cursor-pointer App">
              <input
                type="text"
                name="itemDescription"
                value={parsedSelectedPO?.POsize?.length?.value}
                className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                readOnly
              />
              <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                Required Dim(mm)
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-col items-start">
          {/* Size Inputs */}
          <div className="flex items-center gap-2">
            <label htmlFor="size" className="text-[16px] mr-4">
              Size:
            </label>
            {/* Diameter */}
            <label className="relative cursor-pointer App">
              <input
                type="text"
                name="studDia"
                value={parsedSelectedPO?.POsize?.diameter?.value}
                placeholder="Input"
                className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                readOnly
              />
              <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                Diameter
              </span>
            </label>

            {/* Length */}
            <label className="relative cursor-pointer App">
              <input
                type="text"
                name="studLength"
                value={mmToInch(parsedSelectedPO?.POsize?.length?.value).toFixed(0)} // Convert mm to inch and round to 2 decimal places
                placeholder="Input"
                className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                readOnly
              />
              <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                Length
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
                placeholder="Input"
                value={defaultStudStartValue || 0} // Provide value from dimensionReportResponse
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
                placeholder="Input"
                value={defaultStudEndValue} // Provide value from dimensionReportResponse
                className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
              />
              <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                {`Tolerance(Max)`}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudDimensionForm;
