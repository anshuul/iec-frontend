import DimensionReportForm from "@/components/ProductionComp/ProductionStepsForms/DimensionReportForm";
import MaterialIssueForm from "@/components/ProductionComp/ProductionStepsForms/MaterialIssueForm";
import ProductionReportForm from "@/components/ProductionComp/ProductionStepsForms/ProductionReportForm";
import ProductionSheetForm from "@/components/ProductionComp/ProductionStepsForms/ProductionSheetForm";
import RoutingSheetForm from "@/components/ProductionComp/ProductionStepsForms/RoutingSheetForm";

const productionForm = ({ params }) => {
  const { productionForm } = params;
  console.log("productionStep", productionForm);
  return (
    <div>
      {productionForm === "productionSheetForm" && (
        <ProductionSheetForm productionForm={productionForm} />
      )}
      {productionForm === "materialIssueForm" && (
        <MaterialIssueForm productionForm={productionForm} />
      )}
      {productionForm === "routingSheetForm" && (
        <RoutingSheetForm productionForm={productionForm} />
      )}
      {productionForm === "productionReportForm" && (
        <ProductionReportForm productionForm={productionForm} />
      )}
      {productionForm === "dimensionReportForm" && (
        <DimensionReportForm productionForm={productionForm} />
      )}
    </div>
  );
};

export default productionForm;
