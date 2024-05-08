// "use client"

const NutDimensionForm = ({
  parsedSelectedPO,
  parsedRoutingSheet,
  dimensionReportResponse,
}) => {
  console.log("dimensionReportResponse in Nut", dimensionReportResponse);
  return (
    <div className="w-full p-8 mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl mb-4">NutDimension Form</h2>

      {parsedSelectedPO && (
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
      )}

      {/* Size Inputs */}
      <div className="flex items-center gap-2 my-4">
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
            value={parsedSelectedPO?.POsize?.length?.value}
            placeholder="Input"
            className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
            readOnly
          />
          <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
            Length
          </span>
        </label>
      </div>

      {/* Minimum and Maximum Inputs */}
      <div className="flex items-center gap-2 my-4">
        <label htmlFor="size" className="text-[16px] mr-4">
          Length (mm):
        </label>
        {/* Diameter */}
        <label className="relative cursor-pointer App">
          <input
            type="text"
            name="tolerancemin"
            placeholder="Input"
            className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
          />
          <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
            {`Min`}
          </span>
        </label>

        {/* Length */}
        <label className="relative cursor-pointer App">
          <input
            type="text"
            name="tolerancemax"
            placeholder="Input"
            className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
          />
          <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
            {`Max`}
          </span>
        </label>
      </div>
    </div>
  );
};

export default NutDimensionForm;
