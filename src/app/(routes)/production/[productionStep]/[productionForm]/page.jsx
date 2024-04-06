import DimensionReportForm from "@/components/ProductionComp/ProductionStepsForms/DimensionReportForm";
import EditCustomerForm from "@/components/ProductionComp/ProductionStepsForms/EditCustomerForm";
import MaterialIssueForm from "@/components/ProductionComp/ProductionStepsForms/MaterialIssueForm";
import ProductionReportForm from "@/components/ProductionComp/ProductionStepsForms/ProductionReportForm";
import ProductionSheetForm from "@/components/ProductionComp/ProductionStepsForms/ProductionSheetForm";
import RoutingSheetForm from "@/components/ProductionComp/ProductionStepsForms/RoutingSheetForm";
import CutomerPoHistoryForm from "@/components/ProductionComp/ProductionStepsForms/CutomerPoHistoryForm";
import ProductionForm from "@/components/ProductionComp/ProductionStepsForms/productionForm";
import ProductionSheetFormUpdate from "@/components/ProductionComp/productionFormUpdate/ProductionSheetFormUpdate";
import MaterialIssueSlipForm from "@/components/ProductionComp/productionFormUpdate/MaterialIssueSlipForm";

const productionForm = ({ params }) => {
  const { productionForm } = params;
  console.log("productionStep", productionForm);
  return (
    <div className="bg-gray-300">
      {productionForm === "materialIssueFormUpdate" && (
        <MaterialIssueSlipForm productionForm={productionForm} />
      )}
      {productionForm === "productionSheetFormUpdate" && (
        <ProductionSheetFormUpdate productionForm={productionForm} />
      )}
      {productionForm === "view" && (
        <CutomerPoHistoryForm productionForm={productionForm} />
      )}
      {productionForm === "update" && (
        <EditCustomerForm productionForm={productionForm} />
      )}
      {productionForm === "productionForm" && (
        <ProductionForm productionForm={productionForm} />
      )}
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
