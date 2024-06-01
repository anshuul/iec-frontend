import CertificateOfCompilanceForm from "@/components/QualityComp/QualityStepsCreateForm/CertificateOfCompilanceForm";
import DispatchForm from "@/components/QualityComp/QualityStepsCreateForm/DispatchForm";
import HardnessReportForm from "@/components/QualityComp/QualityStepsCreateForm/HardnessReportForm";
import HeatTreatmentForm from "@/components/QualityComp/QualityStepsCreateForm/HeatTreatmentForm";
import InspectionReleaseNoteForm from "@/components/QualityComp/QualityStepsCreateForm/InspectionReleaseNoteForm";
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
      {/* CertificateOfCompilanceForm */}
      {qualityForm === "certificateOfCompilanceForm" && (
        <CertificateOfCompilanceForm qualityForm={qualityForm} />
      )}
      {/* InspectionReleaseNoteForm */}
      {qualityForm === "inspectionReleaseNoteForm" && (
        <InspectionReleaseNoteForm qualityForm={qualityForm} />
      )}
      {/* DispatchForm */}
      {qualityForm === "dispatchForm" && (
        <DispatchForm qualityForm={qualityForm} />
      )}
    </div>
  );
};

export default QualityForm;
