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
    // width: "400px",
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
  return (
    <View style={styles.header} wrap={false}>
      <Text style={{ width: "30px", ...styles.cell3 }}>{srNo}.</Text>
      <Text style={{ width: "200px", ...styles.cell3 }}>{points}</Text>
      <Text style={{ width: "171px", ...styles.cell3 }}>{specs}</Text>
      <Text style={{ width: "100px", ...styles.cell3 }}>{planningDate}</Text>

      {planningQty ? (
        <Text style={{ width: "100px", ...styles.cell3 }}>
          {planningQty} NOS
        </Text>
      ) : (
        <Text style={{ width: "100px", ...styles.cell3 }}></Text>
      )}

      <Text style={{ width: "100px", ...styles.cell3 }}>{achievementDate}</Text>
      {achievementQty ? (
        <Text style={{ width: "100px", ...styles.cell3 }}>
          {achievementQty} NOS
        </Text>
      ) : (
        <Text style={{ width: "100px", ...styles.cell3 }}></Text>
      )}
    </View>
  );
};

export default ProductionPlanMain;
