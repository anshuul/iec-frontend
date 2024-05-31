import HardnessReportForm from "@/components/QualityComp/QualityStepsCreateForm/HardnessReportForm";
import HeatTreatmentForm from "@/components/QualityComp/QualityStepsCreateForm/HeatTreatmentForm";
import MPIReportForm from "@/components/QualityComp/QualityStepsCreateForm/MPIReportForm";

const QualityForm = ({ params }) => {
  const { qualityForm } = params;
  console.log("qualityForm in QualityForm", qualityForm);

  return (
    <div className="bg-gray-300">
      {/* heatTreatmentForm */}
      {qualityForm === "heatTreatmentForm" && (
        <HeatTreatmentForm qualityForm={qualityForm} />
      )}

      {/* hardnessReportForm */}
      {qualityForm === "hardnessReportForm" && (
        <HardnessReportForm qualityForm={qualityForm} />
      )}
      {/* MPIReportForm */}
      {qualityForm === "magneticParticleInspectionForm" && (
        <MPIReportForm qualityForm={qualityForm} />
      )}
    </div>
  );
};

export default QualityForm;
