import ProductionSheetForm from "@/components/ProductionComp/ProductionStepsForms/ProductionSheetForm";

const productionForm = ({ params }) => {
  const { productionForm } = params;
  console.log("productionStep", productionForm);
  return (
    <div>
      {productionForm === "productionSheetForm" && <ProductionSheetForm productionForm={productionForm}/>}
    </div>
  );
};

export default productionForm;
