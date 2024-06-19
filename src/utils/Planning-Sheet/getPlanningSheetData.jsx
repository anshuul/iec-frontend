import axios from "axios";

export const getPlanningSheetData = async (updatedNewCustomerPo, poNo) => {
  try {
    // Get the planning sheet IDs
    const getPlanningSheetsId = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/production/get-getGeneratedProductionPlanningSheetIds/${poNo}`
    );

    // Planning sheet ID
    const planningSheetID = getPlanningSheetsId.data;
    console.log("planningSheetID", planningSheetID);

    // selectedItem
    const selectedItem = updatedNewCustomerPo.selectedItem;

    // selectedSurface for planning sheet
    const selectedSurface = updatedNewCustomerPo.selectedSurface;

    // customPoQuantity
    const customPoQuantity = updatedNewCustomerPo.quantity;

    // Extract the number of nuts from selectedItem
    const nutsCountMatch = selectedItem.match(/\d+nuts/);

    let modifiedQuantity = customPoQuantity;

    if (nutsCountMatch) {
      const nutsCount = parseInt(nutsCountMatch[0].replace("nuts", ""));

      if (!isNaN(nutsCount)) {
        modifiedQuantity *= nutsCount;
      } else {
        throw new Error("Invalid selectedItem format");
      }
    }

    return {
      planningSheetID,
      selectedItem,
      selectedSurface,
      modifiedQuantity,
      customPoQuantity,
    };
  } catch (error) {
    console.error("Error getting planning sheet data:", error);
    throw error;
  }
};
