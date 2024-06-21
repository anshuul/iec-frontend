"use client";
import Container from "@/components/common/Container";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";

const CreateListItemForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const poNo = searchParams.get("poNo");

  // Loading State
  const [loading, setLoading] = useState(false);

  // List Item Form State
  const [listItems, setListItems] = useState([
    {
      materialCode: "",
      studItemDescription: "",
      nutItemDescription: "",
      selectedItem: "",
      selectedSurface: "",
      studGrade: "",
      nutGrade: "",
      diameter: "",
      diameterDimension: "mm",
      thread: "",
      length: "",
      lengthDimension: "mm",
      cuttingDiameter: "",
      cuttingthread: "",
      cuttingLength: "",
      quantity: "",
      orderDate: new Date(),
    },
  ]);
  const [selectedFile, setSelectedFile] = useState(null);

  const userName = localStorage.getItem("userName");


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
          <FiArrowLeft className="mr-2" />
          Back
        </button>

        <hr className="my-2 border-t border-gray-300" />
      </div>
    </Container>
  );
};

export default CreateListItemForm;
