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

const ProductionReportMain = ({
  operator,
  soNo,
  jobDescription,
  startTime,
  endTime,
  productionHrs,
  nonProductiveHrsA,
  nonProductiveHrsB,
  nonProductiveHrsC,
  nonProductiveHrsD,
  nonProductiveHrsE,
  nonProductiveHrsF,
  nonProductiveHrsG,
  identificationMarkOk,
  identificationMarkRej,
  totalQuantity,
  progressiveTotal,
  sign,
}) => {
  return (
    <View style={styles.header} wrap={false}>
      <Text style={{ width: "60px", fontSize: "9px", ...styles.cell3 }}>
        {operator}
      </Text>
      <Text style={{ width: "80px", ...styles.cell3 }}>{soNo}</Text>
      <Text style={{ width: "80px", ...styles.cell3 }}>{jobDescription}</Text>
      <Text style={{ width: "80px", ...styles.cell3 }}>{startTime}</Text>
      <Text style={{ width: "80px", ...styles.cell3 }}>{endTime}</Text>
      <Text style={{ width: "40px", ...styles.cell3 }}>{productionHrs}</Text>
      <Text style={{ width: "20px", ...styles.cell3 }}>
        {nonProductiveHrsA}
      </Text>
      <Text style={{ width: "20px", ...styles.cell3 }}>
        {nonProductiveHrsB}
      </Text>
      <Text style={{ width: "20px", ...styles.cell3 }}>
        {nonProductiveHrsC}
      </Text>
      <Text style={{ width: "20px", ...styles.cell3 }}>
        {nonProductiveHrsD}
      </Text>
      <Text style={{ width: "20px", ...styles.cell3 }}>
        {nonProductiveHrsE}
      </Text>
      <Text style={{ width: "20px", ...styles.cell3 }}>
        {nonProductiveHrsF}
      </Text>
      <Text style={{ width: "20px", ...styles.cell3 }}>
        {nonProductiveHrsG}
      </Text>
      <Text style={{ width: "50px", fontSize: "9px", ...styles.cell3 }}>
        {identificationMarkOk}
      </Text>
      <Text style={{ width: "50px", fontSize: "9px", ...styles.cell3 }}>
        {identificationMarkRej}
      </Text>
      <Text style={{ width: "40px", fontSize: "9px", ...styles.cell3 }}>
        {totalQuantity}
      </Text>
      <Text style={{ width: "60px", fontSize: "9px", ...styles.cell3 }}>
        {progressiveTotal}
      </Text>
      <Text style={{ width: "40px", fontSize: "9px", ...styles.cell3 }}>
        {sign}
      </Text>
    </View>
  );
};

export default ProductionReportMain;
