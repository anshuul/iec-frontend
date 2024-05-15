import axios from "axios";

export const getMaterialIssueSlipData = async (updatedCustomerPO) => {
  try {
    // Get the planning sheet IDs
    const getMaterialIssueSlipId = await axios.get(
      `http://localhost:8000/api/materialissueslip/get-getGeneratedMaterialIssueSlipIDByPoNo/${updatedCustomerPO.poNo}`
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
