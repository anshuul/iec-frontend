
const NutDimensionForm = ({
  parsedSelectedPO,
  parsedRoutingSheet,
  dimensionReportResponseForNut,
}) => {
  const mmToInch = (mm) => {
    return mm / 25.4; // Conversion factor
  };

  console.log("dimensionReportResponseForNut in Nut", dimensionReportResponseForNut);

  // Destructure minMaxData from dimensionReportResponseForNut
  const { minMaxData } = dimensionReportResponseForNut;

  // Destructure min and max values for AF, AC, and NUT_THICKNESS
  const { AF, AC, NUT_THICKNESS } = minMaxData;

  return (
    <div className="w-full px-8 mx-auto bg-white rounded shadow-md">
      <h2 className="mb-4 text-xl">NutDimension Form</h2>
      {/* First Column */}
      <div className="flex flex-col items-start">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2">
          <div className="flex items-center gap-2">
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
                value={
                  parsedSelectedPO?.POsize?.dimension === "inch"
                    ? parsedSelectedPO?.POsize?.length?.value
                    : mmToInch(parsedSelectedPO?.POsize?.length?.value)
                }
                placeholder="Input"
                className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                readOnly
              />
              <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                Length
              </span>
            </label>
          </div>
        </div>

        {/* Second column */}
        <div className="flex flex-col items-start">
          {/* Minimum and Maximum Across Flat */}
          <div className="flex items-center gap-2 my-4">
            <label htmlFor="size" className="text-[16px] mr-4">
              Across Flat (mm):
            </label>
            {/* Diameter */}
            <label className="relative cursor-pointer App">
              <input
                type="text"
                name="minAF"
                value={AF.MIN}
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
                name="maxAF"
                value={AF.MAX}
                placeholder="Input"
                className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
              />
              <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                {`Max`}
              </span>
            </label>
          </div>

          {/* Minimum and Maximum Across Cross */}
          <div className="flex items-center gap-2 mb-4">
            <label htmlFor="size" className="text-[16px] mr-2">
              Across Cross (mm):
            </label>
            {/* Diameter */}
            <label className="relative cursor-pointer App">
              <input
                type="text"
                name="minAC"
                value={AC.MIN}
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
                name="minAC"
                value={AC.MAX}
                placeholder="Input"
                className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
              />
              <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                {`Max`}
              </span>
            </label>
          </div>

          {/* Minimum and Maximum Nut Thickness */}
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor="size" className="text-[16px] mr-2">
              Nut Thickness (mm):
            </label>
            {/* Diameter */}
            <label className="relative cursor-pointer App">
              <input
                type="text"
                name="minNutThickness"
                value={NUT_THICKNESS.MIN}
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
                name="maxNutThickness"
                value={NUT_THICKNESS.MAX}
                placeholder="Input"
                className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
              />
              <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                {`Max`}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutDimensionForm;
