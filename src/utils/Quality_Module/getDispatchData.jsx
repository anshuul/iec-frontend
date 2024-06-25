import axios from "axios";

export const getDispatchData = async (poNo, id) => {
    try {
        // Get the Dispatch sheet IDs
        const getDispatchId = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quality/dispatch/getBy-findDispatchReleaseNoteIdByPoNoAndListItemNo?poNo=${poNo}&listItemID=${id}`
        );

        // dispatch sheet ID
        const dispatchReportId = getDispatchId.data;
        console.log("dispatchReportId in Frontend", dispatchReportId);

        return {
            dispatchReportId,
        };
    } catch (error) {
        console.error("Error getting dispatchReportId Report data:", error);
        throw error;
    }
};
