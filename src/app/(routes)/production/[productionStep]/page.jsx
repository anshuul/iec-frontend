import DimensionReportHome from "@/components/ProductionComp/DimensionInspection/DimensionInspectionReportHome";
import ProductionReportForm from "@/components/ProductionComp/ProductionStepsForms/ProductionReportForm";
import DimensionReport from "@/components/ProductionComp/ProductionStepsTables/DimensionReport";
import MaterialIssueSlipTable from "@/components/ProductionComp/ProductionStepsTables/MaterialIssueSlipTable";
import ProductionReport from "@/components/ProductionComp/ProductionStepsTables/ProductionReport";
import ProductionSheetTable from "@/components/ProductionComp/ProductionStepsTables/ProductionSheetTable";
import RoutingSheetTable from "@/components/ProductionComp/ProductionStepsTables/RoutingSheetTable";

const ProducitonStep = ({ params }) => {
  const { productionStep } = params;
  console.log("productionStep", productionStep);

  return (
    <div className="bg-gray-300">
      {productionStep === "production-planning-sheets" && (
        <ProductionSheetTable productionStep={productionStep} />
      )}
      {productionStep === "material-issue-slip" && (
        <MaterialIssueSlipTable productionStep={productionStep} />
      )}
      {productionStep === "routing-sheet" && (
        <RoutingSheetTable productionStep={productionStep} />
      )}
      {productionStep === "production-report" && (
        <ProductionReportForm productionStep={productionStep} />
        // <ProductionReport productionStep={productionStep} />
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
