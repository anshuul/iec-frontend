// ListItemInputs.js
import React from 'react';

const ListItemInputs = ({
    materialCode,
    setMaterialCode,
    studItemDescription,
    setStudItemDescription,
    nutItemDescription,
    setNutItemDescription,
    selectedItem,
    setSelectedItem,
    selectedSurface,
    setSelectedSurface,
    diameterDimension,
    setDiameterDimension,
    
    studGrade,
    setStudGrade,
    nutGrade,
    setNutGrade,
    quantity,
    setQuantity,
    attachmentPath,
    setAttachmentPath,
    attachmentName,
    setAttachmentName,
    poNo,
    setPoNo,
    diameter,
    setDiameter,
    thread,
    setThread,
    convertedLength,
    setConvertedLength,
    cuttingdiameter,
    setCuttingDiameter,
    cuttingthread,
    setCuttingThread,
    cuttinglength,
    setCuttingLength,
    existingPO,
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
                    className="h-10 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200" />
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
                    id="nutItemDescription"
                    type="text"
                    value={nutItemDescription}
                    onChange={(e) => setNutItemDescription(e.target.value)}
                    placeholder="Input"
                    className="h-10 px-6 text-[16px] text-black bg-white border-black border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                />
                <span className="text-[16px] text-black text-opacity-80 bg-white absolute left-4 top-1.5 px-1 transition duration-200 input-text">
                    Stud Grade
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
                    Nut Grade
                </span>
            </label>

            <span className='w-24'>PO Size:</span>

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
        </div>
    );
};

export default ListItemInputs;
