import axios from "axios";

export const getProductionReportData = async (updatedCustomerPO, prefix) => {
  try {
    // Get the production report ID for each prefix
    const ProductionIds = await Promise.all(
      prefix.map(async (pre) => {
        // Get the production report ID for the current prefix
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productionReport/get-generatedProductionReportId?poNo=${updatedCustomerPO.poNo}&&prefix=${pre}`
        );
        // Extract the production report ID from the response
        const ProductionId = response.data;
        console.log(`${pre} ProductionId`, ProductionId);
        return { prefix: pre, generatedProductionReportId: ProductionId };
      })
    );

    // Extract the generatedProductionReportId and prefix arrays
    const generatedProductionReportIDData = ProductionIds.map(
      (item) => item.generatedProductionReportId
    );
    console.log("generatedProductionReportIDData", generatedProductionReportIDData);
    return { generatedProductionReportIDData };
  } catch (error) {
    console.error("Error getting Production Report data:", error);
    throw error;
  }
};
