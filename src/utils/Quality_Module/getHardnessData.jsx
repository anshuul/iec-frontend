import axios from "axios";

export const getHardnessData = async (poNo, id) => {
  try {
    // Get the planning sheet IDs
    const getHardnessmentId = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quality/hardness/getBy-findHardnessReportIdByPoNoAndListItemNo?poNo=${poNo}&listItemID=${id}`
    );

    // Planning sheet ID
    const hardnessReportId = getHardnessmentId.data;
    console.log("hardnessReportId in Frontend", hardnessReportId);

    return {
      hardnessReportId,
    };
  } catch (error) {
    console.error("Error getting Material Issue Slip data:", error);
    throw error;
  }
};
