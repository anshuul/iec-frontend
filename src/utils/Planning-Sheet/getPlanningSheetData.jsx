import axios from "axios";

export const getPlanningSheetData = async (updatedCustomerPO) => {
  try {
    // Get the planning sheet IDs
    const getPlanningSheetsId = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/production/get-getGeneratedProductionPlanningSheetIds?poNo=${updatedCustomerPO.poNo}`
    );

    // Planning sheet ID
    const planningSheetID = getPlanningSheetsId.data;
    console.log("planningSheetID", planningSheetID);

    // selectedItem
    const selectedItem = updatedCustomerPO.selectedItem;
    console.log("Planning Sheet selectedItem", selectedItem);

    // selectedSurface for planning sheet
    const selectedSurface = updatedCustomerPO.selectedSurface;
    console.log("Planning Sheet selectedSurface", selectedSurface);

    // customPoQuantity
    const customPoQuantity = updatedCustomerPO.quantity;
    console.log("customPoQuantity for planning", customPoQuantity);

    // Extract the number of nuts from selectedItem
    const nutsCountMatch = selectedItem.match(/\d+nuts/);
    console.log("nutsCountMatch", nutsCountMatch);

    let modifiedQuantity = customPoQuantity;

    if (nutsCountMatch) {
      const nutsCount = parseInt(nutsCountMatch[0].replace("nuts", ""));
      console.log("nutsCount", nutsCount);

      if (!isNaN(nutsCount)) {
        modifiedQuantity *= nutsCount; // Increment quantity based on the number of nuts
      } else {
        throw new Error("Invalid selectedItem format");
      }
    }

    console.log("modifiedQuantity", modifiedQuantity);

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
