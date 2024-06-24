import axios from "axios";

export const getRoutingSheetData = async (poNo, id) => {
  try {
    // Get the planning sheet IDs
    const getRoutingingSheetsId = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/routingSheet/get-findRoutingSheetIdByPoNoAndListItemNo?poNo=${poNo}&listItemID=${id}`
    );

    // Planning sheet ID
    const routingingSheetID = getRoutingingSheetsId.data.map(
      (sheet) => sheet.generatedRoutingSheetId
    );

    console.log("routingingSheetID", routingingSheetID);

    return { routingingSheetID };
  } catch (error) {
    console.error("Error getting Routing Sheet data:", error);
    throw error;
  }
};