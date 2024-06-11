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

const DimensionInspectionNutMain = ({
  itemNo,
  acrossFlat,
  acrossCorner,
  nutThickness,
  gauge,
}) => {
  return (
    <View style={styles.header} wrap={false}>
      <Text style={{ width: "20%", ...styles.cell3 }}>{itemNo}. </Text>
      <Text style={{ width: "20%", ...styles.cell3 }}>{acrossFlat}</Text>
      <Text style={{ width: "20%", ...styles.cell3 }}>{acrossCorner}</Text>
      <Text style={{ width: "20%", ...styles.cell3 }}>{nutThickness} </Text>
      <Text style={{ width: "20%", ...styles.cell3 }}>{gauge}</Text>
    </View>
  );
};

export default DimensionInspectionNutMain;