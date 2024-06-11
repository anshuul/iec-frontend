import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
  },
  cell3: {
    display: "flex",
    padding: 5,
    border: "1px solid #000",
    textAlign: "center",
  },
});

const ProductionPlanMain = ({
  srNo,
  points,
  specs,
  planningDate,
  planningQty,
  achievementDate,
  achievementQty,
}) => {
  // Check if specs are available
  const specsAvailable = specs && specs !== "N/A";

  // Render "N/A" for planning and achievement details if specs are not available
  if (!specsAvailable) {
    planningDate = "N/A";
    planningQty = "N/A";
    achievementDate = "N/A";
    achievementQty = "N/A";
  }

  return (
    <View style={styles.header} wrap={false}>
      <Text style={{ width: "30px", ...styles.cell3 }}>{srNo}.</Text>
      <Text style={{ width: "200px", ...styles.cell3 }}>{points}</Text>
      <Text style={{ width: "171px", ...styles.cell3 }}>{specs}</Text>

      {/* Render planning and achievement details */}
      <Text style={{ width: "100px", ...styles.cell3 }}>{planningDate}</Text>
      <Text style={{ width: "100px", ...styles.cell3 }}>
        {planningQty !== "N/A" ? `${planningQty} NOS` : planningQty}
      </Text>
      <Text style={{ width: "100px", ...styles.cell3 }}>{achievementDate}</Text>
      <Text style={{ width: "100px", ...styles.cell3 }}>
        {achievementQty !== "N/A" ? `${achievementQty} NOS` : achievementQty}
      </Text>
    </View>
  );
};

export default ProductionPlanMain;