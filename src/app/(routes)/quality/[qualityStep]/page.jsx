"use client";
import MPIReportForm from "@/components/QualityComp/QualityStepsCreateForm/MPIReportForm";
import CertificateOfCompilanceTable from "@/components/QualityComp/QuantityStepsTables/CertificateOfCompilanceTable";
import DispatchTable from "@/components/QualityComp/QuantityStepsTables/DispatchTable";
import HardnessReportTable from "@/components/QualityComp/QuantityStepsTables/HardnessReportTable";
import HeatTreatmentTable from "@/components/QualityComp/QuantityStepsTables/HeatTreatmentTable";
import InspectionReleaseNoteTable from "@/components/QualityComp/QuantityStepsTables/InspectionReleaseNoteTable";
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

      {/* COC Report */}
      {qualityStep === "certificate-compliance" && (
        <CertificateOfCompilanceTable qualityStep={qualityStep} />
      )}

      {/* Inspection Release Note Table */}
      {qualityStep === "inspection-release-note" && (
        <InspectionReleaseNoteTable qualityStep={qualityStep} />
      )}

      {/* DispatchTable */}
      {qualityStep === "dispatch" && (
        <DispatchTable qualityStep={qualityStep} />
      )}
    </div>
  );
};

export default QualityStep;
