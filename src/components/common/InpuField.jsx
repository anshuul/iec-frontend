// InputField.jsx

const InputField = ({
  id,
  value,
  onChange,
  placeholder,
  label,
  text,
  firstInput,
  marginBottomClass = "mb-4",
}) => {
  return (
    <div className={`flex items-center ${firstInput ? "my-4" : marginBottomClass}`}>
      <label className={`${text ? "mr-2" : "mr-0"}`}>{text}</label>

      <label className="relative cursor-pointer App">
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-10 w-96 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        />
        <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
          {label}
        </span>
      </label>
    </div>
  );
};

export default InputField;
