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

const MaterialSlipMain = ({
  srNo,
  itemDescription,
  materialGrade,
  cuttingSize,
  qtyRequired,
  qtyIssue,
  remarks,
}) => {
  return (
    <View style={styles.header} wrap={false}>
      <Text style={{ width: "93px", ...styles.cell3 }}>{srNo}. </Text>
      <Text style={{ width: "93px", ...styles.cell3 }}>{itemDescription}</Text>
      <Text style={{ width: "93px", ...styles.cell3 }}>{materialGrade}</Text>
      <Text style={{ width: "93px", ...styles.cell3 }}>{cuttingSize}</Text>
      <Text style={{ width: "93px", ...styles.cell3 }}>{qtyRequired}</Text>
      <Text style={{ width: "140px", ...styles.cell3 }}>{qtyIssue}</Text>
      <Text style={{ width: "140px", ...styles.cell3 }}>{remarks}</Text>
    </View>
  );
};

export default MaterialSlipMain;
