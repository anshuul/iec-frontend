// ListItemInputs.js
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ListItemInputs = ({
  materialCode,
  setMaterialCode,

  selectedSurface,
  setSelectedSurface,

  studItemDescription,
  setStudItemDescription,

  nutItemDescription,
  setNutItemDescription,

  selectedItem,
  setSelectedItem,

  studGrade,
  setStudGrade,

  nutGrade,
  setNutGrade,

  diameter,
  setDiameter,

  diameterDimension,
  setDiameterDimension,

  thread,
  setThread,

  length,
  setLength,

  lengthDimension,
  setLengthDimension,

  cuttingDiameter,
  setCuttingDiameter,

  cuttingThread,
  setCuttingThread,

  cuttingLength,
  setCuttingLength,

  quantity,
  setQuantity,

  getRawMaterialDia,
  saveListItem,
  saved,
  index,
  saveFormData,
  loading,

  orderDate,
  handleOrderDateChange,
}) => {
  return (
    <div className="flex flex-col items-center gap-2 md:flex-row">
      <label className="relative cursor-pointer App">
        <input
          id="materialCode"
          type="text"
          value={materialCode}
          onChange={(e) => setMaterialCode(e.target.value)}
          placeholder="Input"
          className="h-10 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        />
        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
          Material Code
        </span>
      </label>

      {/* Add select input for selectedSurface */}
      <select
        id="selectedSurface"
        value={selectedSurface}
        onChange={(e) => setSelectedSurface(e.target.value)}
        className="h-10 w-44 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
      >
        <option value="select">Surface Finish</option>
        <option value="PhosphatingBlack">Phosphating(Black)</option>
        <option value="ZincPlating">Zinc Plating</option>
        <option value="HDG">HotDip Galvanizing(HDG)</option>
        <option value="PTFE">PTFE</option>
      </select>

      <label className="relative cursor-pointer App">
        <input
          id="studItemDescription"
          type="text"
          value={studItemDescription}
          onChange={(e) => setStudItemDescription(e.target.value)}
          placeholder="Input"
          className="h-10 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        />
        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
          Stud Description
        </span>
      </label>

      <label className="relative cursor-pointer App">
        <input
          id="nutItemDescription"
          type="text"
          value={nutItemDescription}
          onChange={(e) => setNutItemDescription(e.target.value)}
          placeholder="Input"
          className="h-10 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        />
        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
          Nut Description
        </span>
      </label>

      <select
        id="selectedItem"
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value)}
        className="h-10 w-44 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
      >
        <option value="select">--select--</option>
        <option value="stud">Stud</option>
        <option value="studwith1nuts">stud X 1 Nuts</option>
        <option value="studwith2nuts">stud X 2 Nuts</option>
        <option value="studwith3nuts">stud X 3 Nuts</option>
        <option value="studwith4nuts">stud X 4 Nuts</option>
        <option value="nut">Nut</option>
      </select>

      <label className="relative cursor-pointer App">
        <input
          id="studGrade"
          type="text"
          value={studGrade}
          onChange={(e) => setStudGrade(e.target.value)}
          placeholder="Input"
          className="h-10 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        />
        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
          Stud Grade
        </span>
      </label>

      <label className="relative cursor-pointer App">
        <input
          id="nutGrade"
          type="text"
          value={nutGrade}
          onChange={(e) => setNutGrade(e.target.value)}
          placeholder="Input"
          className="h-10 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        />
        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
          Nut Grade
        </span>
      </label>

      {/* PO Size */}
      <span className="w-24">PO Size:</span>

      <label className="relative cursor-pointer App">
        <input
          id="diameter"
          type="text"
          value={diameter}
          onChange={(e) => setDiameter(e.target.value)}
          placeholder="Input"
          className="h-10 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        />
        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
          Diameter
        </span>
      </label>
      <label
        htmlFor="dimension"
        className="relative flex items-center cursor-pointer App"
      >
        <select
          id="diameterUnit"
          value={diameterDimension}
          onChange={(e) => setDiameterDimension(e.target.value)}
          className="h-10 w-24 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
        >
          {/* <option value="">-select-</option> */}
          <option value="inch">Inch</option>
          <option value="mm">MM</option>
        </select>
      </label>

      <label className="relative cursor-pointer App">
        <input
          id="nutItemDescription"
          type="text"
          value={thread}
          onChange={(e) => setThread(e.target.value)}
          placeholder="Input"
          className="h-10 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        />
        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
          Pitch
        </span>
      </label>

      <label className="relative cursor-pointer App">
        <input
          id="sizeFirstPart"
          type="text"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          placeholder="Input"
          className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        />
        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
          Length
        </span>
      </label>
      {/* Length dimension */}
      <label
        htmlFor="dimension"
        className="relative flex items-center cursor-pointer App"
      >
        <select
          id="lengthUnit"
          value={lengthDimension}
          onChange={(e) => setLengthDimension(e.target.value)}
          className="h-10 w-24 px-2 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200"
        >
          <option value="inch">Inch</option>
          <option value="mm">MM</option>
        </select>
      </label>

      <button
        onClick={getRawMaterialDia}
        className="text-sm w-auto font-bold text-white bg-blue-500 rounded-lg px-4 py-2"
      >
        Get Size
      </button>

      {/* Cutting Size */}
      <span className="w-24">Cutting Size:</span>
      {/* Diameter */}
      <label className="relative cursor-pointer App">
        <input
          id="sizeFirstPart"
          type="text"
          value={cuttingDiameter}
          onChange={(e) => setCuttingDiameter(e.target.value)}
          placeholder="Input"
          className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        />
        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
          Diameter
        </span>
      </label>

      {/* Pitch */}
      <label className="relative cursor-pointer App">
        <input
          id="thread"
          type="text"
          value={cuttingThread}
          onChange={(e) => setCuttingThread(e.target.value)}
          placeholder="Input"
          className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        />
        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
          Pitch
        </span>
      </label>

      {/* Length */}
      <label className="relative cursor-pointer App">
        <input
          id="sizeFirstPart"
          type="text"
          value={cuttingLength}
          onChange={(e) => setCuttingLength(e.target.value)}
          placeholder="Input"
          className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        />
        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
          Length
        </span>
      </label>

      {/* Quantity */}
      <label className="relative cursor-pointer App">
        <input
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          type="text"
          placeholder="Input"
          className="h-10 w-22 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        />
        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
          Quantity
        </span>
      </label>

      <label htmlFor="deliveryDate" className="w-32 mr-2 text-[16px]">
        Order Date:
      </label>
      <DatePicker
        selected={orderDate}
        onChange={handleOrderDateChange}
        dateFormat="dd/MM/yyyy"
        className="w-44 px-3 py-2 border border-gray-300 rounded"
      />

      {index < 1 && (
        <button
          onClick={saveFormData}
          className={`text-lgsm font-bold text-white rounded-lg px-4 py-2 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
          }`}
          disabled={loading}
        >
          Add
        </button>
      )}
      {index > 0 && (
        <button
          onClick={saveListItem}
          className={`text-lgsm font-bold text-white rounded-lg px-4 py-2 ${
            saved ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
          }`}
          disabled={saved}
        >
          Add
        </button>
      )}
    </div>
  );
};

export default ListItemInputs;
