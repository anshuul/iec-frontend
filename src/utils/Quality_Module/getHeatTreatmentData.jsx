import axios from "axios";

export const getHeatTreatmentData = async (poNo, id) => {
  try {
    // Get the planning sheet IDs
    const getHeatTreatmentId = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quality/heatTreatment/getBy-findHeatTreatmentIdByPoNoAndListItemNo?poNo=${poNo}&listItemID=${id}`
    );

    // Planning sheet ID
    const heatTreatmentID = getHeatTreatmentId.data;
    console.log("heatTreatmentID in Frontend", heatTreatmentID);

    return {
      heatTreatmentID,
    };
  } catch (error) {
    console.error("Error getting Material Issue Slip data:", error);
    throw error;
  }
};
