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

const DimensionInspectionStudMain = ({ itemNo, totalLength, goNoGo }) => {
  return (
    <View style={styles.header} wrap={false}>
      <Text style={{ width: "33.3%", ...styles.cell3 }}>{itemNo}. </Text>
      <Text style={{ width: "33.3%", ...styles.cell3 }}>{totalLength}</Text>
      <Text style={{ width: "34%", ...styles.cell3 }}>{goNoGo}</Text>
    </View>
  );
};

export default DimensionInspectionStudMain;