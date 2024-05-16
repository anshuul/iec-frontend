import axios from "axios";

export const getProductionReportData = async (updatedCustomerPO, prefix) => {
  try {
    // Get the production report ID for each prefix
    const ProductionIds = await Promise.all(
      prefix.map(async (pre) => {
        // Get the production report ID for the current prefix
        const response = await axios.get(
          `http://localhost:8000/api/productionReport/get-generatedProductionReportId/${updatedCustomerPO.poNo}/${pre}`
        );
        // Extract the production report ID from the response
        const ProductionId = response.data;
        console.log(`${pre} ProductionId`, ProductionId);
        return { prefix: pre, generatedProductionReportId: ProductionId };
      })
    );

    // Extract the generatedProductionReportId and prefix arrays
    const generatedProductionReportId = ProductionIds.map(
      (item) => item.generatedProductionReportId
    );
    console.log("generatedProductionReportId", generatedProductionReportId);
    return { generatedProductionReportId };
  } catch (error) {
    console.error("Error getting Production Report data:", error);
    throw error;
  }
};
