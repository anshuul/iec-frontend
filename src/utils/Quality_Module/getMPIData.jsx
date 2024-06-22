import axios from "axios";

export const getMPIData = async (poNo, id) => {
  try {
    // Get the planning sheet IDs
    const getMPIId = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quality/mpi/getBy-findMPIIdByPoNoAndListItemNo?poNo=${poNo}&listItemID=${id}`
    );

    // Planning sheet ID
    const mpiReportId = getMPIId.data;
    console.log("mpiReportId in Frontend", mpiReportId);

    return {
      mpiReportId,
    };
  } catch (error) {
    console.error("Error getting Material Issue Slip data:", error);
    throw error;
  }
};
