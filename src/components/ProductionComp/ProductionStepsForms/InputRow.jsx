import React from 'react';

const InputRow = ({ label, value, onChange, placeholder }) => {
    return (
        <div className="flex items-center space-x-4">
            <label className="w-32">{label}</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputRow;
