import axios from "axios";

export const getInspectionData = async (poNo, id) => {
    try {
        // Get the Inspection sheet IDs
        const getInspectionId = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quality/inspectionReleaseNote/getBy-findInspectionIdByPoNoAndListItemNo?poNo=${poNo}&listItemID=${id}`
        );

        // Inspection sheet ID
        const inspectionReportId = getInspectionId.data;
        console.log("inspectionReportId in Frontend", inspectionReportId);

        return {
            inspectionReportId,
        };
    } catch (error) {
        console.error("Error getting Inspection Report data:", error);
        throw error;
    }
};
