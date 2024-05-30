"use client";
import ProductionTable from "@/components/HomeComp/ProductionTable";
import DimensionReportHome from "@/components/ProductionComp/DimensionInspection/DimensionInspectionReportHome";
import ProductionReportForm from "@/components/ProductionComp/ProductionStepsForms/ProductionReportForm";
import DimensionReport from "@/components/ProductionComp/ProductionStepsTables/DimensionReport";
import MaterialIssueSlipTable from "@/components/ProductionComp/ProductionStepsTables/MaterialIssueSlipTable";
import ProductionReport from "@/components/ProductionComp/ProductionStepsTables/ProductionReport";
import ProductionSheetTable from "@/components/ProductionComp/ProductionStepsTables/ProductionSheetTable";
import RoutingSheetTable from "@/components/ProductionComp/ProductionStepsTables/RoutingSheetTable";
import { useEffect, useState } from "react";

const ProducitonStep = ({ params }) => {
  const { productionStep } = params;
  console.log("productionStep", productionStep);

  const [userEmailName, setUserEmailName] = useState("");

  useEffect(() => {
    // Retrieve user email from localStorage
    const userEmail = localStorage.getItem("userEmail");
    // Extract name from email
    const name = userEmail ? userEmail.split("@")[0] : ""; // Split email by '@' and get the first part
    setUserEmailName(name);
  }, []);
  console.log("userEmailName in ProducitonStep", userEmailName);

  return (
    <div className="bg-gray-300">
      {productionStep === "po-list-item" && (
        <ProductionSheetTable
          productionStep={productionStep}
          userEmailName={userEmailName}
        />
      )}
      {productionStep === "production-planning-sheets" && (
        <ProductionSheetTable
          productionStep={productionStep}
          userEmailName={userEmailName}
        />
      )}
      {productionStep === "material-issue-slip" && (
        <MaterialIssueSlipTable productionStep={productionStep} />
      )}
      {productionStep === "routing-sheet" && (
        <RoutingSheetTable
          productionStep={productionStep}
          userEmailName={userEmailName}
        />
      )}
      {productionStep === "production-report" && (
        // <ProductionReportForm productionStep={productionStep} />
        <ProductionReport
          productionStep={productionStep}
          userEmailName={userEmailName}
        />
      )}
      {/* {productionStep === "production-report" && (
        <ProductionReport productionStep={productionStep} />
      )} */}
      {/* {productionStep === "dimension-report" && (
        <DimensionReport productionStep={productionStep} />
      )} */}
      {productionStep === "dimension-report" && (
        <DimensionReportHome productionStep={productionStep} />
      )}
    </div>
  );
};

export default ProducitonStep;
