"use client";
import MPIReportForm from "@/components/QualityComp/QualityStepsCreateForm/MPIReportForm";
import CertificateOfCompilanceTable from "@/components/QualityComp/QuantityStepsTables/CertificateOfCompilanceTable";
import DispatchTable from "@/components/QualityComp/QuantityStepsTables/DispatchTable";
import HardnessReportTable from "@/components/QualityComp/QuantityStepsTables/HardnessReportTable";
import HeatTreatmentTable from "@/components/QualityComp/QuantityStepsTables/HeatTreatmentTable";
import InspectionReleaseNoteTable from "@/components/QualityComp/QuantityStepsTables/InspectionReleaseNoteTable";
import MPIReportTable from "@/components/QualityComp/QuantityStepsTables/MPIReportTable";
import { useEffect, useState } from "react";

const QualityStep = ({ params }) => {
  const { qualityStep } = params;
  console.log("qualityStep", qualityStep);

  const [qualityModuleType, setQualityModuleType] = useState(null);

  useEffect(() => {
    const storedQualityModuleType = localStorage.getItem("qualityModuleType");
    setQualityModuleType(storedQualityModuleType);
  }, []);

  return (
    <div className="bg-gray-300">
      {/* Heat Treatment */}
      {qualityStep === "heat-treatment" && qualityModuleType === "API" && (
        <HeatTreatmentTable qualityStep={qualityStep} />
      )}

      {/* Hardness Report */}
      {qualityStep === "hardness-test-report" && qualityModuleType === "API" && (
        <HardnessReportTable qualityStep={qualityStep} />
      )}

      {/* MPI Report */}
      {qualityStep === "magnetic-particle-inspection" && qualityModuleType === "API" && (
        <MPIReportTable qualityStep={qualityStep} />
      )}

      {/* COC Report */}
      {qualityStep === "certificate-compliance" && qualityModuleType === "API" && (
        <CertificateOfCompilanceTable qualityStep={qualityStep} />
      )}

      {/* Inspection Release Note Table */}
      {qualityStep === "inspection-release-note" && qualityModuleType === "API" && (
        <InspectionReleaseNoteTable qualityStep={qualityStep} />
      )}

      {/* DispatchTable */}
      {qualityStep === "dispatch" && qualityModuleType === "API" && (
        <DispatchTable qualityStep={qualityStep} />
      )}
    </div>
  );
};

export default QualityStep;
