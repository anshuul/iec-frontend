"use client";
import MPIReportForm from "@/components/QualityComp/QualityStepsCreateForm/MPIReportForm";
import HardnessReportTable from "@/components/QualityComp/QuantityStepsTables/HardnessReportTable";
import HeatTreatmentTable from "@/components/QualityComp/QuantityStepsTables/HeatTreatmentTable";
import MPIReportTable from "@/components/QualityComp/QuantityStepsTables/MPIReportTable";

const QualityStep = ({ params }) => {
  const { qualityStep } = params;
  console.log("qualityStep", qualityStep);

  return (
    <div className="bg-gray-300">
        {/* Heat Treatment */}
      {qualityStep === "heat-treatment" && (
        <HeatTreatmentTable qualityStep={qualityStep} />
      )}

      {/* Hardness Report */}
      {qualityStep === "hardness-test-report" && (
        <HardnessReportTable qualityStep={qualityStep} />
      )}

      {/* MPI Report */}
      {qualityStep === "magnetic-particle-inspection" && (
        <MPIReportTable qualityStep={qualityStep} />
      )}
    </div>
  );
};

export default QualityStep;
