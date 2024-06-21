import axios from "axios";

export const getMaterialIssueSlipData = async (poNo, id) => {
  try {
    // Get the planning sheet IDs
    const getMaterialIssueSlipId = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/materialissueslip/get-findMaterialIssueSlipIdByPoNoAndListItemNo?poNo=${poNo}&listItemID=${id}`
    );

    // Planning sheet ID
    const MaterialIssueSlipId = getMaterialIssueSlipId.data;
    console.log("MaterialIssueSlipId", MaterialIssueSlipId);

    return {
      MaterialIssueSlipId,
    };
  } catch (error) {
    console.error("Error getting Material Issue Slip data:", error);
    throw error;
  }
};
