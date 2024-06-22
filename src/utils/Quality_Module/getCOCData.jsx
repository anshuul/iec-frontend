import axios from "axios";

export const getCOCData = async (poNo, id) => {
  try {
    // Get the planning sheet IDs
    const getCOCId = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quality/coc/getBy-findCOCIdByPoNoAndListItemNo?poNo=${poNo}&listItemID=${id}`
    );

    // Planning sheet ID
    const cocReportId = getCOCId.data;
    console.log("cocReportId in Frontend", cocReportId);

    return {
      cocReportId,
    };
  } catch (error) {
    console.error("Error getting Material Issue Slip data:", error);
    throw error;
  }
};
