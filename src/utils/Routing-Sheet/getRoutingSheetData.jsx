import axios from "axios";

export const getRoutingSheetData = async (updatedCustomerPO) => {
  try {
    // Get the planning sheet IDs
    const getRoutingingSheetsId = await axios.get(
      `http://localhost:8000/api/routingSheet/get-generatedRoutingSheetID?poNo=${updatedCustomerPO.poNo}`
    );

    // Planning sheet ID
    // const routingingSheetID = getRoutingingSheetsId.data;
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
